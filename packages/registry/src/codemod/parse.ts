import { types as t } from "@babel/core"
import {
  parse,
  type ParseResult,
  type ParserOptions,
  type ParserPlugin,
} from "@babel/parser"

import { getLineEnd, getLineStart, isLineBreak, skipTrivia } from "./trivia.js"

const PARSER_OPTIONS: ParserOptions = {
  sourceType: "module",
  allowImportExportEverywhere: true,
  allowReturnOutsideFunction: true,
  allowUndeclaredExports: true,
  allowNewTargetOutsideFunction: true,
  allowSuperOutsideMethod: true,
  errorRecovery: true,
  createParenthesizedExpressions: true,
}

const PLUGINS: ParserPlugin[] = [
  "typescript",
  "decorators-legacy",
  "decoratorAutoAccessors",
]

const SEMANTIC_ERROR_CODES = new Set([
  "VarRedeclaration",
  "DuplicateExport",
  "ModuleExportUndefined",
])

export interface ParseOptions {
  jsx?: boolean
}

type ParseModuleOptions = ParseOptions & { tokens?: boolean }

export function parseModule(code: string, options: ParseModuleOptions = {}) {
  try {
    return parseAsWritten(code, options)
  } catch (error) {
    const file = parsePastSkippedCommas(code, getErrorPos(error), options)
    if (!file) {
      throw error
    }
    return file
  }
}

export function parseTransformInput(code: string) {
  let text = code
  for (;;) {
    try {
      return parseModule(text)
    } catch (error) {
      const pos = getErrorPos(error)
      if (pos === undefined || getReasonCode(error) !== "UnterminatedString") {
        return parseWithoutJsx(text)
      }
      const lineEnd = getLineEnd(text, pos)
      text =
        text.slice(0, pos) + "0".padEnd(lineEnd - pos) + text.slice(lineEnd)
    }
  }
}

export function parseMaskingLines(code: string) {
  let text = code
  for (;;) {
    try {
      return { code: text, file: parseModule(text) }
    } catch (error) {
      const pos = getErrorPos(error)
      const masked = pos === undefined ? undefined : maskLine(text, pos)
      if (!masked) {
        return undefined
      }
      text = masked
    }
  }
}

function maskLine(text: string, pos: number) {
  let lineStart = getLineStart(text, pos)
  while (/^(\{\}|;)?\s*$/.test(text.slice(lineStart, getLineEnd(text, pos)))) {
    if (lineStart === 0) {
      return undefined
    }
    pos = lineStart - 1
    lineStart = getLineStart(text, pos)
  }

  const lineEnd = getLineEnd(text, pos)
  const mask = lineEnd - lineStart > 1 ? "{}" : ";"
  return (
    text.slice(0, lineStart) +
    mask.padEnd(lineEnd - lineStart) +
    text.slice(lineEnd)
  )
}

function parseWithoutJsx(code: string) {
  try {
    return parseModule(code, { jsx: false })
  } catch {
    return undefined
  }
}

function parsePastSkippedCommas(
  code: string,
  pos: number | undefined,
  options: ParseModuleOptions,
) {
  const commas: number[] = []
  let text = code
  while (pos !== undefined && text[pos] === ",") {
    commas.push(pos)
    text = text.slice(0, pos) + " " + text.slice(pos + 1)
    try {
      const file = parseAsWritten(text, options)
      return commas.every((comma) => isSkippedComma(code, file, comma))
        ? file
        : undefined
    } catch (error) {
      pos = getErrorPos(error)
    }
  }

  return undefined
}

function parseAsWritten(code: string, options: ParseModuleOptions) {
  const { jsx = true, tokens } = options
  return parse(code, {
    ...PARSER_OPTIONS,
    plugins: jsx ? [...PLUGINS, "jsx"] : PLUGINS,
    tokens,
  })
}

function getErrorPos(error: unknown) {
  return error instanceof SyntaxError &&
    "pos" in error &&
    typeof error.pos === "number"
    ? error.pos
    : undefined
}

function getReasonCode(error: unknown) {
  return error instanceof SyntaxError && "reasonCode" in error
    ? error.reasonCode
    : undefined
}

function isSkippedComma(code: string, file: t.File, pos: number) {
  const nodes = getNodesAround(file.program, pos)
  const object = nodes[nodes.length - 1]
  if (object.type !== "ObjectExpression") {
    return false
  }

  return !nodes.some((node, index) => {
    switch (node.type) {
      case "ArrayExpression":
      case "ArrayPattern":
      case "TSTypeParameterInstantiation":
      case "TSTupleType":
        return true
      case "JSXElement":
      case "JSXFragment":
        return node.children.some((child) => child === nodes[index + 1])
      case "VariableDeclaration":
        return hasPrecedingLineBreak(code, object, pos)
      default:
        return false
    }
  })
}

function getNodesAround(node: t.Node, pos: number) {
  const nodes: t.Node[] = []
  for (
    let current: t.Node | undefined = node;
    current;
    current = getChildNodes(current).find(
      (child) => child.start! <= pos && pos < child.end!,
    )
  ) {
    nodes.push(current)
  }

  return nodes
}

function hasPrecedingLineBreak(
  code: string,
  object: t.ObjectExpression,
  pos: number,
) {
  const membersBefore = object.properties.filter((member) => member.end! <= pos)
  let tokenEnd = membersBefore.at(-1)?.end ?? object.start! + 1
  for (
    let next = skipTrivia(code, tokenEnd);
    next < pos;
    next = skipTrivia(code, tokenEnd)
  ) {
    tokenEnd = next + 1
  }

  return Array.from(code.slice(tokenEnd, pos)).some(isLineBreak)
}

export function getChildNodes(node: t.Node) {
  const fields = node as unknown as Record<string, unknown>
  const children: t.Node[] = []
  for (const key of t.VISITOR_KEYS[node.type]) {
    const value = fields[key]
    for (const child of Array.isArray(value) ? value : [value]) {
      if (t.isNode(child)) {
        children.push(child)
      }
    }
  }

  return children
}

function countErrors(parseFile: () => ParseResult<t.File>) {
  try {
    const errors = parseFile().errors ?? []
    return errors.filter((error) => !SEMANTIC_ERROR_CODES.has(error.reasonCode))
      .length
  } catch {
    return Infinity
  }
}

export function countSyntaxErrors(code: string, options: ParseOptions = {}) {
  return countErrors(() => parseAsWritten(code, options))
}

export function countSyntaxErrorsExceptSkippedCommas(
  code: string,
  options: ParseOptions = {},
) {
  return countErrors(() => parseModule(code, options))
}

export function addsSyntaxErrors(
  input: string,
  output: string,
  options: ParseOptions = {},
) {
  return countSyntaxErrors(output, options) > countSyntaxErrors(input, options)
}

export function getDescendants<T extends t.Node>(
  node: t.Node,
  isType: (node: t.Node) => node is T,
) {
  const descendants: T[] = []
  t.traverseFast(node, (descendant) => {
    if (descendant !== node && isType(descendant)) {
      descendants.push(descendant)
    }
  })

  return descendants.sort((a, b) => a.start! - b.start!)
}

export function isCallExpression(
  node: t.Node,
): node is t.CallExpression | t.OptionalCallExpression {
  return (
    node.type === "CallExpression" || node.type === "OptionalCallExpression"
  )
}

export function getText(code: string, node: t.Node) {
  return code.slice(node.start!, node.end!)
}

export function findNodeAt<T extends t.Node>(
  code: string,
  start: number,
  isType: (node: t.Node) => node is T,
  options: ParseOptions,
) {
  let found: T | undefined
  t.traverseFast(parseModule(code, options), (node) => {
    if (node.start === start && isType(node)) {
      found = node
    }
  })

  return found
}

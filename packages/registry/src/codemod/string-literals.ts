import { types as t } from "@babel/core"
import { parseExpression } from "@babel/parser"

import { applyEdits, type TextEdit } from "./edits.js"
import { getDescendants, getText } from "./parse.js"

type StringLiteral = t.StringLiteral | t.DirectiveLiteral

export type Literal = StringLiteral | t.TemplateLiteral

export class StringLiterals {
  private readonly strings: StringLiteral[]
  private readonly templates: t.TemplateLiteral[]
  private readonly jsxAttributeValues: Set<Literal>
  private readonly edits = new Map<Literal, TextEdit>()

  constructor(
    private readonly code: string,
    file: t.File,
  ) {
    this.strings = getDescendants(
      file,
      (node): node is StringLiteral =>
        t.isStringLiteral(node) || t.isDirectiveLiteral(node),
    )
    this.templates = getDescendants(
      file,
      (node): node is t.TemplateLiteral =>
        t.isTemplateLiteral(node) && node.expressions.length === 0,
    )
    this.jsxAttributeValues = new Set(
      getDescendants(file, t.isJSXAttribute).flatMap(({ value }) =>
        value?.type === "StringLiteral" ? [value] : [],
      ),
    )
  }

  getStringLiterals(container?: t.Node) {
    return container
      ? this.strings.filter((literal) => isWithin(literal, container))
      : this.strings
  }

  getTemplateLiterals(container?: t.Node) {
    return container
      ? this.templates.filter((literal) => isWithin(literal, container))
      : this.templates
  }

  getValue(literal: Literal) {
    const edit = this.edits.get(literal)
    if (this.jsxAttributeValues.has(literal)) {
      return edit?.text ?? this.code.slice(literal.start! + 1, literal.end! - 1)
    }
    if (edit) {
      const quote = this.code[literal.start!]
      return readLiteral(`${quote}${edit.text}${quote}`)
    }

    switch (literal.type) {
      case "StringLiteral":
        return literal.value
      case "DirectiveLiteral":
        return readLiteral(getText(this.code, literal))
      case "TemplateLiteral":
        return getCookedValue(literal)
    }
  }

  setValue(literal: Literal, value: string) {
    this.edits.set(literal, getSetLiteralValueEdit(this.code, literal, value))
  }

  getEdits() {
    return Array.from(this.edits.values())
  }

  apply() {
    return applyEdits(this.code, this.getEdits())
  }
}

export function getSetLiteralValueEdit(
  code: string,
  literal: Literal,
  value: string,
): TextEdit {
  const quote = code[literal.start!] === "'" ? "'" : '"'
  return {
    start: literal.start! + 1,
    end: literal.end! - 1,
    text:
      literal.type === "TemplateLiteral"
        ? value
        : escapeForWithinString(value, quote),
  }
}

function escapeForWithinString(value: string, quote: string) {
  return value
    .split(quote)
    .join(`\\${quote}`)
    .replace(/(\r?\n)/g, "\\$1")
}

function isWithin(node: t.Node, container: t.Node) {
  return (
    node !== container &&
    container.start! <= node.start! &&
    node.end! <= container.end!
  )
}

function readLiteral(source: string) {
  try {
    const literal = parseExpression(source, { errorRecovery: true }) as
      t.StringLiteral | t.TemplateLiteral
    return literal.type === "StringLiteral"
      ? literal.value
      : getCookedValue(literal)
  } catch {
    return source.slice(1, -1)
  }
}

function getCookedValue(literal: t.TemplateLiteral) {
  const { cooked, raw } = literal.quasis[0].value
  return cooked ?? raw
}

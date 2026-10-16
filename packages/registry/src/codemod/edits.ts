import { type types as t } from "@babel/core"

import { getReplacementText } from "./indentation.js"
import {
  countSyntaxErrorsExceptSkippedCommas,
  type ParseOptions,
} from "./parse.js"

export interface TextEdit {
  start: number
  end: number
  text: string
}

export function applyEdits(code: string, edits: TextEdit[]) {
  const editsFromEnd = [...edits].sort(
    (a, b) => b.start - a.start || b.end - a.end,
  )

  let result = code
  for (const edit of editsFromEnd) {
    result = result.slice(0, edit.start) + edit.text + result.slice(edit.end)
  }

  return result
}

export function getTextEdit(code: string, edited: string): TextEdit {
  const length = Math.min(code.length, edited.length)
  let start = 0
  while (start < length && code[start] === edited[start]) {
    start++
  }
  let suffix = 0
  while (
    suffix < length - start &&
    code[code.length - 1 - suffix] === edited[edited.length - 1 - suffix]
  ) {
    suffix++
  }

  return {
    start,
    end: code.length - suffix,
    text: edited.slice(start, edited.length - suffix),
  }
}

export class SyntaxErrorInsertedError extends Error {
  constructor() {
    super("Manipulation error: A syntax error was inserted.")
  }
}

export class ForgottenNodeError extends Error {
  constructor() {
    super(
      "Attempted to get information from a node that was removed or forgotten.",
    )
  }
}

export type SkipReason = "unparsable" | "syntax-error-inserted"

export function applyManipulation(
  code: string,
  edits: TextEdit[],
  options: ParseOptions = {},
) {
  const result = applyEdits(code, edits)

  if (
    countSyntaxErrorsExceptSkippedCommas(result, options) >
    countSyntaxErrorsExceptSkippedCommas(code, options)
  ) {
    throw new SyntaxErrorInsertedError()
  }

  return result
}

export function replaceWithText(
  code: string,
  node: t.Node,
  text: string,
  options: ParseOptions,
) {
  return applyManipulation(
    code,
    [
      {
        start: node.start!,
        end: node.end!,
        text: getReplacementText(code, node.start!, text, options),
      },
    ],
    options,
  )
}

import { type types as t } from "@babel/core"

import { getLineEnd, getLineStart, isWhitespace } from "./trivia.js"

export interface NodeOrComment<T> {
  pos: number
  start: number
  end: number
  node?: T
}

type CommentKind = "line" | "block" | "jsdoc"

export function getNodesWithComments<T extends t.Node>(
  code: string,
  bodyPos: number,
  nodes: { pos: number; node: T }[],
) {
  if (nodes.length === 0) {
    return getCommentNodes<T>(code, bodyPos, false)
  }

  const children: NodeOrComment<T>[] = []
  for (const { pos, node } of nodes) {
    children.push(...getCommentNodes<T>(code, pos, true))
    children.push({ pos, start: node.start!, end: node.end!, node })
  }
  const lastNode = nodes[nodes.length - 1].node
  children.push(...getCommentNodes<T>(code, lastNode.end!, false))

  return children
}

function getCommentNodes<T>(
  code: string,
  fullStart: number,
  stopAtJsDoc: boolean,
) {
  let pos = fullStart
  const comments: NodeOrComment<T>[] = []

  function skipTrailingLine() {
    if (pos === 0) {
      return
    }

    let lineEnd = getLineEnd(code, pos)
    while (pos < lineEnd) {
      const kind = getCommentKind(code, pos)
      if (kind) {
        pos = skipComment(code, pos, kind)
        if (kind === "line") {
          return
        }
        lineEnd = getLineEnd(code, pos)
      } else if (!isWhitespace(code[pos]) && code[pos] !== ",") {
        return
      } else {
        pos++
      }
    }

    while (code[pos] === "\n") {
      pos++
    }
  }

  skipTrailingLine()

  while (pos < code.length) {
    const kind = getCommentKind(code, pos)
    if (kind) {
      if (kind === "jsdoc" && stopAtJsDoc) {
        break
      }
      const start = pos
      pos = skipComment(code, pos, kind)
      comments.push({ pos: start, start, end: pos })
      skipTrailingLine()
    } else if (!isWhitespace(code[pos])) {
      break
    } else {
      pos++
    }
  }

  const maxEnd =
    pos === code.length || code[pos] === "}" ? pos : getLineStart(code, pos)

  return comments.filter((comment) => comment.end <= maxEnd)
}

function getCommentKind(code: string, pos: number): CommentKind | undefined {
  if (code[pos] !== "/") {
    return undefined
  }
  if (code[pos + 1] === "/") {
    return "line"
  }
  if (code[pos + 1] !== "*") {
    return undefined
  }
  return code[pos + 2] === "*" ? "jsdoc" : "block"
}

function skipComment(code: string, pos: number, kind: CommentKind) {
  if (kind === "line") {
    return getLineEnd(code, pos + 2)
  }

  const close = code.indexOf("*/", pos + (kind === "jsdoc" ? 3 : 2))
  return close === -1 ? code.length : close + 2
}

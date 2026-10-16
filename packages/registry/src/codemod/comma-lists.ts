import { types as t } from "@babel/core"

import { SyntaxErrorInsertedError, applyManipulation } from "./edits.js"
import { getIndentationText } from "./indentation.js"
import { type ParseOptions } from "./parse.js"
import {
  getCommentEnd,
  getNonWhitespaceStart,
  getTrailingCommentsEnd,
  isLineBreak,
  isWhiteSpaceSingleLine,
  skipTrivia,
} from "./trivia.js"

export interface ListChild {
  kind: "item" | "comma" | "comment"
  pos: number
  start: number
  startWithJsDoc: number
  end: number
}

export interface CommaSeparatedList {
  nodeStart: number
  pos: number
  closeStart: number
  children: ListChild[]
}

export function getListChildren(
  code: string,
  pos: number,
  closeStart: number,
  items: (t.Node | null)[],
  getStartWithJsDoc: (item: t.Node, pos: number) => number = (item) =>
    item.start!,
) {
  const children: ListChild[] = []
  let end = pos

  function addCommas(beforeHole: boolean) {
    let start = skipTrivia(code, end)
    while (code[start] === "," && start < closeStart) {
      children.push({
        kind: "comma",
        pos: end,
        start,
        startWithJsDoc: start,
        end: start + 1,
      })
      end = start + 1
      if (beforeHole) {
        break
      }
      start = skipTrivia(code, end)
    }
  }

  if (items[0] !== null) {
    addCommas(false)
  }
  items.forEach((item, index) => {
    const child: ListChild = item
      ? {
          kind: "item",
          pos: end,
          start: item.start!,
          startWithJsDoc: getStartWithJsDoc(item, end),
          end: item.end!,
        }
      : { kind: "item", pos: end, start: end, startWithJsDoc: end, end }
    children.push(child)
    end = child.end
    addCommas(items[index + 1] === null)
  })

  return children
}

export function isItem(child: ListChild) {
  return child.kind === "item"
}

export function verifyIndex(index: number, length: number) {
  if (index > length) {
    throw new Error(
      `Invalid index: The max index is ${length}, but ${index} was specified.`,
    )
  }
}

export function insertIntoCommaSeparatedNodes(
  code: string,
  list: CommaSeparatedList,
  currentNodes: ListChild[],
  insertIndex: number,
  text: string,
  {
    useNewLines = false,
    surroundWithSpaces = false,
  }: { useNewLines?: boolean; surroundWithSpaces?: boolean },
  options: ParseOptions,
) {
  const previousNode = currentNodes[insertIndex - 1]
  const previousNonCommentNode = currentNodes
    .slice(0, insertIndex)
    .reverse()
    .find(isItem)
  const nextNode = currentNodes[insertIndex]
  const nextNonCommentNode = currentNodes.slice(insertIndex).find(isItem)
  const separator = useNewLines ? "\n" : " "
  let newText = text

  function prependSeparator() {
    if (!startsWithNewLine(newText)) {
      newText = separator + newText
    }
  }

  function appendIndentation() {
    if (useNewLines || newText.endsWith("\n")) {
      newText += getIndentationText(
        code,
        list.nodeStart,
        options,
        nextNode ? 1 : 0,
      )
    }
  }

  function appendSeparator() {
    if (!newText.endsWith("\n")) {
      newText += separator
    }
    appendIndentation()
  }

  function appendCommaAndSeparator() {
    newText = appendCommaToText(newText)
    appendSeparator()
  }

  function prependCommaAndSeparator() {
    if (!previousNonCommentNode) {
      prependSeparator()
      return
    }

    const nextSibling =
      list.children[list.children.indexOf(previousNonCommentNode) + 1]
    let prefix = ""
    if (nextSibling?.kind === "comma") {
      prefix += getTrailingComments(code, previousNonCommentNode.end)
      prefix += ","
      prefix +=
        previousNonCommentNode === previousNode
          ? getTrailingComments(code, nextSibling.end)
          : getCommentNodeTexts(previousNonCommentNode, previousNode)
    } else {
      prefix += ","
      prefix +=
        previousNonCommentNode === previousNode
          ? getTrailingComments(code, previousNonCommentNode.end)
          : getCommentNodeTexts(previousNonCommentNode, previousNode)
    }
    prependSeparator()
    newText = prefix + newText
  }

  function getCommentNodeTexts(item: ListChild, lastComment: ListChild) {
    const end = getTrailingCommentsEnd(code, lastComment.end) ?? lastComment.end
    return code.slice(item.end, end)
  }

  if (previousNode) {
    prependCommaAndSeparator()
    if (nextNonCommentNode) {
      appendCommaAndSeparator()
    } else if (useNewLines || surroundWithSpaces) {
      appendSeparator()
    } else {
      appendIndentation()
    }

    const insertPos = (previousNonCommentNode ?? previousNode).end
    const nextEndStart = nextNode ? nextNode.startWithJsDoc : list.closeStart
    return applyManipulation(
      code,
      [{ start: insertPos, end: nextEndStart, text: newText }],
      options,
    )
  }

  if (nextNode) {
    if (useNewLines || surroundWithSpaces) {
      prependSeparator()
    }
    if (nextNonCommentNode) {
      appendCommaAndSeparator()
    } else {
      appendSeparator()
    }

    return applyManipulation(
      code,
      [{ start: list.pos, end: nextNode.startWithJsDoc, text: newText }],
      options,
    )
  }

  if (useNewLines || surroundWithSpaces) {
    prependSeparator()
    appendSeparator()
  } else {
    appendIndentation()
  }

  return applyManipulation(
    code,
    [{ start: list.pos, end: list.closeStart, text: newText }],
    options,
  )
}

export function removeCommaSeparatedChild(
  code: string,
  list: CommaSeparatedList,
  child: ListChild,
  options: ParseOptions,
) {
  const { children } = list
  const index = children.indexOf(child)
  const isRemovingFirstChild = index === 0

  const childrenToRemove = [child]
  if (children[index + 1]?.kind === "comma") {
    childrenToRemove.push(children[index + 1])
  }
  if (
    children.at(-1) === childrenToRemove.at(-1) &&
    children[index - 1]?.kind === "comma"
  ) {
    childrenToRemove.unshift(children[index - 1])
  }

  const firstChild = childrenToRemove[0]
  const removePrecedingSpaces =
    !isRemovingFirstChild ||
    (children.length === childrenToRemove.length &&
      isFirstNodeOnLine(code, list, firstChild))

  let start = getChildNonWhitespaceStart(code, list, firstChild)
  while (
    start > 0 &&
    isRemovable(code[start - 1], removePrecedingSpaces, !isRemovingFirstChild)
  ) {
    start--
  }

  let end = childrenToRemove[childrenToRemove.length - 1].end
  while (
    end < code.length &&
    isRemovable(code[end], isRemovingFirstChild, isRemovingFirstChild)
  ) {
    end++
  }

  return applyManipulation(code, [{ start, end, text: "" }], options)
}

type Member = t.Node | null

export function verifyRemoval(
  members: Member[],
  index: number,
  editedMembers: Member[] | undefined,
) {
  const expected = getMemberKinds(members).filter((_, i) => i !== index)
  const actual = editedMembers ? getMemberKinds(editedMembers) : []
  if (
    actual.length !== expected.length ||
    actual.some((kind, i) => kind !== expected[i])
  ) {
    throw new SyntaxErrorInsertedError()
  }
}

function getMemberKinds(members: Member[]) {
  return members.map((member) =>
    member === null
      ? "Hole"
      : t.isObjectProperty(member) && member.shorthand
        ? "ShorthandProperty"
        : member.type,
  )
}

function isRemovable(char: string, spaces: boolean, newLines: boolean) {
  return (
    (newLines && (char === "\r" || char === "\n")) ||
    (spaces && (char === " " || char === "\t"))
  )
}

function getChildNonWhitespaceStart(
  code: string,
  list: CommaSeparatedList,
  child: ListChild,
) {
  const previousSibling = list.children[list.children.indexOf(child) - 1]
  return getNonWhitespaceStart(
    code,
    { pos: child.pos, start: child.startWithJsDoc },
    previousSibling && {
      end: previousSibling.end,
      isComment: previousSibling.kind === "comment",
    },
  )
}

function isFirstNodeOnLine(
  code: string,
  list: CommaSeparatedList,
  child: ListChild,
) {
  for (
    let pos = getChildNonWhitespaceStart(code, list, child) - 1;
    pos >= 0;
    pos--
  ) {
    if (code[pos] !== " " && code[pos] !== "\t") {
      return code[pos] === "\n"
    }
  }

  return true
}

function getTrailingComments(code: string, pos: number) {
  return code.slice(pos, getTrailingCommentsEnd(code, pos) ?? pos)
}

function startsWithNewLine(text: string) {
  return text.startsWith("\n") || text.startsWith("\r\n")
}

export function appendCommaToText(text: string) {
  const end = getLastTokenEnd(text)
  if (end === 0 || text[end - 1] === ",") {
    return text
  }

  return text.slice(0, end) + "," + text.slice(end)
}

function getLastTokenEnd(text: string) {
  const openBraces: number[] = []
  let lastTokenEnd = 0

  let pos = 0
  while (pos < text.length) {
    const char = text[pos]
    const commentEnd = getCommentEnd(text, pos)
    if (commentEnd !== undefined) {
      pos = commentEnd
      continue
    }
    if (isWhiteSpaceSingleLine(char) || isLineBreak(char)) {
      pos++
      continue
    }

    if (char === '"' || char === "'") {
      pos = skipString(text, pos)
    } else if (char === "`") {
      pos = skipTemplate(text, pos + 1, openBraces)
    } else if (char === "}" && openBraces.at(-1) === 0) {
      openBraces.pop()
      pos = skipTemplate(text, pos + 1, openBraces)
    } else {
      if (openBraces.length > 0 && (char === "{" || char === "}")) {
        openBraces[openBraces.length - 1] += char === "{" ? 1 : -1
      }
      pos++
    }
    lastTokenEnd = pos
  }

  return lastTokenEnd
}

function skipString(text: string, pos: number) {
  const quote = text[pos]
  pos++
  while (pos < text.length && text[pos] !== quote) {
    if (isLineBreak(text[pos])) {
      return pos
    }
    pos += text[pos] !== "\\" ? 1 : text.startsWith("\r\n", pos + 1) ? 3 : 2
  }

  return Math.min(pos + 1, text.length)
}

function skipTemplate(text: string, pos: number, openBraces: number[]) {
  while (pos < text.length) {
    if (text[pos] === "`") {
      return pos + 1
    }
    if (text.startsWith("${", pos)) {
      openBraces.push(0)
      return pos + 2
    }
    pos += text[pos] === "\\" ? 2 : 1
  }

  return pos
}

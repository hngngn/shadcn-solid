const WHITESPACE = /[ \f\n\r\t\v\u00a0\u2028\u2029]/

const SINGLE_LINE_WHITESPACE =
  /[ \t\v\f\u00a0\u0085\u1680\u2000-\u200b\u202f\u205f\u3000\ufeff]/

const LINE_BREAK = /[\n\r\u2028\u2029]/

export function isWhitespace(char: string | undefined) {
  return char !== undefined && WHITESPACE.test(char)
}

export function isWhiteSpaceSingleLine(char: string | undefined) {
  return char !== undefined && SINGLE_LINE_WHITESPACE.test(char)
}

export function isLineBreak(char: string | undefined) {
  return char !== undefined && LINE_BREAK.test(char)
}

export function getLineStart(code: string, pos: number) {
  while (pos > 0 && code[pos - 1] !== "\n" && code[pos - 1] !== "\r") {
    pos--
  }
  return pos
}

export function getLineEnd(code: string, pos: number) {
  while (pos < code.length && code[pos] !== "\n" && code[pos] !== "\r") {
    pos++
  }
  return pos
}

export function getPosAtStartOfLineOrNonWhitespace(code: string, pos: number) {
  while (pos > 0) {
    pos--
    if (code[pos] === "\n" || (code[pos] !== " " && code[pos] !== "\t")) {
      return pos + 1
    }
  }
  return pos
}

export function isNewLineAtPos(code: string, pos: number) {
  return code[pos] === "\n" || (code[pos] === "\r" && code[pos + 1] === "\n")
}

export function getPosAtNextNonBlankLine(code: string, pos: number) {
  let lineStart = pos
  for (let i = pos; i < code.length; i++) {
    if (code[i] === " " || code[i] === "\t") {
      continue
    }
    if (isNewLineAtPos(code, i)) {
      i += code[i] === "\r" ? 1 : 0
      lineStart = i + 1
      continue
    }
    break
  }
  return lineStart
}

export function getPosAtEndOfPreviousLine(code: string, pos: number) {
  while (pos > 0) {
    pos--
    if (code[pos] === "\n") {
      return code[pos - 1] === "\r" ? pos - 1 : pos
    }
  }
  return pos
}

export function getCommentEnd(code: string, pos: number) {
  if (code.startsWith("//", pos)) {
    let end = pos + 2
    while (end < code.length && !isLineBreak(code[end])) {
      end++
    }
    return end
  }

  if (code.startsWith("/*", pos)) {
    const close = code.indexOf("*/", pos + 2)
    return close === -1 ? code.length : close + 2
  }

  return undefined
}

interface CommentRange {
  pos: number
  end: number
}

function iterateCommentRanges(code: string, pos: number, trailing: boolean) {
  const ranges: CommentRange[] = []
  let collecting = trailing || pos === 0

  while (pos < code.length) {
    const char = code[pos]

    if (char === "\r" || char === "\n") {
      pos += char === "\r" && code[pos + 1] === "\n" ? 2 : 1
      if (trailing) {
        break
      }
      collecting = true
      continue
    }

    const commentEnd = getCommentEnd(code, pos)
    if (commentEnd !== undefined) {
      if (collecting) {
        ranges.push({ pos, end: commentEnd })
      }
      pos = commentEnd
      continue
    }

    if (!isWhiteSpaceSingleLine(char) && !isLineBreak(char)) {
      break
    }
    pos++
  }

  return ranges
}

export function getLeadingCommentRanges(code: string, pos: number) {
  return iterateCommentRanges(code, pos, false)
}

export function getTrailingCommentRanges(code: string, pos: number) {
  return iterateCommentRanges(code, pos, true)
}

export function getTrailingCommentsEnd(code: string, pos: number) {
  return getTrailingCommentRanges(code, pos).at(-1)?.end
}

export function getJsDocStart(
  code: string,
  pos: number,
  end: number,
  { includeTrailingComments }: { includeTrailingComments: boolean },
) {
  const ranges = includeTrailingComments
    ? [
        ...getTrailingCommentRanges(code, pos),
        ...getLeadingCommentRanges(code, pos),
      ]
    : getLeadingCommentRanges(code, pos)

  return ranges.find(
    (range) =>
      range.end <= end &&
      code.startsWith("/**", range.pos) &&
      code[range.pos + 3] !== "/",
  )?.pos
}

export function getTrailingTriviaEnd(code: string, end: number) {
  let pos = getTrailingCommentsEnd(code, end) ?? end
  while (code[pos] === " " || code[pos] === "\t") {
    pos++
  }
  return pos
}

export function getNextNonWhitespacePos(code: string, pos: number) {
  while (pos < code.length && isWhitespace(code[pos])) {
    pos++
  }
  return pos
}

export function getNonWhitespaceStart(
  code: string,
  { pos, start }: { pos: number; start: number },
  previousSibling?: { end: number; isComment: boolean },
) {
  let searchStart = pos
  if (previousSibling?.isComment) {
    searchStart = previousSibling.end
  } else if (previousSibling && code.slice(pos, start).includes("\n")) {
    searchStart = getTrailingTriviaEnd(code, previousSibling.end)
  }

  return getNextNonWhitespacePos(code, searchStart)
}

export function skipTrivia(code: string, pos: number) {
  while (pos < code.length) {
    if (isWhiteSpaceSingleLine(code[pos]) || isLineBreak(code[pos])) {
      pos++
      continue
    }

    const commentEnd = getCommentEnd(code, pos)
    if (commentEnd === undefined) {
      break
    }
    pos = commentEnd
  }

  return pos
}

import { type types as t } from "@babel/core"
import CodeBlockWriter from "code-block-writer"

import { getNodesWithComments, type NodeOrComment } from "./comment-nodes.js"
import { applyManipulation, type TextEdit } from "./edits.js"
import { parseModule } from "./parse.js"
import {
  getNonWhitespaceStart,
  getPosAtEndOfPreviousLine,
  getPosAtNextNonBlankLine,
  getPosAtStartOfLineOrNonWhitespace,
  getTrailingTriviaEnd,
  isNewLineAtPos,
} from "./trivia.js"

export type Statement = NodeOrComment<t.Statement | t.Directive>

export function getStatementsWithComments(
  code: string,
  program: t.Program,
): Statement[] {
  const nodes = [...program.directives, ...program.body].sort(
    (a, b) => a.start! - b.start!,
  )

  return getNodesWithComments(
    code,
    0,
    nodes.map((node, index) => ({
      pos: index === 0 ? 0 : nodes[index - 1].end!,
      node,
    })),
  )
}

function getStatementNonWhitespaceStart(
  code: string,
  statements: Statement[],
  index: number,
) {
  const statement = statements[index]
  const previous = statements[index - 1]

  if (!statement.node) {
    return statement.start
  }

  return getNonWhitespaceStart(
    code,
    statement,
    previous && { end: previous.end, isComment: !previous.node },
  )
}

export function insertStatement(
  code: string,
  statements: Statement[],
  index: number,
  statementText: string,
  isSameKind: (statement: Statement) => boolean,
) {
  const { edit, end } = getStatementInsertion(
    code,
    statements,
    index,
    statementText,
    isSameKind,
  )
  return { code: applyManipulation(code, [edit]), end }
}

function getStatementInsertion(
  code: string,
  statements: Statement[],
  index: number,
  statementText: string,
  isSameKind: (statement: Statement) => boolean,
) {
  const previous = statements[index - 1]
  const next = statements[index]
  const insertPos = previous ? previous.end : 0
  const endPos = getPosAtStartOfLineOrNonWhitespace(
    code,
    next
      ? getStatementNonWhitespaceStart(code, statements, index)
      : code.length,
  )

  const writer = new CodeBlockWriter()
  if (previous?.node && !isSameKind(previous)) {
    writer.blankLine()
  } else if (insertPos !== 0) {
    writer.newLineIfLastNot()
  }
  writer.write(statementText)
  const statementEnd = insertPos + writer.getLength()
  if (next && !isSameKind(next)) {
    writer.blankLine()
  } else {
    writer.newLineIfLastNot()
  }

  const edit: TextEdit = {
    start: insertPos,
    end: endPos,
    text: writer.toString(),
  }
  return { edit, end: statementEnd }
}

export function removeStatement(
  code: string,
  statements: Statement[],
  index: number,
) {
  const statement = statements[index]
  const previous = statements[index - 1]
  const next = statements[index + 1]

  let start: number
  if (previous) {
    const previousTriviaEnd = getTrailingTriviaEnd(code, previous.end)
    start = isNewLineAtPos(code, previousTriviaEnd)
      ? previousTriviaEnd
      : previous.end
  } else {
    start = getStatementNonWhitespaceStart(code, statements, index)
  }

  const triviaEnd = getTrailingTriviaEnd(code, statement.end)
  let end: number
  if (previous && next) {
    end = getPosAtStartOfLineOrNonWhitespace(
      code,
      getStatementNonWhitespaceStart(code, statements, index + 1),
    )
  } else if (statement.end === code.length) {
    end = statement.end
  } else if (isNewLineAtPos(code, triviaEnd)) {
    const nextLineStart = getPosAtNextNonBlankLine(code, triviaEnd)
    end = previous
      ? getPosAtEndOfPreviousLine(code, nextLineStart)
      : nextLineStart
  } else {
    end = previous ? statement.end : triviaEnd
  }

  let spacing = ""
  if (previous && next) {
    spacing = hasBody(previous) || hasBody(next) ? "\n\n" : "\n"
  }

  return applyManipulation(code, [{ start, end, text: spacing }])
}

function hasBody({ node }: Statement) {
  const declaration =
    node?.type === "ExportNamedDeclaration" ||
    node?.type === "ExportDefaultDeclaration"
      ? node.declaration
      : node
  switch (declaration?.type) {
    case "FunctionDeclaration":
    case "ClassDeclaration":
    case "TSInterfaceDeclaration":
    case "TSEnumDeclaration":
      return true
    case "TSModuleDeclaration":
      return declaration.body !== undefined
    default:
      return false
  }
}

export function addImportDeclaration(
  code: string,
  moduleSpecifier: string,
  name: string,
) {
  return applyManipulation(code, [
    getImportDeclarationInsertion(
      code,
      `import { ${name} } from "${moduleSpecifier}";`,
    ),
  ])
}

// The edit with which ts-morph's SourceFile#addImportDeclaration() writes the
// text of an import declaration: after the last import, or after the leading
// block comments when there are no imports.
export function getImportDeclarationInsertion(code: string, text: string) {
  const statements = getStatementsWithComments(code, parseModule(code).program)

  let index = 0
  let isInLeadingComments = true
  for (let i = 0; i < statements.length; i++) {
    if (isInLeadingComments && isBlockComment(code, statements[i])) {
      index = i + 1
    } else {
      isInLeadingComments = false
      if (isImportDeclaration(statements[i])) {
        index = i + 1
      }
    }
  }

  return getStatementInsertion(
    code,
    statements,
    index,
    text,
    isImportDeclaration,
  ).edit
}

export function isImportDeclaration(statement: Statement) {
  return statement.node?.type === "ImportDeclaration"
}

function isBlockComment(code: string, statement: Statement) {
  return !statement.node && code.startsWith("/*", statement.start)
}

import { types as t } from "@babel/core"

import {
  ForgottenNodeError,
  SyntaxErrorInsertedError,
  applyEdits,
  getTextEdit,
  type TextEdit,
} from "../codemod/edits.js"
import { getReplacementText } from "../codemod/indentation.js"
import {
  getJsxAttributes,
  removeJsxAttributes,
} from "../codemod/jsx-attributes.js"
import {
  getNamedImportNames,
  removeNamedImport,
} from "../codemod/named-imports.js"
import {
  getDescendants,
  getText,
  parseMaskingLines,
  parseTransformInput,
} from "../codemod/parse.js"
import {
  getImportDeclarationInsertion,
  getStatementsWithComments,
  removeStatement,
} from "../codemod/statements.js"
import {
  iconLibraries,
  type IconLibrary,
  type IconLibraryName,
} from "../icons/libraries.js"
import { type Transformer } from "./index.js"

export const transformIcons: Transformer = (code, { config }) => {
  const iconLibrary = config.iconLibrary

  if (!iconLibrary || !(iconLibrary in iconLibraries)) {
    return code
  }

  const parsed = parseTransformInput(code)
  const input = parsed
    ? { code, file: parsed }
    : /IconPlaceholder|icon-placeholder/.test(code)
      ? parseMaskingLines(code)
      : undefined
  if (!input) {
    return code
  }
  const { code: source, file } = input

  const targetLibrary = iconLibrary as IconLibraryName
  const libraryConfig = iconLibraries[targetLibrary]
  const transformedIcons: string[] = []
  const jsxEdits: TextEdit[] = []

  const placeholders = getDescendants(
    file,
    (node): node is t.JSXElement =>
      isSelfClosingElement(node) &&
      getText(source, node.openingElement.name) === "IconPlaceholder",
  )
  for (const element of placeholders) {
    const transformed = transformPlaceholder(
      source,
      element,
      targetLibrary,
      libraryConfig,
    )
    if (!transformed) {
      continue
    }

    const { icon, text, isTagName } = transformed
    if (!transformedIcons.includes(icon)) {
      transformedIcons.push(icon)
    }

    if (isTagName && icon.startsWith("{") && !isJsxChild(file, element)) {
      throw new SyntaxErrorInsertedError()
    }

    jsxEdits.push({ start: element.start!, end: element.end!, text })
  }

  const importEdit = getTextEdit(
    code,
    applyEditsInTurn(
      code,
      transformImports(source, transformedIcons, libraryConfig),
    ),
  )
  if (
    jsxEdits.every(
      (edit) => edit.end <= importEdit.start || edit.start >= importEdit.end,
    )
  ) {
    return applyEdits(code, [importEdit, ...jsxEdits])
  }

  const jsxCode = applyEdits(code, jsxEdits)
  return applyEditsInTurn(
    jsxCode,
    transformImports(jsxCode, transformedIcons, libraryConfig),
  )
}

function transformPlaceholder(
  code: string,
  placeholder: t.JSXElement,
  targetLibrary: IconLibraryName,
  libraryConfig: IconLibrary,
) {
  let text = getText(code, placeholder)
  const replaceElement = (newText: string) => {
    if (getDescendants(placeholder, isSelfClosingElement).length > 0) {
      throw new ForgottenNodeError()
    }
    return getReplacementText(code, placeholder.start!, newText)
  }

  const { attributes } = parseElement(text)
  const targetIndex = attributes.findIndex(
    ({ attribute, isOwn }) =>
      isOwn && getText(text, attribute.name) === targetLibrary,
  )
  if (targetIndex === -1) {
    return undefined
  }

  const initializer = attributes[targetIndex].attribute.value
  const icon =
    initializer && getText(text, initializer).replace(/^["']|["']$/g, "")
  if (!icon) {
    return undefined
  }

  text = removeJsxAttributes(text, [targetIndex])
  text = removeJsxAttributes(
    text,
    parseElement(text).attributes.flatMap(({ attribute, isOwn }, index) =>
      isOwn && getText(text, attribute.name) in iconLibraries ? [index] : [],
    ),
  )

  const { element } = parseElement(text)
  const userAttributes = element.attributes
    .map((attribute) => getText(text, attribute))
    .join(" ")
  const renameTag = () =>
    text.slice(0, element.name.start!) + icon + text.slice(element.name.end!)

  const usageMatch = libraryConfig.usage.match(/<(\w+)([^>]*)\s*\/>/)
  if (!usageMatch) {
    return { icon, text: renameTag(), isTagName: true }
  }

  const [, componentName, defaultPropsStr] = usageMatch

  if (componentName === "ICON") {
    return {
      icon,
      text: userAttributes.trim()
        ? replaceElement(`<${icon} ${userAttributes} />`)
        : renameTag(),
      isTagName: true,
    }
  }

  const existingPropNames = new Set(
    element.attributes.flatMap((attribute) =>
      attribute.type === "JSXAttribute" ? [getText(text, attribute.name)] : [],
    ),
  )

  const defaultPropsToAdd = defaultPropsStr
    .replace(/\{ICON\}/g, `{${icon}}`)
    .trim()
    .split(/\s+(?=\w+=)/)
    .filter((prop) => {
      const propName = prop.split("=")[0]
      return propName && !existingPropNames.has(propName)
    })

  const allProps = [...defaultPropsToAdd, userAttributes]
    .filter(Boolean)
    .join(" ")

  return {
    icon,
    text: replaceElement(`<${componentName} ${allProps} />`),
    isTagName: false,
  }
}

// The opening element of the self-closing element that text is, and
// getJsxAttributes(): its attributes, isOwn, and those of the elements in
// their values.
function parseElement(text: string) {
  const file = parseTransformInput(text)!
  const statement = file.program.body[0] as t.ExpressionStatement
  const element = (statement.expression as t.JSXElement).openingElement

  return {
    element,
    attributes: getJsxAttributes(file).map((attribute) => ({
      ...attribute,
      isOwn: attribute.element === element,
    })),
  }
}

// ts-morph's JsxSelfClosingElement.
function isSelfClosingElement(node: t.Node): node is t.JSXElement {
  return node.type === "JSXElement" && node.openingElement.selfClosing
}

// Whether the element is a child of a JSX element or fragment.
function isJsxChild(file: t.File, element: t.JSXElement) {
  let isChild = false
  t.traverseFast(file, (node) => {
    if (node.type === "JSXElement" || node.type === "JSXFragment") {
      isChild ||= node.children.includes(element)
    }
  })

  return isChild
}

// The edits, each made on the code the one before leaves, that remove the
// IconPlaceholder import, then add the library's imports of the icons.
function transformImports(
  code: string,
  transformedIcons: string[],
  libraryConfig: IconLibrary,
) {
  const edits: TextEdit[] = []
  const file = parseTransformInput(code)
  if (!file) {
    return edits
  }

  // Each edit ends before the next declaration, which it moves by the length
  // it adds.
  let offset = 0
  for (const declaration of getImportDeclarations(file)) {
    if (getText(code, declaration.source).includes("icon-placeholder")) {
      const edited = removeIconPlaceholderImport(
        code,
        declaration.start! + offset,
      )
      edits.push(getTextEdit(code, edited))
      offset += edited.length - code.length
      code = edited
    }
  }

  if (transformedIcons.length === 0) {
    return edits
  }

  // ts-morph removes the semicolon from the added imports when the first
  // import has none, which is never an added one. When an icon name from an
  // expression breaks an import, the declaration TypeScript parses ends at
  // the name, so its semicolon stays.
  const firstImport = getImportDeclarations(parseTransformInput(code)!)[0]
  const useSemicolon = !firstImport || getText(code, firstImport).endsWith(";")

  for (const importStmt of libraryConfig.import.split("\n")) {
    const importMatch = importStmt.match(
      /import\s+{([^}]+)}\s+from\s+['"]([^'"]+)['"]/,
    )

    if (!importMatch) continue

    const [, importedNames, modulePath] = importMatch
    const namedImports = importedNames
      .split(",")
      .map((name) => name.trim())
      .flatMap((name) => (name === "ICON" ? transformedIcons : [name]))

    let text = `import { ${namedImports.join(", ")} } from "${modulePath}";`
    if (!useSemicolon && !namedImports.some((name) => name.startsWith("{"))) {
      text = text.replace(";", "")
    }

    // ts-morph writes the declaration without checking that it parses.
    const edit = getImportDeclarationInsertion(code, text)
    edits.push(edit)
    code = applyEdits(code, [edit])
  }

  return edits
}

function applyEditsInTurn(code: string, edits: TextEdit[]) {
  return edits.reduce((text, edit) => applyEdits(text, [edit]), code)
}

// ts-morph's SourceFile#getImportDeclarations().
function getImportDeclarations(file: t.File) {
  return file.program.body.filter(
    (statement): statement is t.ImportDeclaration =>
      statement.type === "ImportDeclaration",
  )
}

// The import declaration at start loses its IconPlaceholder import, and goes
// when no named import is left.
function removeIconPlaceholderImport(code: string, start: number) {
  const statements = getStatementsWithComments(
    code,
    parseTransformInput(code)!.program,
  )
  const index = statements.findIndex(({ node }) => node?.start === start)
  const declaration = statements[index].node as t.ImportDeclaration
  const names = getNamedImportNames(code, declaration)
  const placeholderIndex = names.indexOf("IconPlaceholder")

  if (placeholderIndex !== -1 && names.length > 1) {
    return removeNamedImport(code, declaration, placeholderIndex)
  }

  if (placeholderIndex !== -1 || names.length === 0) {
    return removeStatement(code, statements, index)
  }

  return code
}

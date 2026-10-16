import { SyntaxKind } from "ts-morph"

import { toTextTransformer, type SourceFileTransformer } from "./source-file.js"

interface TransformInfo {
  elementStart: number
  elementEnd: number
  newText: string
}

export const transformRenderSourceFile: SourceFileTransformer = async ({
  sourceFile,
  config,
}) => {
  if (!config.style?.startsWith("base-")) {
    return sourceFile
  }

  const transformations: TransformInfo[] = []

  const jsxElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)

  for (const jsxElement of jsxElements) {
    const openingElement = jsxElement.getOpeningElement()
    const renderAttr = openingElement.getAttribute("render")

    if (!renderAttr) {
      continue
    }

    const children = jsxElement.getJsxChildren()
    const childrenText = children
      .map((c) => c.getText())
      .join("")
      .trim()

    if (!childrenText) {
      continue
    }

    if (renderAttr.getKind() !== SyntaxKind.JsxAttribute) {
      continue
    }

    const jsxAttr = renderAttr.asKindOrThrow(SyntaxKind.JsxAttribute)
    const initializer = jsxAttr.getInitializer()

    if (!initializer) {
      continue
    }

    if (initializer.getKind() !== SyntaxKind.JsxExpression) {
      continue
    }

    const jsxExpression = initializer.asKindOrThrow(SyntaxKind.JsxExpression)
    const expression = jsxExpression.getExpression()

    if (!expression) {
      continue
    }

    if (expression.getKind() !== SyntaxKind.JsxSelfClosingElement) {
      continue
    }

    const selfClosingElement = expression.asKindOrThrow(
      SyntaxKind.JsxSelfClosingElement,
    )
    const tagName = selfClosingElement.getTagNameNode().getText()
    const attributes = selfClosingElement
      .getAttributes()
      .map((attr) => attr.getText())
      .join(" ")

    const newRenderValue = attributes
      ? `{<${tagName} ${attributes}>${childrenText}</${tagName}>}`
      : `{<${tagName}>${childrenText}</${tagName}>}`

    const parentTagName = openingElement.getTagNameNode().getText()
    const otherAttrs = openingElement
      .getAttributes()
      .filter((attr) => {
        if (attr.getKind() === SyntaxKind.JsxAttribute) {
          const attrName = attr
            .asKindOrThrow(SyntaxKind.JsxAttribute)
            .getNameNode()
            .getText()
          return attrName !== "render"
        }
        return true
      })
      .map((attr) => attr.getText())
      .join(" ")

    const newAttrs = otherAttrs
      ? `${otherAttrs} render=${newRenderValue}`
      : `render=${newRenderValue}`

    const newElementText = `<${parentTagName} ${newAttrs} />`

    transformations.push({
      elementStart: jsxElement.getStart(),
      elementEnd: jsxElement.getEnd(),
      newText: newElementText,
    })
  }

  for (const info of transformations.reverse()) {
    const fullText = sourceFile.getFullText()
    const newFullText =
      fullText.substring(0, info.elementStart) +
      info.newText +
      fullText.substring(info.elementEnd)
    sourceFile.replaceWithText(newFullText)
  }

  return sourceFile
}

export const transformRender = toTextTransformer(transformRenderSourceFile)

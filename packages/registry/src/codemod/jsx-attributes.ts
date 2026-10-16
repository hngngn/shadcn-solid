import { types as t } from "@babel/core"

import { applyManipulation } from "./edits.js"
import { getReplacementText } from "./indentation.js"
import { getDescendants, parseTransformInput } from "./parse.js"
import { getNonWhitespaceStart } from "./trivia.js"

export interface JsxAttribute {
  attribute: t.JSXAttribute
  element: t.JSXOpeningElement
}

export function getJsxAttributes(file: t.File) {
  return getDescendants(file, t.isJSXOpeningElement)
    .flatMap((element) =>
      element.attributes
        .filter((attribute) => attribute.type === "JSXAttribute")
        .map((attribute): JsxAttribute => ({ attribute, element })),
    )
    .sort((a, b) => a.attribute.start! - b.attribute.start!)
}

export function removeJsxAttributes(code: string, indexes: number[]) {
  for (let removed = 0; removed < indexes.length; removed++) {
    const file = parseTransformInput(code)
    if (!file) {
      break
    }
    code = removeJsxAttribute(
      code,
      getJsxAttributes(file)[indexes[removed] - removed],
    )
  }
  return code
}

export function removeJsxAttribute(
  code: string,
  { attribute, element }: JsxAttribute,
) {
  const previous = element.attributes[element.attributes.indexOf(attribute) - 1]
  let start = previous
    ? getNonWhitespaceStart(
        code,
        { pos: previous.end!, start: attribute.start! },
        { end: previous.end!, isComment: false },
      )
    : attribute.start!
  while (start > 0 && " \t\r\n".includes(code[start - 1])) {
    start--
  }

  return applyManipulation(code, [{ start, end: attribute.end!, text: "" }])
}

export function setJsxAttributeInitializer(
  code: string,
  attribute: t.JSXAttribute,
  text: string,
) {
  const initializer = attribute.value!
  const attributeText = getReplacementText(code, attribute.start!, text)
  return applyManipulation(code, [
    {
      start: initializer.start!,
      end: initializer.end!,
      text: getReplacementText(code, initializer.start!, attributeText),
    },
  ])
}

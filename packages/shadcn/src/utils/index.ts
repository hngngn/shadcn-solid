import { transformFont as transformFontText } from "@shadcn-solid/registry/internal/transformers/transform-font"
import { transformIcons as transformIconsText } from "@shadcn-solid/registry/internal/transformers/transform-icons"
import { transformMenu as transformMenuText } from "@shadcn-solid/registry/internal/transformers/transform-menu"

import { fromTextTransformer } from "./transformers/source-file.js"

export { createStyleMap } from "../styles/create-style-map.js"
export { transformStyle } from "../styles/transform.js"
export { transformRenderSourceFile as transformRender } from "./transformers/transform-render.js"

// The registry's transformers take and return text. These keep the signature
// they had: a ts-morph SourceFile in, the new text left in it.
export const transformFont = fromTextTransformer(transformFontText)
export const transformIcons = fromTextTransformer(transformIconsText)
export const transformMenu = fromTextTransformer(transformMenuText)

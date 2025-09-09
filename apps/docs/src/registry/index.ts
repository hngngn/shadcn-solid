import * as v from "valibot"

import { blocks } from "./blocks"
import { charts } from "./charts"
import { examples } from "./examples"
import { hooks } from "./hooks"
import { registryItemSchema } from "./schema"
import { uiV4 } from "./ui-v4"
import { utils } from "./utils"

// Shared between index and style for backward compatibility.
const NEW_YORK_V4_STYLE = {
  type: "registry:style",
  dependencies: ["cva@beta"],
  devDependencies: ["tw-animate-css"],
  registryDependencies: ["utils"],
  cssVars: {},
  files: [],
}

export const registry = {
  name: "shadcn-solid",
  homepage: "https://shadcn-solid.com",
  items: v.parse(v.array(registryItemSchema), [
    {
      name: "index",
      ...NEW_YORK_V4_STYLE,
    },
    {
      name: "style",
      ...NEW_YORK_V4_STYLE,
    },
    ...uiV4,
    ...blocks,
    ...charts,
    ...utils,
    ...hooks,
    ...examples,
  ]),
}

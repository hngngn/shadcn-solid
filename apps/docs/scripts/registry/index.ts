import { examples } from "./examples"
import { hooks } from "./hooks"
import type { Registry } from "./schema"
import { ui } from "./ui"
import { utils } from "./utils"

export const registry: Registry = [...ui, ...examples, ...hooks, ...utils]

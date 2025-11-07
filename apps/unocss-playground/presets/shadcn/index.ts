import type { Preset } from "unocss"
import type { Theme } from "unocss/preset-wind4"

import { preflights } from "./preflights"
import { theme } from "./theme"

export const presetShadcn = (): Preset<Theme> => ({
  name: "unocss-preset-shadcn",
  preflights,
  theme,
})

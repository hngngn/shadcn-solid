import {
  defineConfig,
  presetWebFonts,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss"

import { presetAnimate } from "./presets/animate"
import { presetShadcn } from "./presets/shadcn"

export default defineConfig({
  presets: [
    presetWind4({
      dark: {
        dark: '[data-kb-theme="dark"]',
        light: '[data-kb-theme="light"]',
      },
    }),
    presetWebFonts({
      fonts: {
        sans: {
          name: "Inter",
          weights: [400, 500, 600, 700, 800],
          provider: "fontsource",
        },
      },
    }),
    presetAnimate(),
    presetShadcn(),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
})

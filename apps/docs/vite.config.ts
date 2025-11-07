import { tanstackStart } from "@tanstack/solid-start/plugin/vite"
import tailwindcss from "@tailwindcss/vite"
import { nitro } from "nitro/vite"
import { defineConfig } from "vite"
import viteSolid from "vite-plugin-solid"
import tsConfigPaths from "vite-tsconfig-paths"

import content from "./plugins/content"
import mdx from "./plugins/mdx"

export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    mdx(),
    content(),
    tanstackStart(),
    nitro(),
    viteSolid({
      ssr: true,
      extensions: [".mdx"],
    }),
  ],
  resolve: {
    noExternal: [
      "@kobalte/core",
      "@unovis/solid",
      "@unovis/ts",
      "cmdk-solid",
      "embla-carousel-solid",
    ],
  },
})

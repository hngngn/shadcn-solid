import { tanstackStart } from "@tanstack/solid-start/plugin/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import solid from "vite-plugin-solid"
import tsConfigPaths from "vite-tsconfig-paths"

import content from "./plugins/content"
import mdx from "./plugins/mdx"

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    mdx(),
    content(),
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({
      customViteSolidPlugin: true,
    }),
    solid({
      ssr: true,
      extensions: [".mdx"],
    }),
    tailwindcss(),
  ],
  resolve: {
    noExternal: ["@kobalte/core", "cmdk-solid"],
  },
})

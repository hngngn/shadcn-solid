import { tanstackStart } from "@tanstack/solid-start/plugin/vite"
import netlify from "@netlify/vite-plugin-tanstack-start"
import tailwindcss from "@tailwindcss/vite"
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
    netlify(),
    viteSolid({
      ssr: true,
      extensions: [".mdx"],
    }),
  ],
  resolve: {
    noExternal: ["@kobalte/core", "cmdk-solid"],
  },
})

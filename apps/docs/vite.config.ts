import { tanstackStart } from "@tanstack/solid-start/plugin/vite"
import contentCollections from "@content-collections/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import viteSolid from "vite-plugin-solid"
import tsConfigPaths from "vite-tsconfig-paths"

import mdx from "./plugins/mdx"

export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [
    contentCollections(),
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    mdx(),
    tanstackStart({
      customViteSolidPlugin: true,
      target: "netlify",
    }),
    viteSolid({
      ssr: true,
      extensions: [".mdx"],
    }),
  ],
  resolve: {
    noExternal: ["@kobalte/core", "cmdk-solid"],
  },
})

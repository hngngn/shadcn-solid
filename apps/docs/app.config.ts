import { defineConfig } from "@tanstack/solid-start/config"
import tailwindcss from "@tailwindcss/vite"
import tsConfigPaths from "vite-tsconfig-paths"

import content from "./plugins/content"
import mdx from "./plugins/mdx"

export default defineConfig({
  solid: {
    extensions: [".mdx"],
  },
  tsr: {
    appDirectory: "src",
    autoCodeSplitting: true,
  },
  vite: {
    plugins: [
      mdx(),
      content(),
      tailwindcss(),
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
    resolve: {
      noExternal: ["@kobalte/core", "cmdk-solid"],
    },
  },
})

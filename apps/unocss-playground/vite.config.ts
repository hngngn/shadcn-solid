import { tanstackStart } from "@tanstack/solid-start/plugin/vite"
import unoCSS from "unocss/vite"
import { defineConfig } from "vite"
import viteSolid from "vite-plugin-solid"
import tsConfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  server: {
    port: 3002,
  },
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    unoCSS(),
    tanstackStart({
      customViteSolidPlugin: true,
    }),
    viteSolid({ ssr: true }),
  ],
  resolve: {
    noExternal: ["@kobalte/core", "cmdk-solid"],
  },
})

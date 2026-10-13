import { solidStart } from "@solidjs/start/config"
import tailwindcss from "@tailwindcss/vite"
import { nitro } from "nitro/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [tailwindcss(), solidStart(), nitro()],
  resolve: {
    tsconfigPaths: true,
  },
})

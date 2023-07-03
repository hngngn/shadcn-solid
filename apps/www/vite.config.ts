import vercel from "solid-start-vercel"
import solid from "solid-start/vite"
import { defineConfig } from "vite"

export default defineConfig(() => {
    return {
        plugins: [solid({ ssr: true, adapter: vercel({ edge: false }) })],
        server: {
            port: 3030,
        },
    }
})

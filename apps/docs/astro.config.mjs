import solid from "@astrojs/solid-js"
import vercel from "@astrojs/vercel/serverless"
import { defineConfig } from "astro/config"
import unocss from "unocss/astro"

// https://astro.build/config
export default defineConfig({
	output: "hybrid",
	adapter: vercel(),
	integrations: [
		unocss({
			injectReset: "@unocss/reset/tailwind-compat.css",
		}),
		solid(),
	],
})

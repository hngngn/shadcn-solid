import mdx from "@astrojs/mdx"
import solid from "@astrojs/solid-js"
import vercel from "@astrojs/vercel/serverless"
import { defineConfig } from "astro/config"
import unocss from "unocss/astro"

// https://astro.build/config
export default defineConfig({
	site: `https://${import.meta.env.VERCEL_URL}`,
	output: "server",
	adapter: vercel(),
	integrations: [
		solid(),
		mdx(),
		unocss({
			injectReset: "@unocss/reset/tailwind-compat.css",
		}),
	],
})

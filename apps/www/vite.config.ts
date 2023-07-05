import vercel from "solid-start-vercel"
import solid from "solid-start/vite"
import unocss from "unocss/vite"
import type { Plugin } from "vite"
import { defineConfig } from "vite"
import { solidMDX } from "./src/lib"

export default defineConfig({
	plugins: [
		(await solidMDX()) as Plugin[],
		solid({
			extensions: [".mdx"],
			adapter: vercel({}),
		}),
		unocss(),
	],
	ssr: {
		noExternal: ["@kobalte/core"],
	},
})

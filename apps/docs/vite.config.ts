import solidMDX from "solid-start-mdx"
import vercel from "solid-start-vercel"
import solid from "solid-start/vite"
import unocss from "unocss/vite"
import { defineConfig } from "vite"

export default defineConfig({
	plugins: [
		await solidMDX(),
		solid({
			extensions: [".mdx", ".md"],
			adapter: vercel({}),
		}),
		unocss(),
	],
	ssr: {
		noExternal: ["@kobalte/core"],
	},
})

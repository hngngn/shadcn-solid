import mdx from "@astrojs/mdx";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import rehypePrettyCode from "rehype-pretty-code";
import blackout from "./public/theme/dark.json";

// https://astro.build/config
export default defineConfig({
	markdown: {
		syntaxHighlight: false,
		rehypePlugins: [[rehypePrettyCode, { theme: blackout }]],
	},
	output: "server",
	adapter: vercel(),
	integrations: [
		solidJs(),
		tailwind({
			applyBaseStyles: false,
		}),
		mdx(),
	],
});

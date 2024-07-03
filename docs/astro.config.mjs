import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import rehypePrettyCode from "rehype-pretty-code";
import blackout from "./public/theme/dark.json";
import { siteConfig } from "./src/config/site";

// https://astro.build/config
export default defineConfig({
	site: siteConfig.url,
	trailingSlash: "never",
	markdown: {
		syntaxHighlight: false,
		rehypePlugins: [
			[
				rehypePrettyCode,
				{
					theme: blackout,
				},
			],
		],
	},
	integrations: [
		solidJs(),
		tailwind({
			applyBaseStyles: false,
		}),
		mdx(),
		sitemap({
			serialize(item) {
				if (item.url === siteConfig.url) {
					item.changefreq = "daily";
					item.lastmod = new Date();
					item.priority = 1;
				} else {
					item.changefreq = "daily";
					item.lastmod = new Date();
					item.priority = 0.9;
				}
				return item;
			},
		}),
	],
});

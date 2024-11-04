import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import rehypePrettyCode from "rehype-pretty-code";
import { codeImport } from "remark-code-import";
import { visit } from "unist-util-visit";
import { siteConfig } from "./src/config/site";

// https://astro.build/config
export default defineConfig({
	site: siteConfig.url,
	trailingSlash: "never",
	markdown: {
		syntaxHighlight: false,
		remarkPlugins: [
			[
				codeImport,
				{
					allowImportingFromOutside: true
				}
			]
		],
		rehypePlugins: [
			() => (tree) => {
				visit(tree, (node) => {
					if (node.type === "element" && node.tagName === "pre") {
						const [codeEl] = node.children;
						if (codeEl.tagName !== "code") return;

						node.__rawString__ = codeEl.children[0].value;
						node.__src__ = node.properties.__src__;
					}
				});
			},
			[
				rehypePrettyCode,
				{
					theme: "vesper",
				},
			],
			() => (tree) => {
				visit(tree, (node) => {
					if (node?.type === "element" && node?.tagName === "figure") {
						if (!("data-rehype-pretty-code-figure" in node.properties)) return;

						const preElement = node.children.at(-1);
						if (preElement.tagName !== "pre") return;

						preElement.properties.withMeta =
							node.children.at(0).tagName === "figcaption";
						preElement.properties.rawString = node.__rawString__;
						if (node.__src__) preElement.properties.src = node.__src__;
					}
				});
			},
			() => (tree) => {
				visit(tree, (node) => {
					if (node.type !== "element" || node?.tagName !== "pre") return;

					// npm install.
					if (node.properties?.rawString?.startsWith("npm install")) {
						const npmCommand = node.properties.rawString;
						node.properties.npmCommand = npmCommand;
						node.properties.yarnCommand = npmCommand.replace(
							"npm install",
							"yarn add",
						);
						node.properties.pnpmCommand = npmCommand.replace(
							"npm install",
							"pnpm add",
						);
						node.properties.bunCommand = npmCommand.replace(
							"npm install",
							"bun add",
						);
					}

					// npx create.
					if (node.properties?.rawString?.startsWith("npx create-")) {
						const npmCommand = node.properties.rawString;
						node.properties.npmCommand = npmCommand;
						node.properties.yarnCommand = npmCommand.replace(
							"npx create-",
							"yarn create ",
						);
						node.properties.pnpmCommand = npmCommand.replace(
							"npx create-",
							"pnpm create ",
						);
						node.properties.bunCommand = npmCommand.replace(
							"npx create-",
							"bun create",
						);
					}

					// npx.
					if (
						node.properties?.rawString?.startsWith("npx") &&
						!node.properties?.rawString?.startsWith("npx create-")
					) {
						const npmCommand = node.properties.rawString;
						node.properties.npmCommand = npmCommand;
						node.properties.yarnCommand = npmCommand;
						node.properties.pnpmCommand = npmCommand.replace("npx", "pnpm dlx");
						node.properties.bunCommand = npmCommand.replace("npx", "bunx");
					}
				});
			},
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

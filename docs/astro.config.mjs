import { readFileSync } from "node:fs";
import { join } from "node:path";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import rehypePrettyCode from "rehype-pretty-code";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";
import blackout from "./public/theme/dark.json";
import { frameworks } from "./scripts/utils/framework";
import { styles } from "./scripts/utils/styles";
import { Index } from "./src/__registry__";
import { siteConfig } from "./src/config/site";

const getNodeAttributeByName = (node, name) => {
	return node.attributes?.find((attribute) => attribute.name === name);
};

// https://astro.build/config
export default defineConfig({
	site: siteConfig.url,
	trailingSlash: "never",
	markdown: {
		syntaxHighlight: false,
		rehypePlugins: [
			() => (tree) => {
				visit(tree, (node) => {
					if (node.name === "ComponentPreview") {
						const name = getNodeAttributeByName(node, "name")?.value;

						if (!name) {
							return null;
						}

						try {
							for (const style of styles) {
								for (const framework of frameworks) {
									if (Index[style.name][framework.name] === undefined) {
										break;
									}
									const component = Index[style.name][framework.name][name];
									if (!component) {
										continue;
									}

									const src = component.files[0];

									const filePath = join(process.cwd(), src);
									const source = readFileSync(filePath, "utf8");

									node.children?.push(
										u("element", {
											tagName: "pre",
											properties: {},
											children: [
												u("element", {
													tagName: "code",
													properties: {
														className: ["language-tsx"],
													},
													children: [
														{
															type: "text",
															value: source,
														},
													],
												}),
											],
										}),
									);
								}
							}
						} catch (error) {
							console.error(error);
						}
					}
				});
			},
			() => (tree) => {
				visit(tree, (node) => {
					if (node.type === "element" && node.tagName === "pre") {
						const [codeEl] = node.children;
						if (codeEl.tagName !== "code") return;

						node.__rawString__ = codeEl.children[0].value;
					}
				});
			},
			[
				rehypePrettyCode,
				{
					theme: blackout,
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

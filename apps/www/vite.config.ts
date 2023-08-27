import path from "path"
import rehypePrettyCode, { LineElement } from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import { getHighlighter, loadTheme } from "shiki"
import vercelAdapter from "solid-start-vercel"
import solid from "solid-start/vite"
import { visit } from "unist-util-visit"
import { defineConfig } from "vite"
import { rehypeComponent } from "./src/lib/mdx/component"
import { solidFrontmatter } from "./src/lib/mdx/frontmatter"
import { solidHeadings } from "./src/lib/mdx/headings"

export default defineConfig({
	plugins: [
		{
			...(await import("@mdx-js/rollup")).default({
				jsx: true,
				jsxImportSource: "solid-js",
				providerImportSource: "solid-mdx",
				remarkPlugins: [remarkGfm, remarkFrontmatter, solidFrontmatter],
				rehypePlugins: [
					rehypeSlug,
					solidHeadings,
					rehypeComponent,
					() => (tree) => {
						visit(tree, (node) => {
							if (
								node?.type === "element" &&
								node?.tagName === "pre"
							) {
								const [codeEl] = node.children
								if (codeEl.tagName !== "code") {
									return
								}

								node.__rawString__ = codeEl.children?.[0].value
							}
						})
					},
					[
						rehypePrettyCode,
						{
							getHighlighter: async () => {
								const theme = await loadTheme(
									path.join(
										process.cwd(),
										"/src/lib/themes/dark.json"
									)
								)
								return await getHighlighter({ theme })
							},
							onVisitLine(node: LineElement) {
								if (node.children.length === 0) {
									node.children = [
										{ type: "text", value: " " },
									]
								}
							},
							onVisitHighlightedLine(node: LineElement) {
								node.properties.className?.push(
									"line--highlighted"
								)
							},
							onVisitHighlightedWord(node: LineElement) {
								node.properties.className = [
									"word--highlighted",
								]
							},
						},
					],
					() => (tree) => {
						visit(tree, (node) => {
							if (
								node?.type === "element" &&
								node?.tagName === "div"
							) {
								if (
									!(
										"data-rehype-pretty-code-fragment" in
										node.properties
									)
								) {
									return
								}

								const preElement = node.children.at(-1)
								if (preElement.tagName !== "pre") {
									return
								}

								preElement.properties["data-meta"] =
									node.children.at(0).tagName === "div"

								preElement.properties["data-package"] =
									node.__rawString__?.startsWith(
										"npm install"
									) ||
									node.__rawString__?.startsWith(
										"npx create-"
									) ||
									node.__rawString__?.startsWith("npx")
							}
						})
					},
				],
			}),
			enforce: "pre",
		},
		solid({
			ssr: false,
			extensions: [".mdx"],
			adapter: vercelAdapter(),
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
})

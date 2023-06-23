// @ts-nocheck

import { parse as parseAcorn } from "acorn"
import { name as isValidIdentifierName } from "estree-util-is-identifier-name"
import { valueToEstree } from "estree-util-value-to-estree"
import fs from "fs"
import Slugger from "github-slugger"
import path from "path"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import type { VisitableElement } from "rehype-pretty-code"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkCodeImport from "remark-code-import"
import remarkFrontmatter from "remark-frontmatter"
import remarkGFM from "remark-gfm"
import { getHighlighter, loadTheme } from "shiki"
import { u } from "unist-builder"
import { visit } from "unist-util-visit"
import { parse as parseYaml } from "yaml"

export const solidMDX = async () => {
	const cache = new Map()
	const headingsCache = new Map()
	const frontMatterCache = new Map()

	const createExport = (object) => {
		return {
			type: "mdxjsEsm",
			value: "",
			data: {
				estree: {
					type: "Program",
					sourceType: "module",
					body: [
						{
							type: "ExportNamedDeclaration",
							specifiers: [],
							declaration: {
								type: "VariableDeclaration",
								kind: "const",
								declarations: Object.entries(object).map(
									([identifier, val]) => {
										if (
											!isValidIdentifierName(identifier)
										) {
											throw new Error(
												`Frontmatter keys should be valid identifiers, got: ${JSON.stringify(
													identifier
												)}`
											)
										}
										return {
											type: "VariableDeclarator",
											id: {
												type: "Identifier",
												name: identifier,
											},
											init: valueToEstree(val),
										}
									}
								),
							},
						},
					],
				},
			},
		}
	}

	const jsToTreeNode = (jsString, acornOpts) => {
		return {
			type: "mdxjsEsm",
			value: "",
			data: {
				estree: {
					body: [],
					...parseAcorn(
						jsString,
						acornOpts ?? {
							sourceType: "module",
							ecmaVersion: 2020,
						}
					),
					type: "Program",
					sourceType: "module",
				},
			},
		}
	}

	const remarkMDXFrontmatter = ({ name, parsers } = {}) => {
		const allParsers = {
			yaml: parseYaml,
			...parsers,
		}

		return (ast, file) => {
			const imports = []

			if (name && !isValidIdentifierName(name)) {
				throw new Error(
					`If name is specified, this should be a valid identifier name, got: ${JSON.stringify(
						name
					)}`
				)
			}

			for (const node of ast.children) {
				if (!Object.hasOwnProperty.call(allParsers, node.type)) {
					continue
				}

				const parser = allParsers[node.type]

				const { value } = node
				const data = parser(value)
				if (data == null) {
					continue
				}
				if (!name && typeof data !== "object") {
					throw new Error(
						`Expected frontmatter data to be an object, got:\n${value}`
					)
				}

				frontMatterCache.set(file.path, data)

				imports.push(createExport(name ? { [name]: data } : data))
			}

			if (name && !imports.length) {
				imports.push(createExport({ [name]: undefined }))
			}

			ast.children.unshift(...imports)
		}
	}

	const rehypeCollectHeadings = () => {
		const slugger = new Slugger()

		return (tree, file) => {
			const headings = []

			visit(tree, (node) => {
				if (node.type !== "element") return
				const { tagName } = node
				if (tagName[0] !== "h") return
				const [, level] = tagName.match(/h([0-6])/) ?? []
				if (!level) return
				const depth = Number.parseInt(level)

				let text = ""
				visit(node, (child, __, parent) => {
					if (child.type === "element" || parent == null) {
						return
					}
					if (
						child.type === "raw" &&
						child.value.match(/^\n?<.*>\n?$/)
					) {
						return
					}
					if (
						new Set(["text", "raw", "mdxTextExpression"]).has(
							child.type
						)
					) {
						text += child.value
					}
				})

				node.properties = node.properties || {}
				if (typeof node.properties.id !== "string") {
					let slug = slugger.slug(text)
					if (slug.endsWith("-")) {
						slug = slug.slice(0, -1)
					}
					node.properties.id = slug
				}

				headings.push({ depth, slug: node.properties.id, text })
			})

			headingsCache.set(file.path, headings)
			tree.children.unshift(
				jsToTreeNode(
					`export const getHeadings = () => {
						return ${JSON.stringify(headings)}
					}`,
					null
				)
			)
		}
	}

	const getNodeAttributeByName = (node, name) => {
		return node.attributes?.find((attribute) => attribute.name === name)
	}

	const getComponentSourceFileContent = (node) => {
		const src = getNodeAttributeByName(node, "src")?.value

		if (!src) {
			return null
		}

		// Read the source file.
		const filePath = path.join(process.cwd(), src)
		const source = fs.readFileSync(filePath, "utf8")

		return source
	}

	const rehypeComponent = () => {
		return async (tree) => {
			visit(tree, (node) => {
				const { value: src } = getNodeAttributeByName(node, "src") || {}

				if (node.name === "ComponentExample") {
					const source = getComponentSourceFileContent(node)
					if (!source) {
						return
					}

					node.children?.push(
						u("element", {
							tagName: "pre",
							properties: {
								__src__: src,
							},
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
						})
					)

					const extractClass = getNodeAttributeByName(
						node,
						"extractClass"
					)
					if (
						extractClass &&
						typeof extractClass.value !== "undefined" &&
						extractClass.value !== "false"
					) {
						const values = source.match(/class="(.*)"/)
						const className = values ? values[1] : ""

						node.attributes?.push({
							name: "extractedClasses",
							type: "mdxJsxAttribute",
							value: className,
						})

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
												value: className,
											},
										],
									}),
								],
							})
						)
					}
				}

				if (node.name === "ComponentSource") {
					const source = getComponentSourceFileContent(node)
					if (!source) {
						return
					}

					node.children?.push(
						u("element", {
							tagName: "pre",
							properties: {
								__src__: src,
							},
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
						})
					)
				}
			})
		}
	}

	let plugin = {
		...(await import("@mdx-js/rollup")).default({
			jsx: true,
			jsxImportSource: "solid-js",
			providerImportSource: "solid-mdx",
			remarkPlugins: [
				remarkCodeImport,
				remarkGFM,
				remarkFrontmatter,
				remarkMDXFrontmatter,
			],
			rehypePlugins: [
				rehypeSlug,
				rehypeComponent,
				[
					rehypePrettyCode,
					{
						getHighlighter: async () => {
							const theme = await loadTheme(
								path.join(
									process.cwd(),
									"./src/lib/themes/dark.json"
								)
							)
							return await getHighlighter({ theme })
						},
						onVisitLine(node: VisitableElement) {
							if (node.children.length === 0) {
								node.children = [{ type: "text", value: " " }]
							}
						},
						onVisitHighlightedLine(node: VisitableElement) {
							node.properties.className?.push("line--highlighted")
						},
						onVisitHighlightedWord(node: VisitableElement) {
							node.properties.className = ["word--highlighted"]
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

							if (node.children.at(0).tagName === "div") {
								node.properties["data-metadata"] = ""
							}
						}
					})
				},
				[
					rehypeAutolinkHeadings,
					{
						properties: {
							class: ["subheading-anchor"],
							ariaLabel: "Link to section",
						},
					},
				],
				rehypeCollectHeadings,
			],
		}),
		enforce: "pre",
	}

	return [
		{
			...plugin,
			async transform(code, id) {
				if (id.endsWith(".mdx") || id.endsWith(".md")) {
					if (cache.has(code)) {
						return cache.get(code)
					}

					let result = await plugin.transform?.call(this, code, id)
					cache.set(code, result)

					return result
				}
			},
		},

		{
			...plugin,
			name: "mdx-meta",
			async transform(code, id) {
				if (id.endsWith(".mdx?meta") || id.endsWith(".md?meta")) {
					id = id.replace(/\?meta$/, "")

					const getCode = () => {
						return `
						export const getHeadings = () => {
							return ${JSON.stringify(headingsCache.get(id), null, 2)}
						}

						export const getFrontMatter = () => {
							return ${JSON.stringify(frontMatterCache.get(id), null, 2)}
						}`
					}

					if (cache.has(code)) {
						return { code: getCode() }
					}

					let result = await plugin.transform?.call(this, code, id)

					cache.set(code, result)

					return {
						code: getCode(),
					}
				}
			},
		},

		{
			name: "twoslash-fix-lsp-linebreaks",
			transform: (code, id) => {
				if (
					id.endsWith(".md") ||
					id.endsWith(".mdx") ||
					id.endsWith(".mdx?meta") ||
					id.endsWith(".md?meta")
				) {
					return {
						code: code
							.replace(/lsp="([^"]*)"/g, (match, p1) => {
								return `lsp={\`${p1.replaceAll("`", `\\\``)}\`}`
							})
							.replace(/{"\\n"}/g, ""),
					}
				}
			},
			enforce: "pre",
		},
	]
}

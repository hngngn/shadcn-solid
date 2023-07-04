import { valueToEstree } from "estree-util-value-to-estree"
import { visit } from "unist-util-visit"

export const solidRehypeHeadings = () => {
	return (tree: any) => {
		const headings: any[] = []

		visit(tree, "element", (node: any) => {
			const { tagName } = node
			if (tagName[0] !== "h") return
			const [, level] = tagName.match(/h([0-6])/) ?? []
			if (!level) return
			const depth = Number.parseInt(level)

			let text = ""
			visit(node, (child: any, __, parent: any) => {
				if (child.type === "element" || parent == null) {
					return
				}
				if (child.type === "raw" && child.value.match(/^\n?<.*>\n?$/)) {
					return
				}
				if (new Set(["text"]).has(child.type)) {
					text += child.value
				}
			})

			node.properties = node.properties || {}

			headings.push({
				depth,
				slug: node.properties.id,
				text,
			})
		})

		tree.children.unshift({
			type: "mdxjsEsm",
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
								declarations: Object.entries({
									headings,
								}).map(([identifier, val]) => {
									return {
										type: "VariableDeclarator",
										id: {
											type: "Identifier",
											name: identifier,
										},
										init: valueToEstree(val),
									}
								}),
							},
						},
					],
				},
			},
		})
	}
}

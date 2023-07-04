import { valueToEstree } from "estree-util-value-to-estree"
import { parse as yamlParse } from "yaml"

export const solidRemarkFrontmatter = () => {
	return (tree: any) => {
		const { children } = tree

		const frontmatterNode = children.find((node: any) => {
			return node.type === "yaml"
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
									frontmatter: yamlParse(
										frontmatterNode.value
									),
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

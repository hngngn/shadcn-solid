import { valueToEstree } from "estree-util-value-to-estree"
import { parse } from "yaml"

export const solidFrontmatter = () => (tree) => {
	const node = tree.children.find((node) => node.type === "yaml")

	if (node === undefined) {
		return
	}

	const data = parse(node.value)

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
								frontmatter: data,
							}).map(([identifier, value]) => ({
								type: "VariableDeclarator",
								id: {
									type: "Identifier",
									name: identifier,
								},
								init: valueToEstree(value),
							})),
						},
					},
				],
			},
		},
	})
}

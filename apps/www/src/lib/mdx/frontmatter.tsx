import { valueToEstree } from "estree-util-value-to-estree"
import type { Literal, Parent } from "unist"
import { parse } from "yaml"

type TKolbate = {
	link: string
	api: string
}

export type TFrontmatter = {
	title: string
	description: string
	component?: boolean
	kobalte?: TKolbate
}

export const solidFrontmatter = () => (tree: Parent) => {
	const node = tree.children.find((node) => node.type === "yaml")

	const data = parse((node as Literal).value as string)

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

import { defineConfig, s } from "velite";

export default defineConfig({
	collections: {
		docs: {
			name: "docs",
			pattern: "docs/**/*.mdx",
			schema: s.object({
				title: s.string(),
				description: s.string(),
				component: s.boolean().optional(),
				link: s
					.object({
						doc: s.string().optional(),
						api: s.string().optional(),
					})
					.optional(),
				toc: s.boolean().optional(),
				code: s.mdx(),
			}),
		},
	},
	output: {
		clean: true,
	},
	root: "src/content",
});

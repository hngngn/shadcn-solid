import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const docs = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/data/docs" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		component: z.boolean().optional(),
		link: z
			.object({
				doc: z.string().optional(),
				api: z.string().optional(),
			})
			.optional(),
		toc: z.boolean().optional(),
	}),
});

export const collections = {
	docs,
};

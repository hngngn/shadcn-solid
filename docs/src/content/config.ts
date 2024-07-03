import { defineCollection, z } from "astro:content";

const docsCollection = defineCollection({
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
	docs: docsCollection,
};

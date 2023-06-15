import { defineCollection, z } from "astro:content"

const schema = z.object({
	title: z.string(),
	description: z.string(),
	component: z.boolean().optional(),
	source: z.string().optional(),
	kobalte: z.string().optional(),
	external: z.string().optional(),
})

const docs = defineCollection({
	schema,
})

export type TDocsCollection = z.infer<typeof schema>

export const collections = { docs }

import {
  createDefaultImport,
  defineCollection,
  defineConfig,
} from "@content-collections/core"
import GithubSlugger from "github-slugger"
import { fromMarkdown } from "mdast-util-from-markdown"
import { mdxFromMarkdown } from "mdast-util-mdx"
import { mdxjs } from "micromark-extension-mdxjs"
import { visit } from "unist-util-visit"
import * as v from "valibot"

const generateHeadings = (content: string) => {
  const slugger = new GithubSlugger()

  const headings: { depth: number; slug: string; text: string }[] = []

  const usedSlugs = new Map<string, number>()

  const tree = fromMarkdown(content, {
    extensions: [mdxjs()],
    mdastExtensions: [mdxFromMarkdown()],
  })

  visit(tree, "heading", (node) => {
    const value = node.children
      .filter((i) => i.type === "text" || i.type === "inlineCode")
      .map((i) => i.value)
      .join("")

    // Normalize value and slug base
    let baseSlug = slugger.slug(value)

    // Remove trailing -<number> if present
    const match = /(.*)-(\d+)$/.exec(baseSlug)
    if (match) {
      baseSlug = match[1]
    }

    // Track duplicates
    const count = usedSlugs.get(baseSlug) ?? 0
    usedSlugs.set(baseSlug, count + 1)

    const finalSlug = count === 0 ? baseSlug : `${baseSlug}-${count}`

    headings.push({
      depth: node.depth,
      text: value,
      slug: finalSlug,
    })
  })

  return headings
}

const docs = defineCollection({
  name: "docs",
  directory: "src/content/docs",
  include: "**/*.mdx",
  schema: v.object({
    title: v.string(),
    description: v.string(),
    link: v.optional(
      v.object({
        doc: v.optional(v.string()),
        api: v.optional(v.string()),
      }),
    ),
    content: v.string(),
  }),
  transform: (document) => {
    const headings = generateHeadings(document.content)
    const component = createDefaultImport(
      `../../src/content/docs/${document._meta.filePath}`,
    )

    return {
      ...document,
      headings,
      component,
    }
  },
})

export default defineConfig({
  content: [docs],
})

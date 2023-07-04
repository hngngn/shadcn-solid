import path from "path"
import rehypeSlug from "rehype-slug"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import vercel from "solid-start-vercel"
import solid from "solid-start/vite"
import { defineConfig } from "vite"
import { solidRemarkFrontmatter } from "./src/lib/mdx/frontmatter"
import { solidRehypeHeadings } from "./src/lib/mdx/headings"

export default defineConfig(async () => {
    return {
        plugins: [
            {
                ...(await import("@mdx-js/rollup")).default({
                    jsx: true,
                    jsxImportSource: "solid-js",
                    providerImportSource: "solid-mdx",
                    remarkPlugins: [
                        remarkGfm,
                        remarkFrontmatter,
                        solidRemarkFrontmatter,
                    ],
                    rehypePlugins: [rehypeSlug, solidRehypeHeadings],
                }),
                enforce: "pre",
            },
            solid({
                ssr: true,
                adapter: vercel({ edge: false }),
                extensions: [".mdx"],
            }),
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        server: {
            port: 3030,
        },
        ssr: {
            noExternal: ["@kobalte/core"],
        },
    }
})

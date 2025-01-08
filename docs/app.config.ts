import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "@solidjs/start/config"
//@ts-expect-error
import pkg from "@vinxi/plugin-mdx"
import { rehypePrettyCode, type Options } from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import { codeImport } from "remark-code-import"
import remarkFrontmatter from "remark-frontmatter"
import remarkGFM from "remark-gfm"
import { visit } from "unist-util-visit"

import docsGen from "./plugins/gen"

const { default: mdx } = pkg

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  extensions: ["mdx"],
  vite: {
    plugins: [
      mdx.withImports({})({
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "@/components/mdx",
        remarkPlugins: [
          remarkGFM,
          remarkFrontmatter,
          [
            codeImport,
            {
              allowImportingFromOutside: true,
            } satisfies Parameters<typeof codeImport>[0],
          ],
        ],
        rehypePlugins: [
          rehypeSlug,
          () => (tree: any) => {
            visit(tree, (node) => {
              if (node.type === "element" && node.tagName === "pre") {
                const [codeEl] = node.children
                if (codeEl.tagName !== "code") return

                node.__rawString__ = codeEl.children[0].value
                node.__src__ = node.properties.__src__
              }
            })
          },
          [
            rehypePrettyCode,
            {
              theme: "vesper",
              keepBackground: false,
            } satisfies Options,
          ],
          () => (tree: any) => {
            visit(tree, (node) => {
              if (node?.type === "element" && node?.tagName === "figure") {
                if (!("data-rehype-pretty-code-figure" in node.properties))
                  return

                const preElement = node.children.at(-1)
                if (preElement.tagName !== "pre") return

                preElement.properties.withMeta =
                  node.children.at(0).tagName === "figcaption"
                preElement.properties.rawString = node.__rawString__
                if (node.__src__) preElement.properties.src = node.__src__
              }
            })
          },
          () => (tree: any) => {
            visit(tree, (node) => {
              if (node.type !== "element" || node?.tagName !== "pre") return

              // npm install.
              if (node.properties?.rawString?.startsWith("npm install")) {
                const npmCommand = node.properties.rawString
                node.properties.npmCommand = npmCommand
                node.properties.yarnCommand = npmCommand.replace(
                  "npm install",
                  "yarn add"
                )
                node.properties.pnpmCommand = npmCommand.replace(
                  "npm install",
                  "pnpm add"
                )
                node.properties.bunCommand = npmCommand.replace(
                  "npm install",
                  "bun add"
                )
              }

              // npx create.
              if (node.properties?.rawString?.startsWith("npx create-")) {
                const npmCommand = node.properties.rawString
                node.properties.npmCommand = npmCommand
                node.properties.yarnCommand = npmCommand.replace(
                  "npx create-",
                  "yarn create "
                )
                node.properties.pnpmCommand = npmCommand.replace(
                  "npx create-",
                  "pnpm create "
                )
                node.properties.bunCommand = npmCommand.replace(
                  "npx create-",
                  "bun create"
                )
              }

              // npx.
              if (
                node.properties?.rawString?.startsWith("npx") &&
                !node.properties?.rawString?.startsWith("npx create-")
              ) {
                const npmCommand = node.properties.rawString
                node.properties.npmCommand = npmCommand
                node.properties.yarnCommand = npmCommand
                node.properties.pnpmCommand = npmCommand.replace(
                  "npx",
                  "pnpm dlx"
                )
                node.properties.bunCommand = npmCommand.replace("npx", "bunx")
              }
            })
          },
          () => (tree: any) => {
            visit(tree, "text", (node) => {
              if (node.value.includes("@/registry")) {
                node.value = node.value
                  .replace(/@\/registry\/tailwindcss\/hooks\//g, "@/hooks/")
                  .replace(/@\/registry\/tailwindcss\/libs\//g, "@/libs/")
                  .replace(
                    /@\/registry\/tailwindcss\/ui\//g,
                    "@/components/ui/"
                  )
              }
            })
          },
        ],
      }),
      docsGen(),
    ],
    resolve: {
      alias: {
        "#content": resolve(__dirname, "./.content"),
        "@": resolve(__dirname, "./src"),
      },
    },
  },
})

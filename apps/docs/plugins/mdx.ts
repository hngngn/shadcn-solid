import mdx from "@mdx-js/rollup"
import { rehypePrettyCode, type Options } from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import codeImport from "remark-code-import"
import remarkFrontmatter from "remark-frontmatter"
import remarkGFM from "remark-gfm"
import type { Plugin } from "vite"

export default (): Plugin => {
  return {
    enforce: "pre",
    ...mdx({
      jsx: true,
      jsxImportSource: "solid-js",
      providerImportSource: "solid-mdx",
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
        [
          rehypePrettyCode,
          {
            theme: {
              dark: "github-dark",
              light: "github-light-default",
            },
            transformers: [
              {
                code(node) {
                  if (node.tagName === "code") {
                    const raw = this.source
                    node.properties.__raw__ = raw

                    if (raw.startsWith("npm install")) {
                      node.properties.__npm__ = raw
                      node.properties.__yarn__ = raw.replace(
                        "npm install",
                        "yarn add",
                      )
                      node.properties.__pnpm__ = raw.replace(
                        "npm install",
                        "pnpm add",
                      )
                      node.properties.__bun__ = raw.replace(
                        "npm install",
                        "bun add",
                      )
                    }

                    if (raw.startsWith("npx create-")) {
                      node.properties.__npm__ = raw
                      node.properties.__yarn__ = raw.replace(
                        "npx create-",
                        "yarn create ",
                      )
                      node.properties.__pnpm__ = raw.replace(
                        "npx create-",
                        "pnpm create ",
                      )
                      node.properties.__bun__ = raw.replace("npx", "bunx --bun")
                    }

                    // npm create.
                    if (raw.startsWith("npm create")) {
                      node.properties.__npm__ = raw
                      node.properties.__yarn__ = raw.replace(
                        "npm create",
                        "yarn create",
                      )
                      node.properties.__pnpm__ = raw.replace(
                        "npm create",
                        "pnpm create",
                      )
                      node.properties.__bun__ = raw.replace(
                        "npm create",
                        "bun create",
                      )
                    }

                    // npx.
                    if (raw.startsWith("npx")) {
                      node.properties.__npm__ = raw
                      node.properties.__yarn__ = raw.replace("npx", "yarn")
                      node.properties.__pnpm__ = raw.replace("npx", "pnpx")
                      node.properties.__bun__ = raw.replace("npx", "bunx --bun")
                    }

                    // npm run.
                    if (raw.startsWith("npm run")) {
                      node.properties.__npm__ = raw
                      node.properties.__yarn__ = raw.replace("npm run", "yarn")
                      node.properties.__pnpm__ = raw.replace("npm run", "pnpm")
                      node.properties.__bun__ = raw.replace("npm run", "bun")
                    }
                  }
                },
              },
            ],
          } satisfies Options,
        ],
        rehypeSlug,
      ],
    }),
  }
}

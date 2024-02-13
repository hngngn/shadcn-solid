import { readFileSync } from "fs"
import { join } from "path"
import { u } from "unist-builder"
import { visit } from "unist-util-visit"
import { Index } from "../src/__registry__"
import { styles } from "../src/registry/styles"

export const rehypeComponent = () => (tree) =>
  visit(tree, (node) => {
    if ("name" in node && node.name === "ComponentSource") {
      const name = getNodeAttributeByName(node, "name")?.value

      if (!name) {
        return null
      }

      try {
        for (const style of styles) {
          const component = Index[style.name][name]
          const src = component.files[0]

          // Read the source file.
          const filePath = join(process.cwd(), `src/${src}`)
          let source = readFileSync(filePath, "utf8")

          // Replace imports.
          // TODO: Use @swc/core and a visitor to replace this.
          // For now a simple regex should do.
          source = source.replaceAll(`../ui`, "@/components/")

          // Add code as children so that rehype can take over at build time.
          node.children?.push(
            u("element", {
              tagName: "pre",
              children: [
                u("element", {
                  tagName: "code",
                  properties: {
                    className: ["language-tsx"],
                  },
                  children: [
                    {
                      type: "text",
                      value: source,
                    },
                  ],
                }),
              ],
            }),
          )
        }
      } catch (error) {
        console.error(error)
      }
    }

    if ("name" in node && node.name === "ComponentPreview") {
      const name = getNodeAttributeByName(node, "name")?.value

      if (!name) {
        return null
      }

      try {
        for (const style of styles) {
          const component = Index[style.name][name]
          if (!component) {
            continue
          }

          const src = component.files[0]

          // Read the source file.
          const filePath = join(process.cwd(), `src/${src}`)
          let source = readFileSync(filePath, "utf8")

          // Replace imports.
          // TODO: Use @swc/core and a visitor to replace this.
          // For now a simple regex should do.
          source = source.replaceAll(`../ui`, "@/components/ui")

          // Add code as children so that rehype can take over at build time.

          node.children?.splice(
            1,
            0,
            u("element", {
              tagName: "pre",
              children: [
                u("element", {
                  tagName: "code",
                  properties: {
                    className: ["language-tsx"],
                  },
                  children: [
                    {
                      type: "text",
                      value: source,
                    },
                  ],
                }),
              ],
            }),
          )
        }
      } catch (error) {
        console.error(error)
      }
    }
  })

const getNodeAttributeByName = (node, name) => {
  return node.attributes?.find((attribute) => attribute.name === name)
}

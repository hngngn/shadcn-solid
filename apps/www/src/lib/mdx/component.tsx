import fs from "fs"
import path from "path"
import { u } from "unist-builder"
import { visit } from "unist-util-visit"
import { Index } from "../../__registry__"
import { styles } from "../../registry/styles"

export const rehypeComponent = () => {
    return async (tree: any) => {
        visit(tree, (node) => {
            if (node.name === "ComponentSource") {
                const name = getNodeAttributeByName(node, "name")
                    ?.value as string

                if (!name) {
                    return null
                }

                try {
                    for (const style of styles) {
                        const component = Index[style.name][name]
                        const src = component.files[0]

                        // Read the source file.
                        const filePath = path.join(process.cwd(), `src/${src}`)
                        let source = fs.readFileSync(filePath, "utf8")

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
                            })
                        )
                    }
                } catch (error) {
                    console.error(error)
                }
            }

            if (node.name === "ComponentPreview") {
                const name = getNodeAttributeByName(node, "name")
                    ?.value as string

                if (!name) {
                    return null
                }

                try {
                    for (const style of styles) {
                        const component = Index[style.name][name]
                        if (component === undefined) {
                            return
                        }

                        const src = component.files[0]

                        // Read the source file.
                        const filePath = path.join(process.cwd(), `src/${src}`)
                        let source = fs.readFileSync(filePath, "utf8")

                        // Replace imports.
                        // TODO: Use @swc/core and a visitor to replace this.
                        // For now a simple regex should do.
                        source = source.replaceAll(`../ui`, "@/components/ui")

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
                            })
                        )
                    }
                } catch (error) {
                    console.error(error)
                }
            }
        })
    }
}

const getNodeAttributeByName = (node: any, name: string) => {
    return node.attributes?.find((attribute: any) => attribute.name === name)
}

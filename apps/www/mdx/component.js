import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";
import { Index } from "../src/__registry__";
import { frameworks } from "../src/registry/framework";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const rehypeComponent = () => tree =>
  visit(tree, node => {
    if ("name" in node && node.name === "ComponentSource") {
      const name = getNodeAttributeByName(node, "name")?.value;
      const css = getNodeAttributeByName(node, "css")?.value;

      if (!name || !css) {
        return null;
      }

      try {
        const component = Index[css][name];
          const src = component.files[0];
          // Read the source file.
          const filePath = css === "unocss" ? join(__dirname, `${src}`): join(__dirname, `src/${src}`);
          let source = readFileSync(filePath, "utf8");

          // Replace imports.
          // TODO: Use @swc/core and a visitor to replace this.
          // For now a simple regex should do.
          source = source.replaceAll(`../ui`, "@/components/");

          // Add code as children so that rehype can take over at build time.
          node.children?.push(
            u("element", {
              tagName: "pre",
              children: [
                u("element", {
                  tagName: "code",
                  properties: {
                    className: ["language-tsx"]
                  },
                  children: [
                    {
                      type: "text",
                      value: source
                    }
                  ]
                })
              ]
            })
          );
      } catch (error) {
        console.error(error);
      }
    }

    if ("name" in node && node.name === "ComponentPreview") {
      const name = getNodeAttributeByName(node, "name")?.value;

      if (!name) {
        return null;
      }

      try {
        for (const framework of frameworks) {
          if (Index[framework.name] === undefined) {
            break;
          }
          const component = Index[framework.name][name];
          if (!component) {
            continue;
          }

          const src = component.files[0];

          // Read the source file.
          const filePath = join(process.cwd(), `src/${src}`);
          let source = readFileSync(filePath, "utf8");

          // Replace imports.
          // TODO: Use @swc/core and a visitor to replace this.
          // For now a simple regex should do.
          source = source.replaceAll(`../ui`, "@/components/ui");

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
                    className: ["language-tsx"]
                  },
                  children: [
                    {
                      type: "text",
                      value: source
                    }
                  ]
                })
              ]
            })
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

const getNodeAttributeByName = (node, name) => {
  return node.attributes?.find(attribute => attribute.name === name);
};

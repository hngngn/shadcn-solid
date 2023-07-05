// vite.config.ts
import vercel from "file:///home/hngngn/Desktop/shadcn-solid/node_modules/.pnpm/solid-start-vercel@0.2.26_solid-start@0.2.26_vite@4.3.9/node_modules/solid-start-vercel/index.js";
import solid from "file:///home/hngngn/Desktop/shadcn-solid/node_modules/.pnpm/solid-start@0.2.26_@solidjs+meta@0.28.5_@solidjs+router@0.8.2_solid-js@1.7.7_solid-start-node_jlrs3kvxmdwstmqey2dbggnvwi/node_modules/solid-start/vite/plugin.js";
import unocss from "file:///home/hngngn/Desktop/shadcn-solid/node_modules/.pnpm/unocss@0.53.4_postcss@8.4.24_rollup@3.26.1_vite@4.3.9/node_modules/unocss/dist/vite.mjs";
import { defineConfig } from "file:///home/hngngn/Desktop/shadcn-solid/node_modules/.pnpm/vite@4.3.9_@types+node@18.14.0_sass@1.63.6/node_modules/vite/dist/node/index.js";

// src/lib/dark-mode.ts
import { escapeRegExp } from "file:///home/hngngn/Desktop/shadcn-solid/node_modules/.pnpm/unocss@0.53.4_postcss@8.4.24_rollup@3.26.1_vite@4.3.9/node_modules/unocss/dist/index.mjs";

// src/lib/mdx.ts
import { parse as parseAcorn } from "file:///home/hngngn/Desktop/shadcn-solid/node_modules/.pnpm/acorn@8.9.0/node_modules/acorn/dist/acorn.mjs";
import { name as isValidIdentifierName } from "file:///home/hngngn/Desktop/shadcn-solid/node_modules/.pnpm/estree-util-is-identifier-name@2.1.0/node_modules/estree-util-is-identifier-name/index.js";
import { valueToEstree } from "file:///home/hngngn/Desktop/shadcn-solid/node_modules/.pnpm/estree-util-value-to-estree@3.0.1/node_modules/estree-util-value-to-estree/index.js";
import fs from "fs";
import Slugger from "file:///home/hngngn/Desktop/shadcn-solid/node_modules/.pnpm/github-slugger@2.0.0/node_modules/github-slugger/index.js";
import path from "path";
import rehypeAutolinkHeadings from "file:///home/hngngn/Desktop/shadcn-solid/node_modules/.pnpm/rehype-autolink-headings@6.1.1/node_modules/rehype-autolink-headings/index.js";
import rehypePrettyCode from "file:///home/hngngn/Desktop/shadcn-solid/node_modules/.pnpm/rehype-pretty-code@0.9.11_shiki@0.14.3/node_modules/rehype-pretty-code/dist/rehype-pretty-code.js";
import remarkFrontmatter from "file:///home/hngngn/Desktop/shadcn-solid/node_modules/.pnpm/remark-frontmatter@4.0.1/node_modules/remark-frontmatter/index.js";
import remarkGFM from "file:///home/hngngn/Desktop/shadcn-solid/node_modules/.pnpm/remark-gfm@3.0.1/node_modules/remark-gfm/index.js";
import { getHighlighter, loadTheme } from "file:///home/hngngn/Desktop/shadcn-solid/node_modules/.pnpm/shiki@0.14.3/node_modules/shiki/dist/index.js";
import { u } from "file:///home/hngngn/Desktop/shadcn-solid/node_modules/.pnpm/unist-builder@3.0.1/node_modules/unist-builder/index.js";
import { visit } from "file:///home/hngngn/Desktop/shadcn-solid/node_modules/.pnpm/unist-util-visit@4.1.2/node_modules/unist-util-visit/index.js";
import { parse as parseYaml } from "file:///home/hngngn/Desktop/shadcn-solid/node_modules/.pnpm/yaml@2.3.1/node_modules/yaml/dist/index.js";
var solidMDX = async () => {
  const cache = /* @__PURE__ */ new Map();
  const headingsCache = /* @__PURE__ */ new Map();
  const frontMatterCache = /* @__PURE__ */ new Map();
  const createExport = (object) => {
    return {
      type: "mdxjsEsm",
      value: "",
      data: {
        estree: {
          type: "Program",
          sourceType: "module",
          body: [
            {
              type: "ExportNamedDeclaration",
              specifiers: [],
              declaration: {
                type: "VariableDeclaration",
                kind: "const",
                declarations: Object.entries(object).map(
                  ([identifier, val]) => {
                    if (!isValidIdentifierName(identifier)) {
                      throw new Error(
                        `Frontmatter keys should be valid identifiers, got: ${JSON.stringify(
                          identifier
                        )}`
                      );
                    }
                    return {
                      type: "VariableDeclarator",
                      id: {
                        type: "Identifier",
                        name: identifier
                      },
                      init: valueToEstree(val)
                    };
                  }
                )
              }
            }
          ]
        }
      }
    };
  };
  const jsToTreeNode = (jsString, acornOpts) => {
    return {
      type: "mdxjsEsm",
      value: "",
      data: {
        estree: {
          body: [],
          ...parseAcorn(
            jsString,
            acornOpts ?? {
              sourceType: "module",
              ecmaVersion: 2020
            }
          ),
          type: "Program",
          sourceType: "module"
        }
      }
    };
  };
  const remarkMDXFrontmatter = ({ name, parsers } = {}) => {
    const allParsers = {
      yaml: parseYaml,
      ...parsers
    };
    return (ast, file) => {
      const imports = [];
      if (name && !isValidIdentifierName(name)) {
        throw new Error(
          `If name is specified, this should be a valid identifier name, got: ${JSON.stringify(
            name
          )}`
        );
      }
      for (const node of ast.children) {
        if (!Object.hasOwnProperty.call(allParsers, node.type)) {
          continue;
        }
        const parser = allParsers[node.type];
        const { value } = node;
        const data = parser(value);
        if (data == null) {
          continue;
        }
        if (!name && typeof data !== "object") {
          throw new Error(
            `Expected frontmatter data to be an object, got:
${value}`
          );
        }
        frontMatterCache.set(file.path, data);
        imports.push(createExport(name ? { [name]: data } : data));
      }
      if (name && !imports.length) {
        imports.push(createExport({ [name]: void 0 }));
      }
      ast.children.unshift(...imports);
    };
  };
  const rehypeCollectHeadings = () => {
    const slugger = new Slugger();
    return (tree, file) => {
      const headings = [];
      visit(tree, (node) => {
        if (node.type !== "element")
          return;
        const { tagName } = node;
        if (tagName[0] !== "h")
          return;
        const [, level] = tagName.match(/h([0-6])/) ?? [];
        if (!level)
          return;
        const depth = Number.parseInt(level);
        let text = "";
        visit(node, (child, __, parent) => {
          if (child.type === "element" || parent == null) {
            return;
          }
          if (child.type === "raw" && child.value.match(/^\n?<.*>\n?$/)) {
            return;
          }
          if ((/* @__PURE__ */ new Set(["text", "raw", "mdxTextExpression"])).has(
            child.type
          )) {
            text += child.value;
          }
        });
        node.properties = node.properties || {};
        if (typeof node.properties.id !== "string") {
          let slug = slugger.slug(text);
          if (slug.endsWith("-")) {
            slug = slug.slice(0, -1);
          }
          node.properties.id = slug;
        }
        headings.push({ depth, slug: node.properties.id, text });
      });
      headingsCache.set(file.path, headings);
      tree.children.unshift(
        jsToTreeNode(
          `export const getHeadings = () => {
						return ${JSON.stringify(headings)}
					}`,
          null
        )
      );
    };
  };
  const getNodeAttributeByName = (node, name) => {
    var _a;
    return (_a = node.attributes) == null ? void 0 : _a.find((attribute) => attribute.name === name);
  };
  const getComponentSourceFileContent = (node) => {
    var _a;
    const src = (_a = getNodeAttributeByName(node, "src")) == null ? void 0 : _a.value;
    if (!src) {
      return null;
    }
    const filePath = path.join(process.cwd(), src);
    const source = fs.readFileSync(filePath, "utf8");
    return source;
  };
  const rehypeComponent = () => {
    return async (tree) => {
      visit(tree, (node) => {
        var _a, _b, _c, _d;
        const { value: src } = getNodeAttributeByName(node, "src") || {};
        if (node.name === "ComponentExample") {
          const source = getComponentSourceFileContent(node);
          if (!source) {
            return;
          }
          (_a = node.children) == null ? void 0 : _a.push(
            u("element", {
              tagName: "pre",
              properties: {
                __src__: src
              },
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
          const extractClass = getNodeAttributeByName(
            node,
            "extractClass"
          );
          if (extractClass && typeof extractClass.value !== "undefined" && extractClass.value !== "false") {
            const values = source.match(/class="(.*)"/);
            const className = values ? values[1] : "";
            (_b = node.attributes) == null ? void 0 : _b.push({
              name: "extractedClasses",
              type: "mdxJsxAttribute",
              value: className
            });
            (_c = node.children) == null ? void 0 : _c.push(
              u("element", {
                tagName: "pre",
                properties: {},
                children: [
                  u("element", {
                    tagName: "code",
                    properties: {
                      className: ["language-tsx"]
                    },
                    children: [
                      {
                        type: "text",
                        value: className
                      }
                    ]
                  })
                ]
              })
            );
          }
        }
        if (node.name === "ComponentSource") {
          const source = getComponentSourceFileContent(node);
          if (!source) {
            return;
          }
          (_d = node.children) == null ? void 0 : _d.push(
            u("element", {
              tagName: "pre",
              properties: {
                __src__: src
              },
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
      });
    };
  };
  let plugin = {
    ...(await import("file:///home/hngngn/Desktop/shadcn-solid/node_modules/.pnpm/@mdx-js+rollup@2.3.0_rollup@3.26.1/node_modules/@mdx-js/rollup/index.js")).default({
      jsx: true,
      jsxImportSource: "solid-js",
      providerImportSource: "solid-mdx",
      remarkPlugins: [remarkGFM, remarkFrontmatter, remarkMDXFrontmatter],
      rehypePlugins: [
        rehypeComponent,
        [
          rehypePrettyCode,
          {
            getHighlighter: async () => {
              const theme = await loadTheme(
                path.join(
                  process.cwd(),
                  "./src/lib/themes/dark.json"
                )
              );
              return await getHighlighter({ theme });
            },
            onVisitLine(node) {
              if (node.children.length === 0) {
                node.children = [{ type: "text", value: " " }];
              }
            },
            onVisitHighlightedLine(node) {
              var _a;
              (_a = node.properties.className) == null ? void 0 : _a.push("line--highlighted");
            },
            onVisitHighlightedWord(node) {
              node.properties.className = ["word--highlighted"];
            }
          }
        ],
        () => (tree) => {
          visit(tree, (node) => {
            if ((node == null ? void 0 : node.type) === "element" && (node == null ? void 0 : node.tagName) === "div") {
              if (!("data-rehype-pretty-code-fragment" in node.properties)) {
                return;
              }
              const preElement = node.children.at(-1);
              if (preElement.tagName !== "pre") {
                return;
              }
              if (node.children.at(0).tagName === "div") {
                node.properties["data-metadata"] = "";
              }
            }
          });
        },
        rehypeAutolinkHeadings,
        rehypeCollectHeadings
      ]
    }),
    enforce: "pre"
  };
  return [
    {
      ...plugin,
      async transform(code, id) {
        var _a;
        if (id.endsWith(".mdx")) {
          if (cache.has(code)) {
            return cache.get(code);
          }
          let result = await ((_a = plugin.transform) == null ? void 0 : _a.call(this, code, id));
          cache.set(code, result);
          return result;
        }
      }
    },
    {
      ...plugin,
      name: "mdx-meta",
      async transform(code, id) {
        var _a;
        if (id.endsWith(".mdx?meta")) {
          id = id.replace(/\?meta$/, "");
          const getCode = () => {
            return `
						export const getHeadings = () => {
							return ${JSON.stringify(headingsCache.get(id), null, 2)}
						}

						export const getFrontMatter = () => {
							return ${JSON.stringify(frontMatterCache.get(id), null, 2)}
						}`;
          };
          if (cache.has(code)) {
            return { code: getCode() };
          }
          let result = await ((_a = plugin.transform) == null ? void 0 : _a.call(this, code, id));
          cache.set(code, result);
          return {
            code: getCode()
          };
        }
      }
    },
    {
      name: "twoslash-fix-lsp-linebreaks",
      transform: (code, id) => {
        if (id.endsWith(".mdx") || id.endsWith(".mdx?meta")) {
          return {
            code: code.replace(/lsp="([^"]*)"/g, (match, p1) => {
              return `lsp={\`${p1.replaceAll("`", `\\\``)}\`}`;
            }).replace(/{"\\n"}/g, "")
          };
        }
      },
      enforce: "pre"
    }
  ];
};

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [
    await solidMDX(),
    solid({
      extensions: [".mdx"],
      adapter: vercel({})
    }),
    unocss()
  ],
  ssr: {
    noExternal: ["@kobalte/core"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL2xpYi9kYXJrLW1vZGUudHMiLCAic3JjL2xpYi9tZHgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9obmduZ24vRGVza3RvcC9zaGFkY24tc29saWQvYXBwcy9kb2NzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9obmduZ24vRGVza3RvcC9zaGFkY24tc29saWQvYXBwcy9kb2NzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2huZ25nbi9EZXNrdG9wL3NoYWRjbi1zb2xpZC9hcHBzL2RvY3Mvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgdmVyY2VsIGZyb20gXCJzb2xpZC1zdGFydC12ZXJjZWxcIlxuaW1wb3J0IHNvbGlkIGZyb20gXCJzb2xpZC1zdGFydC92aXRlXCJcbmltcG9ydCB1bm9jc3MgZnJvbSBcInVub2Nzcy92aXRlXCJcbmltcG9ydCB0eXBlIHsgUGx1Z2luIH0gZnJvbSBcInZpdGVcIlxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIlxuaW1wb3J0IHsgc29saWRNRFggfSBmcm9tIFwiLi9zcmMvbGliXCJcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcblx0cGx1Z2luczogW1xuXHRcdChhd2FpdCBzb2xpZE1EWCgpKSBhcyBQbHVnaW5bXSxcblx0XHRzb2xpZCh7XG5cdFx0XHRleHRlbnNpb25zOiBbXCIubWR4XCJdLFxuXHRcdFx0YWRhcHRlcjogdmVyY2VsKHt9KSxcblx0XHR9KSxcblx0XHR1bm9jc3MoKSxcblx0XSxcblx0c3NyOiB7XG5cdFx0bm9FeHRlcm5hbDogW1wiQGtvYmFsdGUvY29yZVwiXSxcblx0fSxcbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL2huZ25nbi9EZXNrdG9wL3NoYWRjbi1zb2xpZC9hcHBzL2RvY3Mvc3JjL2xpYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvaG5nbmduL0Rlc2t0b3Avc2hhZGNuLXNvbGlkL2FwcHMvZG9jcy9zcmMvbGliL2RhcmstbW9kZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9obmduZ24vRGVza3RvcC9zaGFkY24tc29saWQvYXBwcy9kb2NzL3NyYy9saWIvZGFyay1tb2RlLnRzXCI7aW1wb3J0IHR5cGUgeyBQcmVzZXQsIFZhcmlhbnRIYW5kbGVyQ29udGV4dCB9IGZyb20gXCJ1bm9jc3NcIlxuaW1wb3J0IHsgZXNjYXBlUmVnRXhwLCB0eXBlIFZhcmlhbnQsIHR5cGUgVmFyaWFudE9iamVjdCB9IGZyb20gXCJ1bm9jc3NcIlxuXG5jb25zdCB2YXJpYW50TWF0Y2hlciA9IChcblx0bmFtZTogc3RyaW5nLFxuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcblx0aGFuZGxlcjogKGlucHV0OiBWYXJpYW50SGFuZGxlckNvbnRleHQpID0+IFJlY29yZDxzdHJpbmcsIGFueT5cbik6IFZhcmlhbnRPYmplY3QgPT4ge1xuXHRsZXQgcmU6IFJlZ0V4cFxuXHRyZXR1cm4ge1xuXHRcdG5hbWUsXG5cdFx0bWF0Y2goaW5wdXQsIGN0eCkge1xuXHRcdFx0aWYgKCFyZSlcblx0XHRcdFx0cmUgPSBuZXcgUmVnRXhwKFxuXHRcdFx0XHRcdGBeJHtlc2NhcGVSZWdFeHAoXG5cdFx0XHRcdFx0XHRuYW1lXG5cdFx0XHRcdFx0KX0oPzoke2N0eC5nZW5lcmF0b3IuY29uZmlnLnNlcGFyYXRvcnMuam9pbihcInxcIil9KWBcblx0XHRcdFx0KVxuXG5cdFx0XHRjb25zdCBtYXRjaCA9IGlucHV0Lm1hdGNoKHJlKVxuXHRcdFx0aWYgKG1hdGNoKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0bWF0Y2hlcjogaW5wdXQuc2xpY2UobWF0Y2hbMF0ubGVuZ3RoKSxcblx0XHRcdFx0XHRoYW5kbGU6IChpbnB1dCwgbmV4dCkgPT5cblx0XHRcdFx0XHRcdG5leHQoe1xuXHRcdFx0XHRcdFx0XHQuLi5pbnB1dCxcblx0XHRcdFx0XHRcdFx0Li4uaGFuZGxlcihpbnB1dCksXG5cdFx0XHRcdFx0XHR9KSxcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0YXV0b2NvbXBsZXRlOiBgJHtuYW1lfTpgLFxuXHR9XG59XG5cbmV4cG9ydCB0eXBlIFRQcmVzZXREYXJrTW9kZU9wdGlvbiA9IHtcblx0LyoqXG5cdCAqIERhdGEgYXR0cmlidXRlIG5hbWVcblx0ICpcblx0ICogQGRlZmF1bHQgJ2RhdGEta2ItdGhlbWUnXG5cdCAqL1xuXHR2YWx1ZT86IHN0cmluZ1xufVxuXG5jb25zdCB2YXJpYW50cyA9IChvcHRpb24/OiBUUHJlc2V0RGFya01vZGVPcHRpb24pOiBWYXJpYW50W10gPT4ge1xuXHRjb25zdCBkZWZhdWx0VmFsdWUgPSBvcHRpb24/LnZhbHVlID8/IFwiZGF0YS1rYi10aGVtZVwiXG5cblx0cmV0dXJuIFtcblx0XHR2YXJpYW50TWF0Y2hlcihcImRhcmtcIiwgKGlucHV0KSA9PiAoe1xuXHRcdFx0cHJlZml4OiBgOmlzKFske2RlZmF1bHRWYWx1ZX09XCJkYXJrXCJdKSAkJCAke2lucHV0LnByZWZpeH1gLFxuXHRcdH0pKSxcblx0XHR2YXJpYW50TWF0Y2hlcihcImxpZ2h0XCIsIChpbnB1dCkgPT4gKHtcblx0XHRcdHByZWZpeDogYDppcyhbJHtkZWZhdWx0VmFsdWV9PVwibGlnaHRcIl0pICQkICR7aW5wdXQucHJlZml4fWAsXG5cdFx0fSkpLFxuXHRdXG59XG5cbmV4cG9ydCBjb25zdCBwcmVzZXREYXJrTW9kZSA9IChvcHRpb24/OiBUUHJlc2V0RGFya01vZGVPcHRpb24pOiBQcmVzZXQgPT4ge1xuXHRyZXR1cm4ge1xuXHRcdG5hbWU6IFwicHJlc2V0LWRhcmstbW9kZVwiLFxuXHRcdHZhcmlhbnRzOiB2YXJpYW50cyhvcHRpb24pLFxuXHR9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL2huZ25nbi9EZXNrdG9wL3NoYWRjbi1zb2xpZC9hcHBzL2RvY3Mvc3JjL2xpYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvaG5nbmduL0Rlc2t0b3Avc2hhZGNuLXNvbGlkL2FwcHMvZG9jcy9zcmMvbGliL21keC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9obmduZ24vRGVza3RvcC9zaGFkY24tc29saWQvYXBwcy9kb2NzL3NyYy9saWIvbWR4LnRzXCI7Ly8gQHRzLW5vY2hlY2tcblxuaW1wb3J0IHsgcGFyc2UgYXMgcGFyc2VBY29ybiB9IGZyb20gXCJhY29yblwiXG5pbXBvcnQgeyBuYW1lIGFzIGlzVmFsaWRJZGVudGlmaWVyTmFtZSB9IGZyb20gXCJlc3RyZWUtdXRpbC1pcy1pZGVudGlmaWVyLW5hbWVcIlxuaW1wb3J0IHsgdmFsdWVUb0VzdHJlZSB9IGZyb20gXCJlc3RyZWUtdXRpbC12YWx1ZS10by1lc3RyZWVcIlxuaW1wb3J0IGZzIGZyb20gXCJmc1wiXG5pbXBvcnQgU2x1Z2dlciBmcm9tIFwiZ2l0aHViLXNsdWdnZXJcIlxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIlxuaW1wb3J0IHJlaHlwZUF1dG9saW5rSGVhZGluZ3MgZnJvbSBcInJlaHlwZS1hdXRvbGluay1oZWFkaW5nc1wiXG5pbXBvcnQgdHlwZSB7IFZpc2l0YWJsZUVsZW1lbnQgfSBmcm9tIFwicmVoeXBlLXByZXR0eS1jb2RlXCJcbmltcG9ydCByZWh5cGVQcmV0dHlDb2RlIGZyb20gXCJyZWh5cGUtcHJldHR5LWNvZGVcIlxuaW1wb3J0IHJlbWFya0Zyb250bWF0dGVyIGZyb20gXCJyZW1hcmstZnJvbnRtYXR0ZXJcIlxuaW1wb3J0IHJlbWFya0dGTSBmcm9tIFwicmVtYXJrLWdmbVwiXG5pbXBvcnQgeyBnZXRIaWdobGlnaHRlciwgbG9hZFRoZW1lIH0gZnJvbSBcInNoaWtpXCJcbmltcG9ydCB7IHUgfSBmcm9tIFwidW5pc3QtYnVpbGRlclwiXG5pbXBvcnQgeyB2aXNpdCB9IGZyb20gXCJ1bmlzdC11dGlsLXZpc2l0XCJcbmltcG9ydCB7IHBhcnNlIGFzIHBhcnNlWWFtbCB9IGZyb20gXCJ5YW1sXCJcblxuZXhwb3J0IGNvbnN0IHNvbGlkTURYID0gYXN5bmMgKCkgPT4ge1xuXHRjb25zdCBjYWNoZSA9IG5ldyBNYXAoKVxuXHRjb25zdCBoZWFkaW5nc0NhY2hlID0gbmV3IE1hcCgpXG5cdGNvbnN0IGZyb250TWF0dGVyQ2FjaGUgPSBuZXcgTWFwKClcblxuXHRjb25zdCBjcmVhdGVFeHBvcnQgPSAob2JqZWN0KSA9PiB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHR5cGU6IFwibWR4anNFc21cIixcblx0XHRcdHZhbHVlOiBcIlwiLFxuXHRcdFx0ZGF0YToge1xuXHRcdFx0XHRlc3RyZWU6IHtcblx0XHRcdFx0XHR0eXBlOiBcIlByb2dyYW1cIixcblx0XHRcdFx0XHRzb3VyY2VUeXBlOiBcIm1vZHVsZVwiLFxuXHRcdFx0XHRcdGJvZHk6IFtcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dHlwZTogXCJFeHBvcnROYW1lZERlY2xhcmF0aW9uXCIsXG5cdFx0XHRcdFx0XHRcdHNwZWNpZmllcnM6IFtdLFxuXHRcdFx0XHRcdFx0XHRkZWNsYXJhdGlvbjoge1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiVmFyaWFibGVEZWNsYXJhdGlvblwiLFxuXHRcdFx0XHRcdFx0XHRcdGtpbmQ6IFwiY29uc3RcIixcblx0XHRcdFx0XHRcdFx0XHRkZWNsYXJhdGlvbnM6IE9iamVjdC5lbnRyaWVzKG9iamVjdCkubWFwKFxuXHRcdFx0XHRcdFx0XHRcdFx0KFtpZGVudGlmaWVyLCB2YWxdKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQhaXNWYWxpZElkZW50aWZpZXJOYW1lKGlkZW50aWZpZXIpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGBGcm9udG1hdHRlciBrZXlzIHNob3VsZCBiZSB2YWxpZCBpZGVudGlmaWVycywgZ290OiAke0pTT04uc3RyaW5naWZ5KFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZGVudGlmaWVyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQpfWBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcIlZhcmlhYmxlRGVjbGFyYXRvclwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlkOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcIklkZW50aWZpZXJcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG5hbWU6IGlkZW50aWZpZXIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpbml0OiB2YWx1ZVRvRXN0cmVlKHZhbCksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRdLFxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHR9XG5cdH1cblxuXHRjb25zdCBqc1RvVHJlZU5vZGUgPSAoanNTdHJpbmcsIGFjb3JuT3B0cykgPT4ge1xuXHRcdHJldHVybiB7XG5cdFx0XHR0eXBlOiBcIm1keGpzRXNtXCIsXG5cdFx0XHR2YWx1ZTogXCJcIixcblx0XHRcdGRhdGE6IHtcblx0XHRcdFx0ZXN0cmVlOiB7XG5cdFx0XHRcdFx0Ym9keTogW10sXG5cdFx0XHRcdFx0Li4ucGFyc2VBY29ybihcblx0XHRcdFx0XHRcdGpzU3RyaW5nLFxuXHRcdFx0XHRcdFx0YWNvcm5PcHRzID8/IHtcblx0XHRcdFx0XHRcdFx0c291cmNlVHlwZTogXCJtb2R1bGVcIixcblx0XHRcdFx0XHRcdFx0ZWNtYVZlcnNpb246IDIwMjAsXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0KSxcblx0XHRcdFx0XHR0eXBlOiBcIlByb2dyYW1cIixcblx0XHRcdFx0XHRzb3VyY2VUeXBlOiBcIm1vZHVsZVwiLFxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHR9XG5cdH1cblxuXHRjb25zdCByZW1hcmtNRFhGcm9udG1hdHRlciA9ICh7IG5hbWUsIHBhcnNlcnMgfSA9IHt9KSA9PiB7XG5cdFx0Y29uc3QgYWxsUGFyc2VycyA9IHtcblx0XHRcdHlhbWw6IHBhcnNlWWFtbCxcblx0XHRcdC4uLnBhcnNlcnMsXG5cdFx0fVxuXG5cdFx0cmV0dXJuIChhc3QsIGZpbGUpID0+IHtcblx0XHRcdGNvbnN0IGltcG9ydHMgPSBbXVxuXG5cdFx0XHRpZiAobmFtZSAmJiAhaXNWYWxpZElkZW50aWZpZXJOYW1lKG5hbWUpKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHRgSWYgbmFtZSBpcyBzcGVjaWZpZWQsIHRoaXMgc2hvdWxkIGJlIGEgdmFsaWQgaWRlbnRpZmllciBuYW1lLCBnb3Q6ICR7SlNPTi5zdHJpbmdpZnkoXG5cdFx0XHRcdFx0XHRuYW1lXG5cdFx0XHRcdFx0KX1gXG5cdFx0XHRcdClcblx0XHRcdH1cblxuXHRcdFx0Zm9yIChjb25zdCBub2RlIG9mIGFzdC5jaGlsZHJlbikge1xuXHRcdFx0XHRpZiAoIU9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFsbFBhcnNlcnMsIG5vZGUudHlwZSkpIHtcblx0XHRcdFx0XHRjb250aW51ZVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgcGFyc2VyID0gYWxsUGFyc2Vyc1tub2RlLnR5cGVdXG5cblx0XHRcdFx0Y29uc3QgeyB2YWx1ZSB9ID0gbm9kZVxuXHRcdFx0XHRjb25zdCBkYXRhID0gcGFyc2VyKHZhbHVlKVxuXHRcdFx0XHRpZiAoZGF0YSA9PSBudWxsKSB7XG5cdFx0XHRcdFx0Y29udGludWVcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIW5hbWUgJiYgdHlwZW9mIGRhdGEgIT09IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHRgRXhwZWN0ZWQgZnJvbnRtYXR0ZXIgZGF0YSB0byBiZSBhbiBvYmplY3QsIGdvdDpcXG4ke3ZhbHVlfWBcblx0XHRcdFx0XHQpXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmcm9udE1hdHRlckNhY2hlLnNldChmaWxlLnBhdGgsIGRhdGEpXG5cblx0XHRcdFx0aW1wb3J0cy5wdXNoKGNyZWF0ZUV4cG9ydChuYW1lID8geyBbbmFtZV06IGRhdGEgfSA6IGRhdGEpKVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAobmFtZSAmJiAhaW1wb3J0cy5sZW5ndGgpIHtcblx0XHRcdFx0aW1wb3J0cy5wdXNoKGNyZWF0ZUV4cG9ydCh7IFtuYW1lXTogdW5kZWZpbmVkIH0pKVxuXHRcdFx0fVxuXG5cdFx0XHRhc3QuY2hpbGRyZW4udW5zaGlmdCguLi5pbXBvcnRzKVxuXHRcdH1cblx0fVxuXG5cdGNvbnN0IHJlaHlwZUNvbGxlY3RIZWFkaW5ncyA9ICgpID0+IHtcblx0XHRjb25zdCBzbHVnZ2VyID0gbmV3IFNsdWdnZXIoKVxuXG5cdFx0cmV0dXJuICh0cmVlLCBmaWxlKSA9PiB7XG5cdFx0XHRjb25zdCBoZWFkaW5ncyA9IFtdXG5cblx0XHRcdHZpc2l0KHRyZWUsIChub2RlKSA9PiB7XG5cdFx0XHRcdGlmIChub2RlLnR5cGUgIT09IFwiZWxlbWVudFwiKSByZXR1cm5cblx0XHRcdFx0Y29uc3QgeyB0YWdOYW1lIH0gPSBub2RlXG5cdFx0XHRcdGlmICh0YWdOYW1lWzBdICE9PSBcImhcIikgcmV0dXJuXG5cdFx0XHRcdGNvbnN0IFssIGxldmVsXSA9IHRhZ05hbWUubWF0Y2goL2goWzAtNl0pLykgPz8gW11cblx0XHRcdFx0aWYgKCFsZXZlbCkgcmV0dXJuXG5cdFx0XHRcdGNvbnN0IGRlcHRoID0gTnVtYmVyLnBhcnNlSW50KGxldmVsKVxuXG5cdFx0XHRcdGxldCB0ZXh0ID0gXCJcIlxuXHRcdFx0XHR2aXNpdChub2RlLCAoY2hpbGQsIF9fLCBwYXJlbnQpID0+IHtcblx0XHRcdFx0XHRpZiAoY2hpbGQudHlwZSA9PT0gXCJlbGVtZW50XCIgfHwgcGFyZW50ID09IG51bGwpIHtcblx0XHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRjaGlsZC50eXBlID09PSBcInJhd1wiICYmXG5cdFx0XHRcdFx0XHRjaGlsZC52YWx1ZS5tYXRjaCgvXlxcbj88Lio+XFxuPyQvKVxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdG5ldyBTZXQoW1widGV4dFwiLCBcInJhd1wiLCBcIm1keFRleHRFeHByZXNzaW9uXCJdKS5oYXMoXG5cdFx0XHRcdFx0XHRcdGNoaWxkLnR5cGVcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdHRleHQgKz0gY2hpbGQudmFsdWVcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cblx0XHRcdFx0bm9kZS5wcm9wZXJ0aWVzID0gbm9kZS5wcm9wZXJ0aWVzIHx8IHt9XG5cdFx0XHRcdGlmICh0eXBlb2Ygbm9kZS5wcm9wZXJ0aWVzLmlkICE9PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdFx0bGV0IHNsdWcgPSBzbHVnZ2VyLnNsdWcodGV4dClcblx0XHRcdFx0XHRpZiAoc2x1Zy5lbmRzV2l0aChcIi1cIikpIHtcblx0XHRcdFx0XHRcdHNsdWcgPSBzbHVnLnNsaWNlKDAsIC0xKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRub2RlLnByb3BlcnRpZXMuaWQgPSBzbHVnXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRoZWFkaW5ncy5wdXNoKHsgZGVwdGgsIHNsdWc6IG5vZGUucHJvcGVydGllcy5pZCwgdGV4dCB9KVxuXHRcdFx0fSlcblxuXHRcdFx0aGVhZGluZ3NDYWNoZS5zZXQoZmlsZS5wYXRoLCBoZWFkaW5ncylcblx0XHRcdHRyZWUuY2hpbGRyZW4udW5zaGlmdChcblx0XHRcdFx0anNUb1RyZWVOb2RlKFxuXHRcdFx0XHRcdGBleHBvcnQgY29uc3QgZ2V0SGVhZGluZ3MgPSAoKSA9PiB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gJHtKU09OLnN0cmluZ2lmeShoZWFkaW5ncyl9XG5cdFx0XHRcdFx0fWAsXG5cdFx0XHRcdFx0bnVsbFxuXHRcdFx0XHQpXG5cdFx0XHQpXG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgZ2V0Tm9kZUF0dHJpYnV0ZUJ5TmFtZSA9IChub2RlLCBuYW1lKSA9PiB7XG5cdFx0cmV0dXJuIG5vZGUuYXR0cmlidXRlcz8uZmluZCgoYXR0cmlidXRlKSA9PiBhdHRyaWJ1dGUubmFtZSA9PT0gbmFtZSlcblx0fVxuXG5cdGNvbnN0IGdldENvbXBvbmVudFNvdXJjZUZpbGVDb250ZW50ID0gKG5vZGUpID0+IHtcblx0XHRjb25zdCBzcmMgPSBnZXROb2RlQXR0cmlidXRlQnlOYW1lKG5vZGUsIFwic3JjXCIpPy52YWx1ZVxuXG5cdFx0aWYgKCFzcmMpIHtcblx0XHRcdHJldHVybiBudWxsXG5cdFx0fVxuXG5cdFx0Ly8gUmVhZCB0aGUgc291cmNlIGZpbGUuXG5cdFx0Y29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgc3JjKVxuXHRcdGNvbnN0IHNvdXJjZSA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgXCJ1dGY4XCIpXG5cblx0XHRyZXR1cm4gc291cmNlXG5cdH1cblxuXHRjb25zdCByZWh5cGVDb21wb25lbnQgPSAoKSA9PiB7XG5cdFx0cmV0dXJuIGFzeW5jICh0cmVlKSA9PiB7XG5cdFx0XHR2aXNpdCh0cmVlLCAobm9kZSkgPT4ge1xuXHRcdFx0XHRjb25zdCB7IHZhbHVlOiBzcmMgfSA9IGdldE5vZGVBdHRyaWJ1dGVCeU5hbWUobm9kZSwgXCJzcmNcIikgfHwge31cblxuXHRcdFx0XHRpZiAobm9kZS5uYW1lID09PSBcIkNvbXBvbmVudEV4YW1wbGVcIikge1xuXHRcdFx0XHRcdGNvbnN0IHNvdXJjZSA9IGdldENvbXBvbmVudFNvdXJjZUZpbGVDb250ZW50KG5vZGUpXG5cdFx0XHRcdFx0aWYgKCFzb3VyY2UpIHtcblx0XHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdG5vZGUuY2hpbGRyZW4/LnB1c2goXG5cdFx0XHRcdFx0XHR1KFwiZWxlbWVudFwiLCB7XG5cdFx0XHRcdFx0XHRcdHRhZ05hbWU6IFwicHJlXCIsXG5cdFx0XHRcdFx0XHRcdHByb3BlcnRpZXM6IHtcblx0XHRcdFx0XHRcdFx0XHRfX3NyY19fOiBzcmMsXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdGNoaWxkcmVuOiBbXG5cdFx0XHRcdFx0XHRcdFx0dShcImVsZW1lbnRcIiwge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGFnTmFtZTogXCJjb2RlXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRwcm9wZXJ0aWVzOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzTmFtZTogW1wibGFuZ3VhZ2UtdHN4XCJdLFxuXHRcdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRcdGNoaWxkcmVuOiBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInRleHRcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogc291cmNlLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XSxcblx0XHRcdFx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XHRcdFx0XSxcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0KVxuXG5cdFx0XHRcdFx0Y29uc3QgZXh0cmFjdENsYXNzID0gZ2V0Tm9kZUF0dHJpYnV0ZUJ5TmFtZShcblx0XHRcdFx0XHRcdG5vZGUsXG5cdFx0XHRcdFx0XHRcImV4dHJhY3RDbGFzc1wiXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdGV4dHJhY3RDbGFzcyAmJlxuXHRcdFx0XHRcdFx0dHlwZW9mIGV4dHJhY3RDbGFzcy52YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuXHRcdFx0XHRcdFx0ZXh0cmFjdENsYXNzLnZhbHVlICE9PSBcImZhbHNlXCJcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdGNvbnN0IHZhbHVlcyA9IHNvdXJjZS5tYXRjaCgvY2xhc3M9XCIoLiopXCIvKVxuXHRcdFx0XHRcdFx0Y29uc3QgY2xhc3NOYW1lID0gdmFsdWVzID8gdmFsdWVzWzFdIDogXCJcIlxuXG5cdFx0XHRcdFx0XHRub2RlLmF0dHJpYnV0ZXM/LnB1c2goe1xuXHRcdFx0XHRcdFx0XHRuYW1lOiBcImV4dHJhY3RlZENsYXNzZXNcIixcblx0XHRcdFx0XHRcdFx0dHlwZTogXCJtZHhKc3hBdHRyaWJ1dGVcIixcblx0XHRcdFx0XHRcdFx0dmFsdWU6IGNsYXNzTmFtZSxcblx0XHRcdFx0XHRcdH0pXG5cblx0XHRcdFx0XHRcdG5vZGUuY2hpbGRyZW4/LnB1c2goXG5cdFx0XHRcdFx0XHRcdHUoXCJlbGVtZW50XCIsIHtcblx0XHRcdFx0XHRcdFx0XHR0YWdOYW1lOiBcInByZVwiLFxuXHRcdFx0XHRcdFx0XHRcdHByb3BlcnRpZXM6IHt9LFxuXHRcdFx0XHRcdFx0XHRcdGNoaWxkcmVuOiBbXG5cdFx0XHRcdFx0XHRcdFx0XHR1KFwiZWxlbWVudFwiLCB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRhZ05hbWU6IFwiY29kZVwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRwcm9wZXJ0aWVzOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3NOYW1lOiBbXCJsYW5ndWFnZS10c3hcIl0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNoaWxkcmVuOiBbXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJ0ZXh0XCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogY2xhc3NOYW1lLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XHRcdFx0XHRdLFxuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChub2RlLm5hbWUgPT09IFwiQ29tcG9uZW50U291cmNlXCIpIHtcblx0XHRcdFx0XHRjb25zdCBzb3VyY2UgPSBnZXRDb21wb25lbnRTb3VyY2VGaWxlQ29udGVudChub2RlKVxuXHRcdFx0XHRcdGlmICghc291cmNlKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRub2RlLmNoaWxkcmVuPy5wdXNoKFxuXHRcdFx0XHRcdFx0dShcImVsZW1lbnRcIiwge1xuXHRcdFx0XHRcdFx0XHR0YWdOYW1lOiBcInByZVwiLFxuXHRcdFx0XHRcdFx0XHRwcm9wZXJ0aWVzOiB7XG5cdFx0XHRcdFx0XHRcdFx0X19zcmNfXzogc3JjLFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRjaGlsZHJlbjogW1xuXHRcdFx0XHRcdFx0XHRcdHUoXCJlbGVtZW50XCIsIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRhZ05hbWU6IFwiY29kZVwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0cHJvcGVydGllczoge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjbGFzc05hbWU6IFtcImxhbmd1YWdlLXRzeFwiXSxcblx0XHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRjaGlsZHJlbjogW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJ0ZXh0XCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFsdWU6IHNvdXJjZSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHRcdFx0fSksXG5cdFx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdClcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHR9XG5cdH1cblxuXHRsZXQgcGx1Z2luID0ge1xuXHRcdC4uLihhd2FpdCBpbXBvcnQoXCJAbWR4LWpzL3JvbGx1cFwiKSkuZGVmYXVsdCh7XG5cdFx0XHRqc3g6IHRydWUsXG5cdFx0XHRqc3hJbXBvcnRTb3VyY2U6IFwic29saWQtanNcIixcblx0XHRcdHByb3ZpZGVySW1wb3J0U291cmNlOiBcInNvbGlkLW1keFwiLFxuXHRcdFx0cmVtYXJrUGx1Z2luczogW3JlbWFya0dGTSwgcmVtYXJrRnJvbnRtYXR0ZXIsIHJlbWFya01EWEZyb250bWF0dGVyXSxcblx0XHRcdHJlaHlwZVBsdWdpbnM6IFtcblx0XHRcdFx0cmVoeXBlQ29tcG9uZW50LFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0cmVoeXBlUHJldHR5Q29kZSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRnZXRIaWdobGlnaHRlcjogYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRjb25zdCB0aGVtZSA9IGF3YWl0IGxvYWRUaGVtZShcblx0XHRcdFx0XHRcdFx0XHRwYXRoLmpvaW4oXG5cdFx0XHRcdFx0XHRcdFx0XHRwcm9jZXNzLmN3ZCgpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XCIuL3NyYy9saWIvdGhlbWVzL2RhcmsuanNvblwiXG5cdFx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHRcdHJldHVybiBhd2FpdCBnZXRIaWdobGlnaHRlcih7IHRoZW1lIH0pXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0b25WaXNpdExpbmUobm9kZTogVmlzaXRhYmxlRWxlbWVudCkge1xuXHRcdFx0XHRcdFx0XHRpZiAobm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHRub2RlLmNoaWxkcmVuID0gW3sgdHlwZTogXCJ0ZXh0XCIsIHZhbHVlOiBcIiBcIiB9XVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0b25WaXNpdEhpZ2hsaWdodGVkTGluZShub2RlOiBWaXNpdGFibGVFbGVtZW50KSB7XG5cdFx0XHRcdFx0XHRcdG5vZGUucHJvcGVydGllcy5jbGFzc05hbWU/LnB1c2goXCJsaW5lLS1oaWdobGlnaHRlZFwiKVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdG9uVmlzaXRIaWdobGlnaHRlZFdvcmQobm9kZTogVmlzaXRhYmxlRWxlbWVudCkge1xuXHRcdFx0XHRcdFx0XHRub2RlLnByb3BlcnRpZXMuY2xhc3NOYW1lID0gW1wid29yZC0taGlnaGxpZ2h0ZWRcIl1cblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XSxcblx0XHRcdFx0KCkgPT4gKHRyZWUpID0+IHtcblx0XHRcdFx0XHR2aXNpdCh0cmVlLCAobm9kZSkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0XHRub2RlPy50eXBlID09PSBcImVsZW1lbnRcIiAmJlxuXHRcdFx0XHRcdFx0XHRub2RlPy50YWdOYW1lID09PSBcImRpdlwiXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0XHRcdCEoXG5cdFx0XHRcdFx0XHRcdFx0XHRcImRhdGEtcmVoeXBlLXByZXR0eS1jb2RlLWZyYWdtZW50XCIgaW5cblx0XHRcdFx0XHRcdFx0XHRcdG5vZGUucHJvcGVydGllc1xuXHRcdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRjb25zdCBwcmVFbGVtZW50ID0gbm9kZS5jaGlsZHJlbi5hdCgtMSlcblx0XHRcdFx0XHRcdFx0aWYgKHByZUVsZW1lbnQudGFnTmFtZSAhPT0gXCJwcmVcIikge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKG5vZGUuY2hpbGRyZW4uYXQoMCkudGFnTmFtZSA9PT0gXCJkaXZcIikge1xuXHRcdFx0XHRcdFx0XHRcdG5vZGUucHJvcGVydGllc1tcImRhdGEtbWV0YWRhdGFcIl0gPSBcIlwiXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRyZWh5cGVBdXRvbGlua0hlYWRpbmdzLFxuXHRcdFx0XHRyZWh5cGVDb2xsZWN0SGVhZGluZ3MsXG5cdFx0XHRdLFxuXHRcdH0pLFxuXHRcdGVuZm9yY2U6IFwicHJlXCIsXG5cdH1cblxuXHRyZXR1cm4gW1xuXHRcdHtcblx0XHRcdC4uLnBsdWdpbixcblx0XHRcdGFzeW5jIHRyYW5zZm9ybShjb2RlLCBpZCkge1xuXHRcdFx0XHRpZiAoaWQuZW5kc1dpdGgoXCIubWR4XCIpKSB7XG5cdFx0XHRcdFx0aWYgKGNhY2hlLmhhcyhjb2RlKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGNhY2hlLmdldChjb2RlKVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGxldCByZXN1bHQgPSBhd2FpdCBwbHVnaW4udHJhbnNmb3JtPy5jYWxsKHRoaXMsIGNvZGUsIGlkKVxuXHRcdFx0XHRcdGNhY2hlLnNldChjb2RlLCByZXN1bHQpXG5cblx0XHRcdFx0XHRyZXR1cm4gcmVzdWx0XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0fSxcblxuXHRcdHtcblx0XHRcdC4uLnBsdWdpbixcblx0XHRcdG5hbWU6IFwibWR4LW1ldGFcIixcblx0XHRcdGFzeW5jIHRyYW5zZm9ybShjb2RlLCBpZCkge1xuXHRcdFx0XHRpZiAoaWQuZW5kc1dpdGgoXCIubWR4P21ldGFcIikpIHtcblx0XHRcdFx0XHRpZCA9IGlkLnJlcGxhY2UoL1xcP21ldGEkLywgXCJcIilcblxuXHRcdFx0XHRcdGNvbnN0IGdldENvZGUgPSAoKSA9PiB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gYFxuXHRcdFx0XHRcdFx0ZXhwb3J0IGNvbnN0IGdldEhlYWRpbmdzID0gKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gJHtKU09OLnN0cmluZ2lmeShoZWFkaW5nc0NhY2hlLmdldChpZCksIG51bGwsIDIpfVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRleHBvcnQgY29uc3QgZ2V0RnJvbnRNYXR0ZXIgPSAoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiAke0pTT04uc3RyaW5naWZ5KGZyb250TWF0dGVyQ2FjaGUuZ2V0KGlkKSwgbnVsbCwgMil9XG5cdFx0XHRcdFx0XHR9YFxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChjYWNoZS5oYXMoY29kZSkpIHtcblx0XHRcdFx0XHRcdHJldHVybiB7IGNvZGU6IGdldENvZGUoKSB9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0bGV0IHJlc3VsdCA9IGF3YWl0IHBsdWdpbi50cmFuc2Zvcm0/LmNhbGwodGhpcywgY29kZSwgaWQpXG5cblx0XHRcdFx0XHRjYWNoZS5zZXQoY29kZSwgcmVzdWx0KVxuXG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdGNvZGU6IGdldENvZGUoKSxcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0fSxcblxuXHRcdHtcblx0XHRcdG5hbWU6IFwidHdvc2xhc2gtZml4LWxzcC1saW5lYnJlYWtzXCIsXG5cdFx0XHR0cmFuc2Zvcm06IChjb2RlLCBpZCkgPT4ge1xuXHRcdFx0XHRpZiAoaWQuZW5kc1dpdGgoXCIubWR4XCIpIHx8IGlkLmVuZHNXaXRoKFwiLm1keD9tZXRhXCIpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdGNvZGU6IGNvZGVcblx0XHRcdFx0XHRcdFx0LnJlcGxhY2UoL2xzcD1cIihbXlwiXSopXCIvZywgKG1hdGNoLCBwMSkgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBgbHNwPXtcXGAke3AxLnJlcGxhY2VBbGwoXCJgXCIsIGBcXFxcXFxgYCl9XFxgfWBcblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0LnJlcGxhY2UoL3tcIlxcXFxuXCJ9L2csIFwiXCIpLFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGVuZm9yY2U6IFwicHJlXCIsXG5cdFx0fSxcblx0XVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtVCxPQUFPLFlBQVk7QUFDdFUsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sWUFBWTtBQUVuQixTQUFTLG9CQUFvQjs7O0FDSDdCLFNBQVMsb0JBQXNEOzs7QUNDL0QsU0FBUyxTQUFTLGtCQUFrQjtBQUNwQyxTQUFTLFFBQVEsNkJBQTZCO0FBQzlDLFNBQVMscUJBQXFCO0FBQzlCLE9BQU8sUUFBUTtBQUNmLE9BQU8sYUFBYTtBQUNwQixPQUFPLFVBQVU7QUFDakIsT0FBTyw0QkFBNEI7QUFFbkMsT0FBTyxzQkFBc0I7QUFDN0IsT0FBTyx1QkFBdUI7QUFDOUIsT0FBTyxlQUFlO0FBQ3RCLFNBQVMsZ0JBQWdCLGlCQUFpQjtBQUMxQyxTQUFTLFNBQVM7QUFDbEIsU0FBUyxhQUFhO0FBQ3RCLFNBQVMsU0FBUyxpQkFBaUI7QUFFNUIsSUFBTSxXQUFXLFlBQVk7QUFDbkMsUUFBTSxRQUFRLG9CQUFJLElBQUk7QUFDdEIsUUFBTSxnQkFBZ0Isb0JBQUksSUFBSTtBQUM5QixRQUFNLG1C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

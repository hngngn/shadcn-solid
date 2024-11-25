import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@solidjs/start/config";
//@ts-expect-error
import pkg from "@vinxi/plugin-mdx";
import { type Options, rehypePrettyCode } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { codeImport } from "remark-code-import";
import remarkFrontmatter from "remark-frontmatter";
import { docsGen } from "./plugins/gen";

const { default: mdx } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
	extensions: ["mdx"],
	vite: {
		plugins: [
			mdx.withImports({})({
				jsx: true,
				jsxImportSource: "solid-js",
				providerImportSource: "@/components/mdx",
				remarkPlugins: [
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
					[
						rehypePrettyCode,
						{
							theme: "vesper",
							keepBackground: false,
						} satisfies Options,
					],
				],
			}),
			docsGen(),
		],
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src"),
				"#content": resolve(__dirname, "./.content"),
			},
		},
	},
	server: {
		prerender: {
			crawlLinks: true,
		},
		esbuild: {
			options: {
				target: "esnext",
			},
		},
	},
});

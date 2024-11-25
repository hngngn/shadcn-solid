import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { mdx } from "@cyco130/vite-plugin-mdx";
import { defineConfig } from "@solidjs/start/config";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import { readSync } from "to-vfile";
import { matter } from "vfile-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
	extensions: ["mdx"],
	vite: () => {
		// https://andi.dev/blog/how-solid-start-blog
		const processFiles = () => {
			const docs: {
				headings?: { depth: number; slug: string; text: string }[];
				frontmatter?: {
					title: string;
					description: string;
					component: boolean;
					link: {
						doc: string;
						api: string;
					};
					toc: boolean;
				};
				slug?: string;
			}[] = [];

			const outputFile = resolve(".content/index.js");
			const docsDir = resolve("src/routes/docs");

			if (!existsSync(".content")) {
				mkdirSync(".content", { recursive: true });
			}

			(function processDirectory(currentDir: string) {
				const items = readdirSync(currentDir, { withFileTypes: true });

				for (const item of items) {
					const fullPath = join(currentDir, item.name);

					if (item.isDirectory()) {
						processDirectory(fullPath);
					} else if (item.isFile() && item.name.endsWith(".mdx")) {
						const fileContent = readSync(fullPath, "utf-8");
						matter(fileContent);

						const relativePath = relative(docsDir, fullPath);
						const slug = `/docs/${relativePath.replace(/\.mdx$/, "").replace(/\\/g, "/")}`;

						const headings: { depth: number; slug: string; text: string }[] =
							[];
						const regex = /^(#{1,6})\s+(.+)$/gm;
						let match: RegExpExecArray | null;

						// biome-ignore lint/suspicious/noAssignInExpressions:
						while ((match = regex.exec(String(fileContent))) !== null) {
							const depth = match[1].length;
							const text = match[2].trim();

							headings.push({
								depth,
								text,
								slug: text
									.toLowerCase()
									.replace(/[^a-z0-9]+/g, "-")
									.replace(/(^-|-$)/g, ""),
							});
						}

						docs.push({
							frontmatter: fileContent.data
								.matter as (typeof docs)[0]["frontmatter"],
							headings,
							slug,
						});
					}
				}
			})(docsDir);

			writeFileSync(
				outputFile,
				`export const allDocs = ${JSON.stringify(docs, null, 2)}`,
				"utf-8",
			);
		};

		return {
			plugins: [
				{
					name: "posts-gen",
					buildStart() {
						processFiles();
					},
					configureServer(server) {
						server.watcher.on("change", (filePath) => {
							if (filePath.includes("/src/routes/docs")) {
								processFiles();
							}
						});
					},
				},
				mdx({
					jsx: true,
					jsxImportSource: "solid-js",
					providerImportSource: "@/components/mdx",
					remarkPlugins: [remarkGfm, remarkFrontmatter],
					rehypePlugins: [rehypeSlug],
				}),
			],
			resolve: {
				alias: {
					"@": resolve(__dirname, "./src"),
					"#content": resolve(__dirname, "./.content"),
				},
			},
		};
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

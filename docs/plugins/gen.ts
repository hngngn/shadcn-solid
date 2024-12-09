import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { readSync } from "to-vfile";
import { unified } from "unified";
import { matter } from "vfile-matter";
import type { Plugin } from "vinxi";

type Doc = {
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
};

const traverseDirectory = async (
	currentDir: string,
	docsDir: string,
	processor: ReturnType<typeof unified>,
	docs: Doc[],
) => {
	const items = readdirSync(currentDir, { withFileTypes: true });

	for (const item of items) {
		const fullPath = join(currentDir, item.name);

		if (item.isDirectory()) {
			await traverseDirectory(fullPath, docsDir, processor, docs);
		} else if (item.isFile() && item.name.endsWith(".mdx")) {
			const fileContent = readSync(fullPath, "utf-8");
			matter(fileContent);

			const relativePath = relative(docsDir, fullPath);
			const slug = `/docs/${relativePath.replace(/\.mdx$/, "").replace(/\\/g, "/")}`;

			const processed = await processor.process(String(fileContent));
			const headings: { depth: number; slug: string; text: string }[] = [];

			// Extract headings with slugs
			const regex = /<h(\d) id="([^"]+)">([^<]+)<\/h\d>/g;
			let match: RegExpExecArray | null;

			// biome-ignore lint/suspicious/noAssignInExpressions:
			while ((match = regex.exec(String(processed))) !== null) {
				const depth = Number(match[1]);
				const slug = match[2];
				const text = match[3].trim();

				headings.push({ depth, slug, text });
			}

			docs.push({
				frontmatter: fileContent.data.matter as Doc["frontmatter"],
				headings,
				slug,
			});
		}
	}
};

const processFiles = async () => {
	const docs: Doc[] = [];
	const outputFile = resolve(".content/index.js");
	const docsDir = resolve("src/routes/(app)/docs");

	if (!existsSync(".content")) {
		mkdirSync(".content", { recursive: true });
	}

	const processor = unified()
		.use(remarkParse)
		.use(remarkFrontmatter)
		.use(remarkRehype)
		.use(rehypeSlug)
		.use(rehypeStringify);

	// @ts-expect-error
	await traverseDirectory(docsDir, docsDir, processor, docs);

	writeFileSync(
		outputFile,
		`export const allDocs = ${JSON.stringify(docs, null, 2)}`,
		"utf-8",
	);
};

export default function docsGen(): Plugin {
	return {
		name: "docs-gen",
		async buildStart() {
			await processFiles();
		},
		configureServer(server) {
			server.watcher.on("change", async (filePath) => {
				if (filePath.endsWith(".mdx")) {
					await processFiles();
				}
			});
		},
	};
}

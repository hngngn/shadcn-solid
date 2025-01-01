"use server";

import type * as v from "valibot";

import { highlightCode } from "@/libs/highlight-code";
import { createFileTreeForRegistryItemFiles } from "@/libs/registry";
import type { registryItemFileSchema } from "@/registry/schema";
import { query } from "@solidjs/router";

export const getCachedFileTree = query(
	// eslint-disable-next-line @typescript-eslint/require-await
	async (files: { path: string; target?: string }[] | undefined) => {
		if (!files) {
			return null;
		}

		return createFileTreeForRegistryItemFiles(files);
	},
	"file-tree",
);

export const getCachedHighlightedFiles = query(
	async (files: v.InferInput<typeof registryItemFileSchema>[] | undefined) => {
		if (!files) {
			return null;
		}
		return await Promise.all(
			files.map(async (file) => ({
				...file,
				highlightedContent: await highlightCode(file.content ?? ""),
			})),
		);
	},
	"highlighted-file",
);

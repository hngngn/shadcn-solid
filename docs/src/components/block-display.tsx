import { highlightCode } from "@/libs/highlight-code";
import {
	createFileTreeForRegistryItemFiles,
	getRegistryItem,
} from "@/libs/registry";
import type { registryItemFileSchema } from "@/registry/schema";
import { createAsync, query } from "@solidjs/router";
import { clientOnly } from "@solidjs/start";
import { Show } from "solid-js";
import type * as v from "valibot";

const BlockViewer = clientOnly(() => import("./block-viewer"));

const getCachedRegistryItem = query((name: string) => {
	return getRegistryItem(name);
}, "registry-item");

const getCachedFileTree = query(
	// eslint-disable-next-line @typescript-eslint/require-await
	async (files: { path: string; target?: string }[] | undefined) => {
		if (!files) {
			return null;
		}

		return createFileTreeForRegistryItemFiles(files);
	},
	"file-tree",
);

const getCachedHighlightedFiles = query(
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

const BlockDisplay = (props: { name: string }) => {
	const item = createAsync(() => getCachedRegistryItem(props.name));
	const tree = createAsync(() => getCachedFileTree(item()?.files));
	const highlightedFiles = createAsync(() =>
		getCachedHighlightedFiles(item()?.files),
	);

	return (
		<Show when={item()?.files && tree() && highlightedFiles()}>
			<BlockViewer
				item={item()!}
				tree={tree()!}
				highlightedFiles={highlightedFiles()!}
			/>
		</Show>
	);
};

export default BlockDisplay;

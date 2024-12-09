import { createAsync, query } from "@solidjs/router";
import { clientOnly } from "@solidjs/start";
import { Show } from "solid-js";
import {
	createFileTreeForRegistryItemFiles,
	getRegistryItem,
} from "~/libs/registry";

const BlockViewer = clientOnly(() => import("./block-viewer"));

const getCachedRegistryItem = query((name: string) => {
	"use server";

	return getRegistryItem(name);
}, "registry-item");

const getCachedFileTree = query(
	// eslint-disable-next-line @typescript-eslint/require-await
	async (files: { path: string; target?: string }[] | undefined) => {
		"use server";

		if (!files) {
			return null;
		}

		return createFileTreeForRegistryItemFiles(files);
	},
	"file-tree",
);

const BlockDisplay = (props: { name: string }) => {
	const item = createAsync(() => getCachedRegistryItem(props.name));
	const tree = createAsync(() => getCachedFileTree(item()?.files));

	return (
		<Show when={item()?.files}>
			<BlockViewer item={item()!} tree={tree()!} />
		</Show>
	);
};

export default BlockDisplay;

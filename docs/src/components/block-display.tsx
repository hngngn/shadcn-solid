import { Index } from "@/__registry__";
import type { RegistryEntry } from "@/registry/schema";
import { getCachedFileTree, getCachedHighlightedFiles } from "@/server/data";
import { createAsync } from "@solidjs/router";
import { clientOnly } from "@solidjs/start";
import { Show, createMemo } from "solid-js";

const BlockViewer = clientOnly(() => import("./block-viewer"), { lazy: true });

const BlockDisplay = (props: { name: string }) => {
	const item = createMemo<RegistryEntry>(() => Index.tailwindcss[props.name]);
	const tree = createAsync(() => getCachedFileTree(item().files));
	const highlightedFiles = createAsync(() =>
		getCachedHighlightedFiles(item().files),
	);

	return (
		<Show when={item().files && tree() && highlightedFiles()}>
			<BlockViewer
				item={item()}
				tree={tree()!}
				highlightedFiles={highlightedFiles()!}
			/>
		</Show>
	);
};

export default BlockDisplay;

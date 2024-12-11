import {
	getCachedFileTree,
	getCachedHighlightedFiles,
	getCachedRegistryItem,
} from "@/server/data";
import { createAsync } from "@solidjs/router";
import { clientOnly } from "@solidjs/start";
import { Show } from "solid-js";

const BlockViewer = clientOnly(() => import("./block-viewer"));

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

import { createHighlighterCore } from "shiki/core";
import getWasm from "shiki/wasm";
import type { VoidComponent } from "solid-js";
import { Show, createSignal, onMount } from "solid-js";
import blackout from "../../public/theme/dark.json?raw";
import CopyButton from "./copy-button";

const RawCode: VoidComponent<{ code: string }> = (props) => {
	const [html, setHTML] = createSignal<string>();

	onMount(async () => {
		const highlighter = await createHighlighterCore({
			themes: [JSON.parse(String(blackout))],
			langs: [() => import("shiki/langs/tsx.mjs")],
			loadWasm: getWasm,
		});

		const codeHTML = highlighter.codeToHtml(props.code.trim(), {
			lang: "tsx",
			theme: "blackout",
		});
		setHTML(codeHTML);
	});

	return (
		<Show
			when={html()}
			fallback={
				<div
					data-raw-code
					class="h-[350px] border rounded-md flex justify-center items-center bg-zinc-900 mt-6 text-white"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="animate-spin size-4"
						viewBox="0 0 24 24"
					>
						<path
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 6V3m4.25 4.75L18.4 5.6M18 12h3m-4.75 4.25l2.15 2.15M12 18v3m-4.25-4.75L5.6 18.4M6 12H3m4.75-4.25L5.6 5.6"
						/>
						<title>Loading</title>
					</svg>
				</div>
			}
		>
			<div data-raw-code class="relative">
				<div innerHTML={html()} />
				<CopyButton rawString={props.code} withMeta={false} />
			</div>
		</Show>
	);
};

export default RawCode;

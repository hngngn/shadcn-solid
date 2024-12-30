import type { HighlighterCore } from "shiki";
import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";

let highlighterPromise: Promise<HighlighterCore> | null = null;

const getHighlighter = async () => {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighterCore({
			themes: [import("shiki/themes/vesper.mjs")],
			langs: [import("shiki/langs/tsx.mjs")],
			engine: createOnigurumaEngine(import("shiki/wasm")),
		});
	}
	return highlighterPromise;
};

export const highlightCode = async (code: string) => {
	const highlighter = await getHighlighter();
	return highlighter.codeToHtml(code, {
		lang: "tsx",
		theme: "vesper",
		transformers: [
			{
				code(node) {
					node.properties["data-line-numbers"] = "";
				},
			},
		],
	});
};

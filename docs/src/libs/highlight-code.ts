"use server";

import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";

export async function highlightCode(code: string) {
	const highlighter = await createHighlighterCore({
		themes: [import("shiki/themes/vesper.mjs")],
		langs: [import("shiki/langs/tsx.mjs")],
		engine: createOnigurumaEngine(import("shiki/wasm")),
	});

	const html = highlighter.codeToHtml(code, {
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

	highlighter.dispose();

	return html;
}

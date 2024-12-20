"use server";

import { codeToHtml } from "shiki";

export const highlightCode = async (code: string) => {
	const html = await codeToHtml(code, {
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

	return html;
};

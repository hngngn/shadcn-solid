import { createEffect } from "solid-js";

const copiedIcon = `
 <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24">
    <g
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2">
        <path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z" />
        <path d="M4.012 16.737A2.005 2.005 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1M11 14l2 2l4-4" />
    </g>
    <title>Copied</title>
</svg>
`;

const CopyButton = () => {
	createEffect(() => {
		const figureBlocks = Array.from(
			document.querySelectorAll("figure"),
		) as HTMLElement[];

		const previewBlocks = Array.from(
			document.querySelectorAll("div[data-preview-code]"),
		) as HTMLElement[];

		for (const previewBlock of previewBlocks) {
			const copyButton = previewBlock.querySelector(
				"button",
			) as HTMLButtonElement;
			if (!copyButton) return;

			const copyButtonHTML = copyButton.innerHTML;

			const codeContent = (previewBlock.querySelector("code") as HTMLElement)
				.innerText;

			copyButton.addEventListener("click", async () => {
				await navigator.clipboard.writeText(codeContent);
				copyButton.innerHTML = copiedIcon;
				setTimeout(() => {
					copyButton.innerHTML = copyButtonHTML;
				}, 2000);
			});
		}

		for (const figureBlock of figureBlocks) {
			const copyButton = figureBlock.querySelector(
				"button",
			) as HTMLButtonElement;
			if (!copyButton) return;

			const figcaption = figureBlock.querySelector("figcaption");
			if (figcaption) {
				copyButton.style.top = "4rem";
			}

			const copyButtonHTML = copyButton.innerHTML;

			const codeContent = (figureBlock.querySelector("code") as HTMLElement)
				.innerText;

			copyButton.addEventListener("click", async () => {
				await navigator.clipboard.writeText(codeContent);
				copyButton.innerHTML = copiedIcon;
				setTimeout(() => {
					copyButton.innerHTML = copyButtonHTML;
				}, 2000);
			});
		}
	});

	return (
		<button
			type="button"
			class="bg-neutral-700/70 p-1 rounded-md absolute top-2 right-2 text-white"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
				viewBox="0 0 24 24"
			>
				<g
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
				>
					<path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z" />
					<path d="M4.012 16.737A2.005 2.005 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1" />
				</g>
				<title>Copy</title>
			</svg>
		</button>
	);
};

export default CopyButton;

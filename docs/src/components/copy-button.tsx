import { cn } from "@/libs/cn";
import { Show, createSignal } from "solid-js";

type Props = {
	rawString: string;
	withMeta: boolean;
};

const CopyButton = (props: Props) => {
	const [isCopied, setIsCopied] = createSignal(false);

	const copyToClipboard = () => {
		setIsCopied(true);
		navigator.clipboard.writeText(props.rawString);
		setTimeout(() => setIsCopied(false), 2000);
	};

	return (
		<button
			type="button"
			class={cn(
				"p-1 rounded-md absolute top-4 right-4 text-white hover:bg-neutral-700/70 transition-colors",
				props.withMeta && "top-16",
			)}
			onClick={copyToClipboard}
		>
			<Show
				when={isCopied()}
				fallback={
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
				}
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
						<path d="M4.012 16.737A2.005 2.005 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1M11 14l2 2l4-4" />
					</g>
					<title>Copied</title>
				</svg>
			</Show>
		</button>
	);
};

export default CopyButton;

import { cn } from "@/libs/cn";
import { Show, createSignal } from "solid-js";

type Props = {
	rawString: string;
	withMeta?: boolean;
	class?: string;
};

const CopyButton = (props: Props) => {
	const [isCopied, setIsCopied] = createSignal(false);

	const copyToClipboard = () => {
		setIsCopied(true);
		navigator.clipboard.writeText(props.rawString);
		setTimeout(() => setIsCopied(false), 1000);
	};

	return (
		<button
			type="button"
			class={cn(
				"p-1 rounded-md absolute top-4 right-4 text-white hover:bg-neutral-700/70 transition-colors",
				props.class,
				props.withMeta && "top-16",
			)}
			onClick={copyToClipboard}
		>
			<Show
				when={isCopied()}
				fallback={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 24 24"
					>
						<g
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
						>
							<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
							<path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2" />
						</g>
						<title>Copy to clipboard</title>
					</svg>
				}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					viewBox="0 0 24 24"
				>
					<g
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
					>
						<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
						<path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2m0 9l2 2l4-4" />
					</g>
					<title>Copied to clipboard</title>
				</svg>
			</Show>
		</button>
	);
};

export default CopyButton;

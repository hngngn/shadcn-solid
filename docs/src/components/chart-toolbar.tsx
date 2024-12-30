import type { RegistryEntry } from "@/registry/schema";
import { Button } from "@/registry/tailwindcss/ui/button";
import { Match, Show, Switch, createSignal } from "solid-js";

const ChartToolbar = (props: {
	item: RegistryEntry | undefined;
}) => {
	return (
		<div class="flex items-center gap-2 relative z-20 justify-end border-b bg-card px-3 py-2.5 text-card-foreground">
			<div class="flex items-center gap-1.5 pl-1 text-[13px] text-muted-foreground [&>svg]:h-[0.9rem] [&>svg]:w-[0.9rem]">
				<ChartTitle item={props.item} />
			</div>
			<div class="ml-auto">
				<ChartCopyButton item={props.item} />
			</div>
		</div>
	);
};

export default ChartToolbar;

const ChartTitle = (props: { item: RegistryEntry | undefined }) => {
	return (
		<Switch>
			<Match when={props.item?.name.includes("area")}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<g
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
					>
						<path d="M3 3v16a2 2 0 0 0 2 2h16" />
						<path d="M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z" />
					</g>
				</svg>
				Chart
			</Match>
		</Switch>
	);
};

const ChartCopyButton = (props: { item: RegistryEntry | undefined }) => {
	const [isCopied, setIsCopied] = createSignal(false);

	const copyToClipboard = async () => {
		setIsCopied(true);
		// @ts-expect-error
		await navigator.clipboard.writeText(props.item?.files[0].content);
		setTimeout(() => setIsCopied(false), 2000);
	};

	return (
		<Button
			variant="outline"
			size="icon"
			onClick={copyToClipboard}
			class="size-6 rounded-[6px] bg-transparent text-foreground shadow-none hover:bg-muted dark:text-foreground [&_svg]:size-3"
		>
			<Show
				when={isCopied()}
				fallback={
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
		</Button>
	);
};

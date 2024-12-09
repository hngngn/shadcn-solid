import { Button } from "@/components/ui/button";
import {
	Resizable,
	ResizableHandle,
	ResizablePanel,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import {
	Tabs,
	TabsIndicator,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
	type Accessor,
	type ParentProps,
	type Setter,
	Show,
	createContext,
	createSignal,
	useContext,
} from "solid-js";
import type * as v from "valibot";
import type { createFileTreeForRegistryItemFiles } from "~/libs/registry";
import type { registryEntrySchema } from "../../scripts/utils/schema";

type BlockViewerContext = {
	item: v.InferInput<typeof registryEntrySchema>;
	view: Accessor<"code" | "preview">;
	setView: Setter<"code" | "preview">;
	sizes: Accessor<number[]>;
	setSizes: Setter<number[]>;
	tree: ReturnType<typeof createFileTreeForRegistryItemFiles> | null;
};

const BlockViewerContext = createContext<BlockViewerContext>();

const useBlockViewer = () => {
	const context = useContext(BlockViewerContext);

	if (!context) {
		throw new Error(
			"`useBlockViewer` must be used within a `BlockViewerProvider`.",
		);
	}

	return context;
};

const BlockViewerProvider = (
	props: ParentProps<Pick<BlockViewerContext, "item" | "tree">>,
) => {
	const [view, setView] = createSignal<"code" | "preview">("preview");
	const [sizes, setSizes] = createSignal([1, 0]);

	const value: BlockViewerContext = {
		get item() {
			return props.item;
		},
		get tree() {
			return props.tree;
		},
		view,
		setView,
		sizes,
		setSizes,
	};

	return (
		<BlockViewerContext.Provider value={value}>
			<div
				id={props.item.name}
				data-view={view()}
				class="group/block-view-wrapper flex min-w-0 flex-col items-stretch gap-4"
				style={{
					"--height": props.item.meta?.iframeHeight ?? 450,
				}}
			>
				{props.children}
			</div>
		</BlockViewerContext.Provider>
	);
};

const BlockViewerToolbar = () => {
	const { setView, item, setSizes } = useBlockViewer();
	const [isCopied, setIsCopied] = createSignal(false);

	const copyToClipboard = async () => {
		setIsCopied(true);
		await navigator.clipboard.writeText(`npx shadcn@latest add ${item.name}`);
		setTimeout(() => setIsCopied(false), 2000);
	};

	return (
		<div class="flex w-full items-center gap-2 md:pr-[14px]">
			<Tabs
				defaultValue="preview"
				onChange={(value) => setView(value as "preview" | "code")}
				class="hidden lg:flex w-fit"
			>
				<TabsList class="h-7 items-center rounded-md p-0 px-[calc(theme(spacing.1)_-_2px)] py-[theme(spacing.1)] w-fit">
					<TabsTrigger
						value="preview"
						class="h-[1.45rem] rounded-sm px-2 text-xs"
					>
						Preview
					</TabsTrigger>
					<TabsTrigger
						value="code"
						class="h-[1.45rem] rounded-sm px-2 text-xs"
						disabled
					>
						Code
					</TabsTrigger>
					<TabsIndicator />
				</TabsList>
			</Tabs>
			<Separator orientation="vertical" class="mx-2 hidden h-4 lg:flex" />
			<a
				href={`#${item.name}`}
				class="text-sm font-medium underline-offset-2 hover:underline"
			>
				{item.description}
			</a>
			<div class="ml-auto flex items-center gap-2">
				<Button
					variant="ghost"
					class="hidden h-7 w-7 rounded-md border bg-transparent shadow-none md:flex lg:w-auto gap-2"
					size="sm"
					onClick={copyToClipboard}
				>
					<Show
						when={isCopied()}
						fallback={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="size-4"
								viewBox="0 0 24 24"
							>
								<path
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m4 17l6-6l-6-6m8 14h8"
								/>
							</svg>
						}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="size-4"
							viewBox="0 0 24 24"
						>
							<path
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M20 6L9 17l-5-5"
							/>
						</svg>
					</Show>
					<span class="hidden lg:inline">npx shadcn-solid add {item.name}</span>
				</Button>
				<Separator orientation="vertical" class="mx-2 hidden h-4 md:flex" />
				<div class="hidden h-7 items-center gap-1.5 rounded-md border p-[2px] shadow-none lg:flex">
					<ToggleGroup
						defaultValue="1"
						onChange={(size) => setSizes([Number(size), 0])}
					>
						<ToggleGroupItem
							value="1"
							class="h-[22px] w-[22px] rounded-sm p-0"
							title="Desktop"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="size-3.5"
								viewBox="0 0 24 24"
							>
								<g
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
								>
									<rect width="20" height="14" x="2" y="3" rx="2" />
									<path d="M8 21h8m-4-4v4" />
								</g>
							</svg>
						</ToggleGroupItem>
						<ToggleGroupItem
							value="0.6"
							class="h-[22px] w-[22px] rounded-sm p-0"
							title="Tablet"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="size-3.5"
								viewBox="0 0 24 24"
							>
								<path
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M18 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM9 18h6"
								/>
							</svg>
						</ToggleGroupItem>
						<ToggleGroupItem
							value="0.3"
							class="h-[22px] w-[22px] rounded-sm p-0"
							title="Mobile"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="size-3.5"
								viewBox="0 0 24 24"
							>
								<path
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zm5-1h2m-1 13v.01"
								/>
							</svg>
						</ToggleGroupItem>
						<Separator
							orientation="vertical"
							class="data-[orientation=vertical]:h-4"
						/>
						<Button
							size="icon"
							variant="ghost"
							class="h-[22px] w-[22px] rounded-sm p-0"
							as="a"
							title="Open in New Tab"
							href={`/blocks/${item.name}`}
							target="_blank"
						>
							<span class="sr-only">Open in New Tab</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="size-3.5"
								viewBox="0 0 24 24"
							>
								<g
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
								>
									<path d="M3 7V5a2 2 0 0 1 2-2h2m10 0h2a2 2 0 0 1 2 2v2m0 10v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
									<rect width="10" height="8" x="7" y="8" rx="1" />
								</g>
							</svg>
						</Button>
					</ToggleGroup>
				</div>
				<Separator orientation="vertical" class="mx-2 hidden h-4 xl:flex" />
			</div>
		</div>
	);
};

const BlockViewerView = () => {
	const { item, sizes, setSizes } = useBlockViewer();

	return (
		<div class="h-[--height] group-data-[view=code]/block-view-wrapper:hidden">
			<div class="grid w-full gap-4">
				<Resizable sizes={sizes()} onSizesChange={setSizes}>
					<ResizablePanel
						minSize={0.3}
						class="relative aspect-[4/2.5] rounded-xl border bg-background md:aspect-auto overflow-hidden"
					>
						<iframe
							src={`/blocks/${item.name}`}
							height={item.meta?.iframeHeight ?? 450}
							class="w-full bg-background"
							title={item.name}
						/>
					</ResizablePanel>
					<ResizableHandle class="hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-[6px] after:-translate-y-1/2 after:translate-x-[-1px] after:rounded-full after:bg-border after:transition-all after:hover:h-10 md:block" />
					<ResizablePanel />
				</Resizable>
			</div>
		</div>
	);
};

const BlockViewer = (props: Pick<BlockViewerContext, "item" | "tree">) => {
	return (
		<BlockViewerProvider {...props}>
			<BlockViewerToolbar />
			<BlockViewerView />
			{/*<BlockViewerCode />*/}
		</BlockViewerProvider>
	);
};

export default BlockViewer;

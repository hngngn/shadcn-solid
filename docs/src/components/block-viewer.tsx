import type {
	FileTree,
	createFileTreeForRegistryItemFiles,
} from "@/libs/registry";
import type { RegistryEntry, registryItemFileSchema } from "@/registry/schema";
import { Button } from "@/registry/tailwindcss/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/tailwindcss/ui/collapsible";
import {
	Resizable,
	ResizableHandle,
	ResizablePanel,
} from "@/registry/tailwindcss/ui/resizable";
import { Separator } from "@/registry/tailwindcss/ui/separator";
import {
	Sidebar,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarProvider,
} from "@/registry/tailwindcss/ui/sidebar";
import {
	Tabs,
	TabsIndicator,
	TabsList,
	TabsTrigger,
} from "@/registry/tailwindcss/ui/tabs";
import {
	ToggleGroup,
	ToggleGroupItem,
} from "@/registry/tailwindcss/ui/toggle-group";
import type { CollapsibleTriggerProps } from "@kobalte/core/collapsible";
import type { AccessorWithLatest } from "@solidjs/router";
import {
	type Accessor,
	For,
	type ParentProps,
	type Setter,
	Show,
	createContext,
	createMemo,
	createSignal,
	useContext,
} from "solid-js";
import type * as v from "valibot";

type BlockViewerProps = {
	item: RegistryEntry | undefined;
	tree: ReturnType<typeof createFileTreeForRegistryItemFiles> | null;
	highlightedFiles:
		| (v.InferInput<typeof registryItemFileSchema> & {
				highlightedContent: string;
		  })[]
		| null;
};

type BlockViewerContext = {
	item: Accessor<RegistryEntry | undefined>;
	view: Accessor<"code" | "preview">;
	setView: Setter<"code" | "preview">;
	sizes: Accessor<number[]>;
	setSizes: Setter<number[]>;
	activeFile: Accessor<string | null>;
	setActiveFile: Setter<string | null>;
	tree: Accessor<ReturnType<typeof createFileTreeForRegistryItemFiles> | null>;
	highlightedFiles: Accessor<
		| (v.InferInput<typeof registryItemFileSchema> & {
				highlightedContent: string;
		  })[]
		| null
	>;
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

const BlockViewerProvider = (props: ParentProps<BlockViewerProps>) => {
	const [view, setView] = createSignal<"code" | "preview">("preview");
	const [sizes, setSizes] = createSignal([1, 0]);
	const [activeFile, setActiveFile] = createSignal<string | null>(
		// eslint-disable-next-line solid/reactivity
		props.highlightedFiles?.[0].target ?? null,
	);

	const value: BlockViewerContext = {
		item: () => props.item,
		tree: () => props.tree,
		view,
		setView,
		sizes,
		setSizes,
		activeFile,
		setActiveFile,
		highlightedFiles: () => props.highlightedFiles,
	};

	return (
		<BlockViewerContext.Provider value={value}>
			<div
				id={props.item?.name}
				data-view={view()}
				class="group/block-view-wrapper flex min-w-0 flex-col items-stretch gap-4"
				style={{
					"--height": props.item?.meta?.iframeHeight ?? "800px",
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
		await navigator.clipboard.writeText(
			`npx shadcn@latest add ${item()?.name}`,
		);
		setTimeout(() => setIsCopied(false), 2000);
	};

	return (
		<div class="flex w-full items-center gap-2">
			<Tabs
				defaultValue="preview"
				onChange={(value) => setView(value as "preview" | "code")}
				class="hidden lg:flex w-fit"
			>
				<TabsList class="h-7 rounded-md">
					<TabsTrigger value="preview" class="h-[1.45rem] px-2 text-xs">
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" class="h-[1.45rem] px-2 text-xs">
						Code
					</TabsTrigger>
					<TabsIndicator class="rounded-sm" />
				</TabsList>
			</Tabs>
			<Separator
				orientation="vertical"
				class="mx-2 hidden data-[orientation=vertical]:h-4 lg:flex"
			/>
			<a
				href={`#${item()?.name}`}
				class="text-sm font-medium underline-offset-2 hover:underline"
			>
				{item()?.description}
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
								class="size-3.5"
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
							class="size-3.5"
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
					<span class="hidden lg:inline">
						npx shadcn-solid add {item()?.name}
					</span>
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
							href={`/blocks/${item()?.name}`}
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
		<div class="group-data-[view=code]/block-view-wrapper:hidden md:h-[--height]">
			<div class="grid w-full gap-4">
				<Resizable sizes={sizes()} onSizesChange={setSizes}>
					<ResizablePanel
						initialSize={1}
						minSize={0.3}
						class="relative aspect-[4/2.5] rounded-xl border bg-background md:aspect-auto overflow-hidden"
					>
						<img
							src={`/images/blocks/${item()?.name}.png`}
							alt={item.name}
							data-block={item.name}
							width={1440}
							height={900}
							class="object-cover dark:hidden md:hidden md:dark:hidden"
						/>
						<img
							src={`/images/blocks/${item()?.name}-dark.png`}
							alt={item.name}
							data-block={item.name}
							width={1440}
							height={900}
							class="hidden object-cover dark:block md:hidden md:dark:hidden"
						/>
						<iframe
							src={`/blocks/${item()?.name}`}
							height={item()?.meta?.iframeHeight ?? 800}
							class="w-full bg-background hidden md:block"
							title={item()?.name}
							loading="lazy"
						/>
					</ResizablePanel>
					<ResizableHandle class="hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-[6px] after:-translate-y-1/2 after:translate-x-[-1px] after:rounded-full after:bg-border after:transition-all after:hover:h-10 md:block" />
					<ResizablePanel initialSize={0} minSize={0} />
				</Resizable>
			</div>
		</div>
	);
};

const BlockViewerCode = () => {
	const { activeFile, highlightedFiles } = useBlockViewer();

	const file = createMemo(() => {
		return highlightedFiles()?.find((file) => file.target === activeFile());
	});

	return (
		<Show when={file()}>
			<div class="mr-[14px] flex h-[--height] overflow-hidden rounded-xl bg-zinc-950 text-white group-data-[view=preview]/block-view-wrapper:hidden">
				<div class="w-[280px]">
					<BlockViewerFileTree />
				</div>
				<div class="flex min-w-0 flex-1 flex-col">
					<div class="flex h-12 items-center gap-2 border-b border-zinc-700 bg-zinc-900 px-4 text-sm font-medium">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="size-4"
							viewBox="0 0 24 24"
						>
							<g
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
							>
								<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
								<path d="M14 2v4a2 2 0 0 0 2 2h4" />
							</g>
						</svg>
						{file()!.target}
						<div class="ml-auto flex items-center gap-2">
							<BlockCopyCodeButton />
						</div>
					</div>
					<div
						data-rehype-pretty-code-figure=""
						// eslint-disable-next-line solid/no-innerhtml
						innerHTML={file()?.highlightedContent ?? ""}
						class="relative flex-1 overflow-hidden after:absolute after:inset-y-0 after:left-0 after:w-10 after:bg-zinc-950 [&_.line:before]:sticky [&_.line:before]:left-2 [&_.line:before]:z-10 [&_.line:before]:translate-y-[-1px] [&_.line:before]:pr-1 [&_pre]:h-[--height] [&_pre]:overflow-auto [&_pre]:!bg-transparent [&_pre]:pb-12 [&_pre]:pt-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed"
					/>
				</div>
			</div>
		</Show>
	);
};

const BlockViewerFileTree = () => {
	const { tree } = useBlockViewer();

	return (
		<Show when={tree}>
			<SidebarProvider class="flex !min-h-full flex-col">
				<Sidebar
					collapsible="none"
					class="w-full flex-1 border-r border-zinc-700 bg-zinc-900 text-white"
				>
					<SidebarGroupLabel class="h-12 rounded-none border-b border-zinc-700 px-4 text-sm text-white">
						Files
					</SidebarGroupLabel>
					<SidebarGroup class="p-0">
						<SidebarGroupContent>
							<SidebarMenu class="gap-1.5">
								<For each={tree()}>
									{(file) => <Tree item={file} index={1} />}
								</For>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</Sidebar>
			</SidebarProvider>
		</Show>
	);
};

const Tree = (props: { item: FileTree; index: number }) => {
	const { activeFile, setActiveFile } = useBlockViewer();

	return (
		<Show
			when={props.item.children}
			fallback={
				<SidebarMenuItem>
					<SidebarMenuButton
						isActive={props.item.path === activeFile()}
						onClick={() => props.item.path && setActiveFile(props.item.path)}
						class="whitespace-nowrap rounded-none pl-[--index] hover:bg-zinc-700 hover:text-white focus:bg-zinc-700 focus:text-white focus-visible:bg-zinc-700 focus-visible:text-white active:bg-zinc-700 active:text-white data-[active=true]:bg-zinc-700 data-[active=true]:text-white"
						data-index={props.index}
						style={{
							"--index": `${props.index * (props.index === 2 ? 1.2 : 1.3)}rem`,
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="size-4 invisible"
							viewBox="0 0 24 24"
						>
							<path
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m9 18l6-6l-6-6"
							/>
						</svg>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="size-4"
							viewBox="0 0 24 24"
						>
							<g
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
							>
								<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
								<path d="M14 2v4a2 2 0 0 0 2 2h4" />
							</g>
						</svg>
						{props.item.name}
					</SidebarMenuButton>
				</SidebarMenuItem>
			}
		>
			<SidebarMenuItem>
				<Collapsible
					class="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
					defaultOpen
				>
					<CollapsibleTrigger
						as={(triggerProps: CollapsibleTriggerProps) => (
							// @ts-expect-error
							<SidebarMenuButton
								{...triggerProps}
								class="whitespace-nowrap rounded-none pl-[--index] hover:bg-zinc-700 hover:text-white focus-visible:bg-zinc-700 focus-visible:text-white active:bg-zinc-700 active:text-white data-[active=true]:bg-zinc-700 data-[active=true]:text-white data-[state=open]:hover:bg-zinc-700 data-[state=open]:hover:text-white"
								style={{
									"--index": `${props.index * (props.index === 1 ? 1 : 1.2)}rem`,
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="size-4 transition-transform"
									viewBox="0 0 24 24"
								>
									<path
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="m9 18l6-6l-6-6"
									/>
								</svg>
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
										d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
									/>
								</svg>
								{props.item.name}
							</SidebarMenuButton>
						)}
					/>
					<CollapsibleContent>
						<SidebarMenuSub class="m-0 w-full border-none p-0">
							<For each={props.item.children}>
								{(subItem) => <Tree item={subItem} index={props.index + 1} />}
							</For>
						</SidebarMenuSub>
					</CollapsibleContent>
				</Collapsible>
			</SidebarMenuItem>
		</Show>
	);
};

const BlockCopyCodeButton = () => {
	const { activeFile, item } = useBlockViewer();
	const [isCopied, setIsCopied] = createSignal(false);

	const copyToClipboard = async (content: string) => {
		setIsCopied(true);
		await navigator.clipboard.writeText(content);
		setTimeout(() => setIsCopied(false), 2000);
	};

	const file = createMemo(() => {
		return item()?.files?.find((file) => file.target === activeFile());
	});

	const content = () => file()?.content;

	return (
		<Show when={content()}>
			<Button
				onClick={() => copyToClipboard(content()!)}
				class="h-7 w-7 shrink-0 rounded-lg p-0 hover:bg-zinc-700 hover:text-white focus:bg-zinc-700 focus:text-white focus-visible:bg-zinc-700 focus-visible:text-white active:bg-zinc-700 active:text-white data-[active=true]:bg-zinc-700 data-[active=true]:text-white [&>svg]:size-3.5"
				variant="ghost"
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
		</Show>
	);
};

const BlockViewer = (props: BlockViewerProps) => {
	return (
		<BlockViewerProvider {...props}>
			<BlockViewerToolbar />
			<BlockViewerView />
			<BlockViewerCode />
		</BlockViewerProvider>
	);
};

export default BlockViewer;

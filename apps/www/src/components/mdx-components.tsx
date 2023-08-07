import { cn } from "@/lib/cn"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/default/ui/accordion"
import { Alert, AlertDescription } from "@/registry/default/ui/alert"
import {
	Tabs,
	TabsContent,
	TabsIndicator,
	TabsList,
	TabsTrigger,
} from "@/registry/default/ui/tabs"
import { Show, type ComponentProps } from "solid-js"
import { ComponentPreview } from "./component-preview"
import { ComponentSource } from "./component-source"
import { CopyButton } from "./copy-button"
import { PackageCopyButton } from "./package-copy-button"

export const MDXComponent = {
	h1: (props: ComponentProps<"h1">) => {
		return (
			<h1
				class="font-heading mt-2 scroll-m-20 text-4xl font-bold"
				{...props}
			/>
		)
	},
	h2: (props: ComponentProps<"h2">) => {
		return (
			<h2
				class="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
				{...props}
			/>
		)
	},
	h3: (props: ComponentProps<"h3">) => {
		return (
			<h3
				class="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
				{...props}
			/>
		)
	},
	h4: (props: ComponentProps<"h4">) => {
		return (
			<h4
				class="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
				{...props}
			/>
		)
	},
	h5: (props: ComponentProps<"h5">) => {
		return (
			<h5
				class="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
				{...props}
			/>
		)
	},
	h6: (props: ComponentProps<"h6">) => {
		return (
			<h6
				class="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
				{...props}
			/>
		)
	},
	a: (props: ComponentProps<"a">) => {
		return <a class="font-medium underline underline-offset-4" {...props} />
	},
	p: (props: ComponentProps<"p">) => {
		return (
			<p
				class="leading-7 [&:not(:first-child)]:mt-6 break-words"
				{...props}
			/>
		)
	},
	ul: (props: ComponentProps<"ul">) => {
		return <ul class="my-6 ml-6 list-disc" {...props} />
	},
	ol: (props: ComponentProps<"ol">) => {
		return <ol class="my-6 ml-6 list-decimal" {...props} />
	},
	li: (props: ComponentProps<"li">) => {
		return <li class="mt-2" {...props} />
	},
	blockquote: (props: ComponentProps<"blockquote">) => {
		return <blockquote class="mt-6 border-l-2 pl-6 italic" {...props} />
	},
	img: (props: ComponentProps<"img">) => {
		return <img class="rounded-md" {...props} />
	},
	code: (props: ComponentProps<"code">) => {
		return (
			<code
				class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
				{...props}
			/>
		)
	},
	pre: (
		props: ComponentProps<"pre"> & {
			"data-meta"?: boolean
			"data-package"?: boolean
		}
	) => {
		let preRef: HTMLPreElement | undefined

		return (
			<>
				<pre
					ref={preRef}
					class="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900"
					{...props}
				/>
				<Show
					when={!props["data-package"]}
					fallback={<PackageCopyButton preRef={preRef} />}
				>
					<CopyButton
						preRef={preRef}
						class={cn(props["data-meta"] && "top-16")}
					/>
				</Show>
			</>
		)
	},
	Step: (props: ComponentProps<"h3">) => {
		return (
			<h3
				class="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
				{...props}
			/>
		)
	},
	Steps: (props: ComponentProps<"div">) => {
		return (
			<div
				class="[&>h3]:step steps mb-12 ml-4 border-l pl-8 [counter-reset:step]"
				{...props}
			/>
		)
	},
	Tabs: (props: ComponentProps<typeof Tabs>) => {
		return <Tabs class="relative mt-6 w-full" {...props} />
	},
	TabsList: (props: ComponentProps<typeof TabsList>) => {
		return (
			<TabsList
				class="w-full justify-start rounded-none border-b bg-transparent p-0"
				{...props}
			/>
		)
	},
	TabsTrigger: (props: ComponentProps<typeof TabsTrigger>) => {
		return (
			<TabsTrigger
				class="rounded-none bg-transparent px-4 pb-3.5 pt-2 font-semibold data-[selected]:shadow-none"
				{...props}
			/>
		)
	},
	TabsContent: (props: ComponentProps<typeof TabsContent>) => {
		return (
			<TabsContent
				class="relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold"
				{...props}
			/>
		)
	},
	Alert,
	AlertDescription,
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
	ComponentPreview,
	ComponentSource,
	TabsIndicator,
}

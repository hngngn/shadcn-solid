import { Show, createSignal, type ComponentProps } from "solid-js"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Alert,
	AlertDescription,
	AlertTitle,
} from "./ui"

export const MDXComponent = {
	h1: (props: ComponentProps<"h1">) => {
		return <h1 class="mt-2 scroll-m-20 text-4xl font-bold" {...props} />
	},
	h2: (props: ComponentProps<"h2">) => {
		return (
			<h2
				class="mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
				{...props}
			/>
		)
	},
	h3: (props: ComponentProps<"h3">) => {
		return (
			<h3
				class="mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
				{...props}
			/>
		)
	},
	h4: (props: ComponentProps<"h4">) => {
		return (
			<h4
				class="mt-8 scroll-m-20 text-lg font-semibold tracking-tight"
				{...props}
			/>
		)
	},
	h5: (props: ComponentProps<"h5">) => {
		return (
			<h5
				class="mt-8 scroll-m-20 text-lg font-semibold tracking-tight"
				{...props}
			/>
		)
	},
	h6: (props: ComponentProps<"h6">) => {
		return (
			<h6
				class="mt-8 scroll-m-20 text-lg font-semibold tracking-tight"
				{...props}
			/>
		)
	},
	a: (props: ComponentProps<"a">) => {
		return <a class="font-medium underline underline-offset-4" {...props} />
	},
	p: (props: ComponentProps<"p">) => {
		return <p class="leading-7 mdx-p-tag" {...props} />
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
	pre: (props: ComponentProps<"pre">) => {
		let preRef!: HTMLPreElement

		const [isCopied, setIsCopied] = createSignal(false)

		const copyToClipboard = () => {
			const innerText = preRef?.querySelector("code")?.innerText ?? ""
			setIsCopied(true)
			void navigator.clipboard.writeText(innerText)
			setTimeout(() => setIsCopied(false), 2000)
		}

		return (
			<>
				<pre
					ref={preRef}
					class="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border py-4 data-[theme=dark]:bg-background data-[theme=light]:bg-white"
					{...props}
				/>
				<button
					class="z-20 inline-flex h-6 w-6 items-center justify-center rounded-md border bg-background text-sm font-medium transition-all hover:bg-muted focus:outline-none absolute right-4 top-4"
					onClick={copyToClipboard}
				>
					<span class="sr-only">Copy</span>
					<Show
						when={isCopied()}
						fallback={<i class="i-lucide-copy h-3 w-3" />}
					>
						<i class="i-lucide-check h-3 w-3" />
					</Show>
				</button>
			</>
		)
	},
	Steps: (props: ComponentProps<"div">) => {
		return <div class="mb-12 ml-4 border-l pl-8 mdx-pre-tag" {...props} />
	},
	Alert,
	AlertTitle,
	AlertDescription,
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
}

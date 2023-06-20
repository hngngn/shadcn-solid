import type { Component } from "solid-js"
import { Show, createSignal } from "solid-js"

type Props = {
	preRef: HTMLPreElement | undefined
}

export const CopyButton: Component<Props> = (props) => {
	const [isCopied, setIsCopied] = createSignal(false)

	const copyToClipboard = () => {
		const innerText = props.preRef?.querySelector("code")?.innerText ?? ""
		setIsCopied(true)
		void navigator.clipboard.writeText(innerText)
		setTimeout(() => setIsCopied(false), 2000)
	}

	return (
		<button
			class="z-20 inline-flex h-6 w-6 items-center justify-center  rounded-md border bg-background text-sm font-medium transition-all hover:bg-muted focus:outline-none absolute right-4 top-4"
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
	)
}

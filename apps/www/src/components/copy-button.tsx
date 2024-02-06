import { cn } from "@/lib/cn"
import { Button } from "@/registry/default/ui/button"
import type { VoidComponent } from "solid-js"
import { Show, createSignal } from "solid-js"

type Props = {
	preRef: HTMLPreElement | undefined
	class?: string
}

export const CopyButton: VoidComponent<Props> = (props) => {
	const [isCopied, setIsCopied] = createSignal(false)

	const copyToClipboard = () => {
		const innerText = props.preRef?.querySelector("code")?.innerText ?? ""
		setIsCopied(true)
		void navigator.clipboard.writeText(innerText)
		setTimeout(() => setIsCopied(false), 2000)
	}

	return (
		<Button
			size="icon"
			variant="ghost"
			class={cn(
				"z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 absolute right-4 top-4",
				props.class
			)}
			onClick={copyToClipboard}
		>
			<span class="sr-only">Copy</span>
			<Show
				when={isCopied()}
				fallback={<span class="icon-[tabler--copy] w-4 h-4" />}
			>
				<span class="icon-[tabler--check] h-4 w-4" />
			</Show>
		</Button>
	)
}

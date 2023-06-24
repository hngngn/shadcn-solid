import { As } from "@kobalte/core"
import type { ComponentProps, ParentComponent } from "solid-js"
import { Show, createSignal, mergeProps, splitProps } from "solid-js"
import {
	Button,
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "./ui"

export const CodeBlockWrapper: ParentComponent<
	ComponentProps<"div"> & {
		expandButtonTitle?: string
	}
> = (props) => {
	const merge = mergeProps({ expandButtonTitle: "View Code" }, props)
	const [local, rest] = splitProps(merge, [
		"class",
		"expandButtonTitle",
		"children",
	])

	const [isOpened, setIsOpened] = createSignal(false)

	return (
		<Collapsible open={isOpened()} onOpenChange={setIsOpened} forceMount>
			<div
				class="relative overflow-hidden"
				classList={{
					[local.class!]: local.class !== undefined,
				}}
				{...rest}
			>
				<CollapsibleContent class="overflow-hidden max-h-32 [&_pre]:(my-0 max-h-650px pb-15 overflow-hidden data-[expanded]:overflow-auto) data-[expanded]:max-h-full">
					{local.children}
				</CollapsibleContent>
				<div
					class="absolute flex items-center justify-center p-2"
					classList={{
						"inset-x-0 bottom-0 h-35 bg-gradient-to-b from-zinc-700/1 to-zinc-950/90":
							isOpened(),
						"inset-0 bg-gradient-to-b from-zinc-700/30 to-zinc-950/90":
							!isOpened(),
					}}
				>
					<CollapsibleTrigger asChild>
						<As
							component={Button}
							variant="secondary"
							class="h-8 text-xs"
						>
							<Show
								when={isOpened()}
								fallback={local.expandButtonTitle}
							>
								Collapse
							</Show>
						</As>
					</CollapsibleTrigger>
				</div>
			</div>
		</Collapsible>
	)
}

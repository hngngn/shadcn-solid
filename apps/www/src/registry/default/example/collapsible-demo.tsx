import { As } from "@kobalte/core"
import { createSignal } from "solid-js"
import { Button } from "../ui/button"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../ui/collapsible"

const CollapsibleDemo = () => {
	const [isOpen, setIsOpen] = createSignal(false)

	return (
		<Collapsible
			open={isOpen()}
			onOpenChange={setIsOpen}
			class="w-350px space-y-2"
		>
			<div class="flex items-center justify-between space-x-4 px-4">
				<h4 class="text-sm font-semibold">
					@RyanCarniato starred 2 repositories
				</h4>
				<CollapsibleTrigger asChild>
					<As
						component={Button}
						variant="ghost"
						size="sm"
						class="w-9 p-0"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-4 h-4"
							viewBox="0 0 24 24"
						>
							<path
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m8 9l4-4l4 4m0 6l-4 4l-4-4"
							/>
						</svg>
						<span class="sr-only">Toggle</span>
					</As>
				</CollapsibleTrigger>
			</div>
			<div class="rounded-md border px-4 py-3 font-mono text-sm">
				solid-js
			</div>
			<CollapsibleContent class="space-y-2">
				<div class="rounded-md border px-4 py-3 font-mono text-sm">
					solid-start
				</div>
			</CollapsibleContent>
		</Collapsible>
	)
}

export default CollapsibleDemo

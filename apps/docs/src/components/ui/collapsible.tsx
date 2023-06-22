import { Collapsible as CollapsiblePrimitive } from "@kobalte/core"
import type { CollapsibleContentProps } from "@kobalte/core/dist/types/collapsible"
import type { ParentComponent } from "solid-js"
import { splitProps } from "solid-js"

export const Collapsible = CollapsiblePrimitive.Root

export const CollapsibleTrigger = CollapsiblePrimitive.Trigger

export const CollapsibleContent: ParentComponent<CollapsibleContentProps> = (
	props
) => {
	const [local, rest] = splitProps(props, ["class"])

	return (
		<CollapsiblePrimitive.Content
			class="animate-collapsible-up data-[expanded]:animate-collapsible-down"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

import { cn } from "@/lib/cn"
import { Accordion as AccordionPrimitive } from "@kobalte/core"
import type { Component, ParentComponent } from "solid-js"
import { splitProps } from "solid-js"

export const Accordion = AccordionPrimitive.Root

export const AccordionItem: Component<AccordionPrimitive.AccordionItemProps> = (
	props
) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<AccordionPrimitive.Item
			class={cn("border-b", local.class)}
			{...rest}
		/>
	)
}

export const AccordionTrigger: ParentComponent<
	AccordionPrimitive.AccordionTriggerProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class", "children"])
	return (
		<AccordionPrimitive.Header class="flex" as="div">
			<AccordionPrimitive.Trigger
				class={cn(
					"flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-expanded]>svg]:rotate-180 text-sm",
					local.class
				)}
				{...rest}
			>
				{local.children}
				<span class="icon-[tabler--chevron-down] h-4 w-4 text-muted-foreground transition-transform duration-200" />
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	)
}

export const AccordionContent: ParentComponent<
	AccordionPrimitive.AccordionContentProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class", "children"])
	return (
		<AccordionPrimitive.Content
			class={cn(
				"overflow-hidden text-sm animate-accordion-up data-[expanded]:animate-accordion-down",
				local.class
			)}
			{...rest}
		>
			<div class="pb-4 pt-0">{local.children}</div>
		</AccordionPrimitive.Content>
	)
}

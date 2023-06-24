import type { Component, ParentComponent } from "solid-js"
import { splitProps } from "solid-js"

import { Accordion as AccordionPrimitive } from "@kobalte/core"

export const Accordion = AccordionPrimitive.Root

export const AccordionItem: Component<AccordionPrimitive.AccordionItemProps> = (
	props
) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<AccordionPrimitive.Item
			class="border-b"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
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
				class="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-expanded]>i]:rotate-180 text-sm"
				classList={{
					[local.class!]: local.class !== undefined,
				}}
				{...rest}
			>
				{local.children}
				<i class="i-lucide:chevron-down text-muted-foreground transition-transform duration-200" />
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
			class="overflow-hidden text-sm animate-accordion-up data-[expanded]:animate-accordion-down"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		>
			<div class="pb-4 pt-0">{local.children}</div>
		</AccordionPrimitive.Content>
	)
}

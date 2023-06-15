import type { Component } from "solid-js"
import { splitProps } from "solid-js"

import { Accordion as AccordionPrimitive } from "@kobalte/core"

export const Accordion = AccordionPrimitive.Root

export const AccordionItem: Component<AccordionPrimitive.AccordionItemProps> = (
	props
) => {
	const [, rest] = splitProps(props, ["class"])
	return (
		<AccordionPrimitive.Item
			class="border-b"
			classList={{
				[props.class!]: props.class !== undefined,
			}}
			{...rest}
		/>
	)
}

export const AccordionTrigger: Component<
	AccordionPrimitive.AccordionTriggerProps
> = (props) => {
	const [, rest] = splitProps(props, ["class", "children"])
	return (
		<AccordionPrimitive.Header class="flex" as="div">
			<AccordionPrimitive.Trigger
				class="flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-expanded]>i]:rotate-180 bg-white"
				classList={{
					[props.class!]: props.class !== undefined,
				}}
				{...rest}
			>
				{props.children}
				<i class="i-lucide:chevron-down transition-transform duration-200" />
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	)
}

export const AccordionContent: Component<
	AccordionPrimitive.AccordionContentProps
> = (props) => {
	const [, rest] = splitProps(props, ["class", "children"])
	return (
		<AccordionPrimitive.Content
			class="overflow-hidden text-sm transition-all animate-accordion-up ui-expanded:animate-accordion-down"
			classList={{
				[props.class!]: props.class !== undefined,
			}}
			{...rest}
		>
			<div class="pb-4 pt-0">{props.children}</div>
		</AccordionPrimitive.Content>
	)
}

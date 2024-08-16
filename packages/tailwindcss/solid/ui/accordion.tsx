import { cn } from "@/libs/cn";
import type {
	AccordionContentProps,
	AccordionItemProps,
	AccordionTriggerProps,
} from "@kobalte/core/accordion";
import { Accordion as AccordionPrimitive } from "@kobalte/core/accordion";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { type ParentProps, type ValidComponent, splitProps } from "solid-js";

export const Accordion = AccordionPrimitive;

export type accordionItemProps<T extends ValidComponent = "div"> =
	AccordionItemProps<T> & {
		class?: string;
	};

export const AccordionItem = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, accordionItemProps<T>>,
) => {
	const [local, rest] = splitProps(props as accordionItemProps, ["class"]);

	return (
		<AccordionPrimitive.Item
			class={cn("border-b border-border", local.class)}
			{...rest}
		/>
	);
};

export type accordionTriggerProps<T extends ValidComponent = "button"> =
	ParentProps<
		AccordionTriggerProps<T> & {
			class?: string;
		}
	>;

export const AccordionTrigger = <T extends ValidComponent = "button">(
	props: PolymorphicProps<T, accordionTriggerProps<T>>,
) => {
	const [local, rest] = splitProps(props as accordionTriggerProps, [
		"class",
		"children",
	]);

	return (
		<AccordionPrimitive.Header class="flex">
			<AccordionPrimitive.Trigger
				class={cn(
					"flex flex-1 items-center justify-between py-3 text-sm font-medium border-none outline-none appearance-none transition-[outline-color,color] duration-300",
					"text-muted-foreground data-[expanded]:text-foreground",
					"focus-visible:text-foreground focus-visible:outline focus-visible:outline-[--at-outline] [--at-outline:theme(colors.blue.500)]",
					"[&>svg]:size-4 [&>svg]:transition-[transform,color] [&>svg]:duration-300 [&>svg]:text-muted-foreground [&>svg]:focus-visible:text-foreground [&>svg]:disabled:opacity-60 [&>svg]:hover:text-foreground [&[data-expanded]>svg]:text-foreground [&[data-expanded]>svg]:rotate-180",
					"[&:not(:disabled):hover]:text-foreground",
					"disabled:opacity-60 disabled:cursor-not-allowed",
					local.class,
				)}
				{...rest}
			>
				{local.children}
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m6 9l6 6l6-6"
					/>
					<title>Arrow</title>
				</svg>
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
};

export type accordionContentProps<T extends ValidComponent = "div"> =
	ParentProps<
		AccordionContentProps<T> & {
			class?: string;
		}
	>;

export const AccordionContent = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, accordionContentProps<T>>,
) => {
	const [local, rest] = splitProps(props as accordionContentProps, [
		"class",
		"children",
	]);

	return (
		<AccordionPrimitive.Content
			class={cn(
				"animate-accordion-up overflow-hidden text-sm data-[expanded]:animate-accordion-down",
				local.class,
			)}
			{...rest}
		>
			<div class="pb-3 pt-0">{local.children}</div>
		</AccordionPrimitive.Content>
	);
};

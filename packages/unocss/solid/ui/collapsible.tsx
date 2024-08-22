import { cn } from "@/libs/cn";
import type { CollapsibleContentProps } from "@kobalte/core/collapsible";
import { Collapsible as CollapsiblePrimitive } from "@kobalte/core/collapsible";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

export const Collapsible = CollapsiblePrimitive;

export const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

export type collapsibleContentProps<T extends ValidComponent = "div"> =
	CollapsibleContentProps<T> & {
		class?: string;
	};

export const CollapsibleContent = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, collapsibleContentProps<T>>,
) => {
	const [local, rest] = splitProps(props as collapsibleContentProps, ["class"]);

	return (
		<CollapsiblePrimitive.Content
			class={cn(
				"data-[closed]:(animate-out fade-out slide-out-t-1 animate-duration-300 ease-out) data-[expanded]:(animate-in fade-in-10 slide-in-t-2 animate-duration-300 ease-out)",
				local.class,
			)}
			{...rest}
		/>
	);
};

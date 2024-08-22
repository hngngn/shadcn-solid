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
				"data-[closed]:animate-out data-[closed]:fade-out data-[closed]:slide-out-to-top-1 data-[closed]:duration-300 data-[closed]:ease-out data-[expanded]:animate-in data-[expanded]:fade-in-10 data-[expanded]:slide-in-from-top-2 data-[expanded]:duration-300 data-[expanded]:ease-out",
				local.class,
			)}
			{...rest}
		/>
	);
};

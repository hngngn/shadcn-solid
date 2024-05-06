import { cn } from "@/libs/cn";
import * as CollapsiblePrimitive from "@kobalte/core/collapsible";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { type ValidComponent, splitProps } from "solid-js";

export const Collapsible = CollapsiblePrimitive.Root;

export const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

type CollapsibleContentProps = CollapsiblePrimitive.CollapsibleContentProps & {
  class?: string;
};

export const CollapsibleContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, CollapsibleContentProps>
) => {
  const [local, rest] = splitProps(props as CollapsibleContentProps, ["class"]);

  return (
    <CollapsiblePrimitive.Content
      class={cn("animate-collapsible-up data-[expanded]:animate-collapsible-down", local.class)}
      {...rest}
    />
  );
};

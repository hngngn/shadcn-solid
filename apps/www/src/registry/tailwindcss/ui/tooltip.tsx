import { cn } from "@/libs/cn";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import * as TooltipPrimitive from "@kobalte/core/tooltip";
import { type ValidComponent, mergeProps, splitProps } from "solid-js";

export const TooltipTrigger = TooltipPrimitive.Trigger;

export const Tooltip = (props: TooltipPrimitive.TooltipRootProps) => {
  const merge = mergeProps<TooltipPrimitive.TooltipRootProps[]>({ gutter: 4 }, props);

  return <TooltipPrimitive.Root {...merge} />;
};

type TooltipContentProps = TooltipPrimitive.TooltipContentProps & {
  class?: string;
};

export const TooltipContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, TooltipContentProps>
) => {
  const [local, rest] = splitProps(props as TooltipContentProps, ["class"]);

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        class={cn(
          "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95",
          local.class
        )}
        {...rest}
      />
    </TooltipPrimitive.Portal>
  );
};

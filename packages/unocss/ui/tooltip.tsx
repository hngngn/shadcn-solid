import { cn } from "@/libs/cn";
import { Tooltip as TooltipPrimitive } from "@kobalte/core";
import { mergeProps, splitProps } from "solid-js";

export const TooltipTrigger = TooltipPrimitive.Trigger;

export const Tooltip = (props: TooltipPrimitive.TooltipRootProps) => {
  const merge = mergeProps<TooltipPrimitive.TooltipRootProps[]>({ gutter: 4 }, props);

  return <TooltipPrimitive.Root {...merge} />;
};

export const TooltipContent = (props: TooltipPrimitive.TooltipContentProps) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        class={cn(
          "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground data-[expanded]:(animate-in fade-in-0 zoom-in-95) data-[closed]:(animate-out fade-out-0 zoom-out-95)",
          local.class
        )}
        {...rest}
      />
    </TooltipPrimitive.Portal>
  );
};

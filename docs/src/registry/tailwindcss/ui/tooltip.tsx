import { mergeProps, splitProps, type ValidComponent } from "solid-js"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import {
  Tooltip as TooltipPrimitive,
  type TooltipContentProps,
  type TooltipRootProps,
} from "@kobalte/core/tooltip"

import { cn } from "@/registry/tailwindcss/libs/cn"

export const TooltipTrigger = TooltipPrimitive.Trigger

export const Tooltip = (props: TooltipRootProps) => {
  const merge = mergeProps<TooltipRootProps[]>(
    {
      gutter: 4,
      flip: false,
    },
    props
  )

  return <TooltipPrimitive {...merge} />
}

type tooltipContentProps<T extends ValidComponent = "div"> =
  TooltipContentProps<T> & {
    class?: string
  }

export const TooltipContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, tooltipContentProps<T>>
) => {
  const [local, rest] = splitProps(props as tooltipContentProps, ["class"])

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        class={cn(
          "bg-primary text-primary-foreground data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs",
          local.class
        )}
        {...rest}
      />
    </TooltipPrimitive.Portal>
  )
}

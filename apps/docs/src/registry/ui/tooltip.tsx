import type { ComponentProps, ValidComponent } from "solid-js"
import { mergeProps, splitProps } from "solid-js"
import { Tooltip as TooltipPrimitive } from "@kobalte/core/tooltip"

import { cx } from "@/registry/lib/cva"

export type TooltipProps = ComponentProps<typeof TooltipPrimitive>

export const TooltipPortal = TooltipPrimitive.Portal

export const Tooltip = (props: TooltipProps) => {
  const merge = mergeProps<TooltipProps[]>(
    {
      closeDelay: 0,
      openDelay: 0,
      placement: "top",
    },
    props,
  )

  return <TooltipPrimitive data-slot="tooltip" {...merge} />
}

export type TooltipTriggerProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof TooltipPrimitive.Trigger<T>>

export const TooltipTrigger = <T extends ValidComponent = "button">(
  props: TooltipTriggerProps<T>,
) => {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

export type TooltipContentProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof TooltipPrimitive.Content<T>>

export const TooltipContent = <T extends ValidComponent = "button">(
  props: TooltipContentProps<T>,
) => {
  const [, rest] = splitProps(props as TooltipContentProps, [
    "class",
    "children",
  ])

  return (
    <TooltipPrimitive.Content
      data-slot="tooltip-content"
      class={cx(
        "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95 z-50 w-fit origin-(--kb-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        "[[data-popper-positioner][style*='--kb-popper-content-transform-origin:_top']>[data-slot=tooltip-content]]:slide-in-from-top-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_bottom']>[data-slot=tooltip-content]]:slide-in-from-bottom-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_left']>[data-slot=tooltip-content]]:slide-in-from-left-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_right']>[data-slot=tooltip-content]]:slide-in-from-right-2",
        props.class,
      )}
      {...rest}
    >
      <TooltipPrimitive.Arrow
        style={{
          height: "calc(var(--spacing) * 4)",
          width: "calc(var(--spacing) * 4)",
        }}
      />
      {props.children}
    </TooltipPrimitive.Content>
  )
}

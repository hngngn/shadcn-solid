import type { ComponentProps, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"
import { HoverCard as HoverCardPrimitive } from "@kobalte/core/hover-card"

import { cx } from "@/registry/lib/cva"

export const HoverCardPortal = HoverCardPrimitive.Portal

export type HoverCardProps = ComponentProps<typeof HoverCardPrimitive>

export const HoverCard = (props: HoverCardProps) => {
  return <HoverCardPrimitive data-slot="hover-card" {...props} />
}

export type HoverCardTriggerProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof HoverCardPrimitive.Trigger<T>>

export const HoverCardTrigger = <T extends ValidComponent = "button">(
  props: HoverCardTriggerProps<T>,
) => {
  return (
    <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
  )
}

export type HoverCardContentProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof HoverCardPrimitive.Content<T>>

export const HoverCardContent = <T extends ValidComponent = "div">(
  props: HoverCardContentProps<T>,
) => {
  const [, rest] = splitProps(props as HoverCardContentProps, ["class"])

  return (
    <HoverCardPrimitive.Content
      data-slot="hover-card-content"
      class={cx(
        "bg-popover text-popover-foreground data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 z-50 w-64 origin-(--kb-hovercard-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        "[[data-popper-positioner][style*='--kb-popper-content-transform-origin:_top']>[data-slot=hover-card-content]]:slide-in-from-top-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_bottom']>[data-slot=hover-card-content]]:slide-in-from-bottom-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_left']>[data-slot=hover-card-content]]:slide-in-from-left-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_right']>[data-slot=hover-card-content]]:slide-in-from-right-2",
        props.class,
      )}
      {...rest}
    />
  )
}

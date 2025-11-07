import type { ComponentProps, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"
import { HoverCard as HoverCardPrimitive } from "@kobalte/core/hover-card"
import { usePopperContext } from "@kobalte/core/popper"

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

  const context = usePopperContext()

  return (
    <HoverCardPrimitive.Content
      data-slot="hover-card-content"
      class={cx(
        "bg-popover text-popover-foreground origin-(--kb-hovercard-content-transform-origin) outline-hidden z-50 w-64 rounded-md border p-4 shadow-md",
        "data-[expanded]:(animate-in fade-in-0 zoom-in-95)",
        "data-[closed]:(animate-out fade-out-0 zoom-out-95)",
        context.currentPlacement().includes("top") && "slide-in-from-bottom-2",
        context.currentPlacement().includes("bottom") && "slide-in-from-top-2",
        context.currentPlacement().includes("left") && "slide-in-from-right-2",
        context.currentPlacement().includes("right") && "slide-in-from-left-2",
        props.class,
      )}
      {...rest}
    />
  )
}

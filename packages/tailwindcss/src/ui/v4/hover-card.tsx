import type { ComponentProps, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"
import { HoverCard as HoverCardPrimitive } from "@kobalte/core/hover-card"

import { cx } from "@repo/tailwindcss/utils/cva"

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
  const [local, rest] = splitProps(props as HoverCardContentProps, ["class"])

  return (
    <HoverCardPrimitive.Content
      data-slot="hover-card-content"
      class={cx(
        "bg-popover text-popover-foreground data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 origin-(--kb-hovercard-content-transform-origin) outline-hidden z-50 w-64 rounded-md border p-4 shadow-md",
        local.class,
      )}
      {...rest}
    />
  )
}

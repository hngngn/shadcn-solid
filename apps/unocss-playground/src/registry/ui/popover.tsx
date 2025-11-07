import {
  mergeProps,
  splitProps,
  type ComponentProps,
  type ValidComponent,
} from "solid-js"
import { Popover as PopoverPrimitive } from "@kobalte/core/popover"
import { usePopperContext } from "@kobalte/core/popper"

import { cx } from "@/registry/lib/cva"

export const PopoverPortal = PopoverPrimitive.Portal

export type PopoverProps = ComponentProps<typeof PopoverPrimitive>

export const Popover = (props: PopoverProps) => {
  const merge = mergeProps<PopoverProps[]>(
    {
      gutter: 4,
    },
    props,
  )

  return <PopoverPrimitive data-slot="popover" {...merge} />
}

export type PopoverTriggerProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof PopoverPrimitive.Trigger<T>>

export const PopoverTrigger = <T extends ValidComponent = "button">(
  props: PopoverTriggerProps<T>,
) => {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

export type PopoverContentProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof PopoverPrimitive.Content<T>>

export const PopoverContent = <T extends ValidComponent = "div">(
  props: PopoverContentProps<T>,
) => {
  const [, rest] = splitProps(props as PopoverContentProps, ["class"])

  const context = usePopperContext()

  return (
    <PopoverPrimitive.Content
      data-slot="popover-content"
      class={cx(
        "bg-popover text-popover-foreground origin-(--kb-popover-content-transform-origin) outline-hidden z-50 w-72 rounded-md border p-4 shadow-md",
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

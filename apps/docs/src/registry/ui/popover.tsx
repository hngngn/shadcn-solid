import {
  mergeProps,
  splitProps,
  type ComponentProps,
  type ValidComponent,
} from "solid-js"
import { Popover as PopoverPrimitive } from "@kobalte/core/popover"

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

  return (
    <PopoverPrimitive.Content
      data-slot="popover-content"
      class={cx(
        "bg-popover text-popover-foreground data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 z-50 w-72 origin-(--kb-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        "[[data-popper-positioner][style*='--kb-popper-content-transform-origin:_top']>[data-slot=popover-content]]:slide-in-from-top-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_bottom']>[data-slot=popover-content]]:slide-in-from-bottom-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_left']>[data-slot=popover-content]]:slide-in-from-left-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_right']>[data-slot=popover-content]]:slide-in-from-right-2",
        props.class,
      )}
      {...rest}
    />
  )
}

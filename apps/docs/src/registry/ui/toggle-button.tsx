import { splitProps, type ComponentProps, type ValidComponent } from "solid-js"
import { ToggleButton as ToggleButtonPrimitive } from "@kobalte/core/toggle-button"
import type { VariantProps } from "cva"

import { cva } from "@/registry/lib/cva"

export const toggleButtonVariants = cva({
  base: "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[pressed]:bg-accent data-[pressed]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,background-color,box-shadow] whitespace-nowrap",
  variants: {
    variant: {
      default: "bg-transparent",
      outline:
        "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
    },
    size: {
      default: "h-9 px-2 min-w-9",
      sm: "h-8 px-1.5 min-w-8",
      lg: "h-10 px-2.5 min-w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export type ToggleButtonProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof ToggleButtonPrimitive<T>> &
    VariantProps<typeof toggleButtonVariants>

export const ToggleButton = <T extends ValidComponent = "button">(
  props: ToggleButtonProps<T>,
) => {
  const [, rest] = splitProps(props as ToggleButtonProps, [
    "class",
    "variant",
    "size",
  ])

  return (
    <ToggleButtonPrimitive
      data-slot="toggle"
      class={toggleButtonVariants({
        variant: props.variant,
        size: props.size,
        class: props.class,
      })}
      {...rest}
    />
  )
}

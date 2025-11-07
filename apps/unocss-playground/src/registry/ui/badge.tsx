import type { ComponentProps, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"
import { Badge as BadgePrimitive } from "@kobalte/core/badge"
import type { VariantProps } from "cva"

import { cva } from "@/registry/lib/cva"

export const badgeVariants = cva({
  base: [
    "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 transition-[color,box-shadow] overflow-hidden",
    "aria-[invalid]:(ring-destructive/20 dark:ring-destructive/40 border-destructive)",
    "[&>svg]:(size-3 pointer-events-none)",
    "focus-visible:(border-ring ring-ring/50 ring-[3px])",
  ],
  variants: {
    variant: {
      default:
        "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
      secondary:
        "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
      destructive:
        "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 dark:bg-destructive/60 focus-visible:(ring-destructive/20 dark:ring-destructive/40)",
      outline: "text-foreground [a&]:hover:(bg-accent text-accent-foreground)",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type BadgeProps<T extends ValidComponent = "span"> = ComponentProps<
  typeof BadgePrimitive<T>
> &
  VariantProps<typeof badgeVariants>

export const Badge = <T extends ValidComponent = "span">(
  props: BadgeProps<T>,
) => {
  const [, rest] = splitProps(props as BadgeProps, ["class", "variant"])

  return (
    <BadgePrimitive
      data-slot="badge"
      class={badgeVariants({
        variant: props.variant,
        class: props.class,
      })}
      {...rest}
    />
  )
}

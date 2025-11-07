import type { ComponentProps, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"
import { Root as ButtonPrimitive } from "@kobalte/core/button"
import type { VariantProps } from "cva"

import { cva } from "@/registry/lib/cva"

export const buttonVariants = cva({
  base: [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all [&_svg:not([class*=size-])]:size-4 shrink-0 outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
    "aria-[invalid]:ring-destructive/20 aria-[invalid]:dark:ring-destructive/40 aria-[invalid]:border-destructive",
  ],

  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive:
        "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 focus-visible:dark:ring-destructive/40 dark:bg-destructive/60",
      outline:
        "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground hover:dark:bg-input/50 dark:bg-input/30 dark:border-input",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost:
        "hover:bg-accent hover:text-accent-foreground hover:dark:bg-accent/50",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "h-9 px-4 py-2 has-[>svg]:px-3",
      sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
      lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
      icon: "size-9",
      "icon-sm": "size-8",
      "icon-lg": "size-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export type ButtonProps<T extends ValidComponent = "button"> = ComponentProps<
  typeof ButtonPrimitive<T>
> &
  VariantProps<typeof buttonVariants>

export const Button = <T extends ValidComponent = "button">(
  props: ButtonProps<T>,
) => {
  const [, rest] = splitProps(props as ButtonProps, [
    "class",
    "variant",
    "size",
  ])

  return (
    <ButtonPrimitive
      data-slot="button"
      class={buttonVariants({
        variant: props.variant,
        size: props.size,
        class: props.class,
      })}
      {...rest}
    />
  )
}

import { splitProps, type ValidComponent } from "solid-js"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import {
  ToggleButton as ToggleButtonPrimitive,
  type ToggleButtonRootProps,
} from "@kobalte/core/toggle-button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/registry/tailwindcss/libs/cn"

export const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-[box-shadow,color,background-color] hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[pressed]:bg-accent data-[pressed]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2",
        lg: "h-10 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type toggleButtonProps<T extends ValidComponent = "button"> =
  ToggleButtonRootProps<T> &
    VariantProps<typeof toggleVariants> & {
      class?: string
    }

export const ToggleButton = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, toggleButtonProps<T>>
) => {
  const [local, rest] = splitProps(props as toggleButtonProps, [
    "class",
    "variant",
    "size",
  ])

  return (
    <ToggleButtonPrimitive
      class={cn(
        toggleVariants({ variant: local.variant, size: local.size }),
        local.class
      )}
      {...rest}
    />
  )
}

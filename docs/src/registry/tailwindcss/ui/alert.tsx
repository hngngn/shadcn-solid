import { splitProps, type ComponentProps, type ValidComponent } from "solid-js"
import {
  Alert as AlertPrimitive,
  type AlertRootProps,
} from "@kobalte/core/alert"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/registry/tailwindcss/libs/cn"

export const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&:has(svg)]:pl-11 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type alertProps<T extends ValidComponent = "div"> = AlertRootProps<T> &
  VariantProps<typeof alertVariants> & {
    class?: string
  }

export const Alert = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, alertProps<T>>
) => {
  const [local, rest] = splitProps(props as alertProps, ["class", "variant"])

  return (
    <AlertPrimitive
      class={cn(
        alertVariants({
          variant: props.variant,
        }),
        local.class
      )}
      {...rest}
    />
  )
}

export const AlertTitle = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      class={cn("font-medium leading-5 tracking-tight", local.class)}
      {...rest}
    />
  )
}

export const AlertDescription = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div class={cn("text-sm [&_p]:leading-relaxed", local.class)} {...rest} />
  )
}

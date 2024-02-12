import { cn } from "@/lib/cn"
import { Alert as AlertPrimitive } from "@kobalte/core"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import type { ComponentProps, ParentComponent } from "solid-js"
import { splitProps } from "solid-js"

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

export const Alert: ParentComponent<
  AlertPrimitive.AlertRootProps & VariantProps<typeof alertVariants>
> = (props) => {
  const [local, rest] = splitProps(props, ["class", "variant"])

  return (
    <AlertPrimitive.Root
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

export const AlertTitle: ParentComponent<ComponentProps<"div">> = (props) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      class={cn("font-medium leading-5 tracking-tight", local.class)}
      {...rest}
    />
  )
}

export const AlertDescription: ParentComponent<ComponentProps<"div">> = (
  props
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div class={cn("text-sm [&_p]:leading-relaxed", local.class)} {...rest} />
  )
}

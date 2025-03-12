import {
  mergeProps,
  splitProps,
  type ComponentProps,
  type ValidComponent,
  type VoidComponent,
  type VoidProps,
} from "solid-js"
import { Portal } from "solid-js/web"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import {
  Toast as ToastPrimitive,
  type ToastDescriptionProps,
  type ToastListProps,
  type ToastRegionProps,
  type ToastRootProps,
  type ToastTitleProps,
} from "@kobalte/core/toast"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/libs/cn"

export const toastVariants = cva(
  "group pointer-events-auto relative flex flex-col gap-3 w-full items-center justify-between overflow-hidden rounded-md border p-4 pr-6 shadow-lg data-[swipe=cancel]:translate-y-0 data-[swipe=end]:(translate-y-[var(--kb-toast-swipe-end-y)] animate-out) data-[swipe=move]:(translate-y-[--kb-toast-swipe-move-y] transition-none) data-[opened]:(animate-in slide-in-from-top-full sm:slide-in-from-bottom-full) data-[closed]:(animate-out fade-out-80 slide-out-to-top-full sm:slide-out-to-bottom-full)",
  {
    variants: {
      variant: {
        default: "border bg-background",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type toastProps<T extends ValidComponent = "li"> = ToastRootProps<T> &
  VariantProps<typeof toastVariants> & {
    class?: string
  }

export const Toast = <T extends ValidComponent = "li">(
  props: PolymorphicProps<T, toastProps<T>>
) => {
  const [local, rest] = splitProps(props as toastProps, ["class", "variant"])

  return (
    <ToastPrimitive
      class={cn(toastVariants({ variant: local.variant }), local.class)}
      {...rest}
    />
  )
}

type toastTitleProps<T extends ValidComponent = "div"> = ToastTitleProps<T> & {
  class?: string
}

export const ToastTitle = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, toastTitleProps<T>>
) => {
  const [local, rest] = splitProps(props as toastTitleProps, ["class"])

  return (
    <ToastPrimitive.Title
      class={cn("text-sm font-semibold [&+div]:text-xs", local.class)}
      {...rest}
    />
  )
}

type toastDescriptionProps<T extends ValidComponent = "div"> =
  ToastDescriptionProps<T> & {
    class?: string
  }

export const ToastDescription = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, toastDescriptionProps<T>>
) => {
  const [local, rest] = splitProps(props as toastDescriptionProps, ["class"])

  return (
    <ToastPrimitive.Description
      class={cn("text-sm opacity-90", local.class)}
      {...rest}
    />
  )
}

type toastRegionProps<T extends ValidComponent = "div"> =
  ToastRegionProps<T> & {
    class?: string
  }

export const ToastRegion = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, toastRegionProps<T>>
) => {
  const merge = mergeProps<toastRegionProps[]>(
    {
      swipeDirection: "down",
    },
    props
  )

  return (
    <Portal>
      <ToastPrimitive.Region {...merge} />
    </Portal>
  )
}

type toastListProps<T extends ValidComponent = "ol"> = VoidProps<
  ToastListProps<T> & {
    class?: string
  }
>

export const ToastList = <T extends ValidComponent = "ol">(
  props: PolymorphicProps<T, toastListProps<T>>
) => {
  const [local, rest] = splitProps(props as toastListProps, ["class"])

  return (
    <ToastPrimitive.List
      class={cn(
        "sm:(bottom-0 flex-col) fixed right-0 top-0 top-auto z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 md:max-w-[420px]",
        local.class
      )}
      {...rest}
    />
  )
}

export const ToastContent = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class", "children"])

  return (
    <div class={cn("flex w-full flex-col", local.class)} {...rest}>
      <div>{local.children}</div>
      <ToastPrimitive.CloseButton class="text-foreground/50 hover:text-foreground focus:(opacity-100 outline-none) group-[.destructive]:(text-red-300 hover:text-red-50) absolute right-1 top-1 rounded-md bg-inherit p-1 opacity-0 transition-opacity group-hover:opacity-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M18 6L6 18M6 6l12 12"
          />
          <title>Close</title>
        </svg>
      </ToastPrimitive.CloseButton>
    </div>
  )
}

export const ToastProgress: VoidComponent = () => {
  return (
    <ToastPrimitive.ProgressTrack class="bg-primary/20 group-[.destructive]:bg-background/20 h-1 w-full overflow-hidden rounded-xl">
      <ToastPrimitive.ProgressFill class="bg-primary group-[.destructive]:bg-destructive-foreground h-full w-[--kb-toast-progress-fill-width] transition-all duration-150 ease-linear" />
    </ToastPrimitive.ProgressTrack>
  )
}

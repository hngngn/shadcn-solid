import {
  splitProps,
  type ComponentProps,
  type ParentProps,
  type ValidComponent,
} from "solid-js"
import {
  Dialog as DialogPrimitive,
  type DialogContentProps,
  type DialogDescriptionProps,
  type DialogTitleProps,
} from "@kobalte/core/dialog"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"

import { cn } from "@/libs/cn"

export const Dialog = DialogPrimitive
export const DialogTrigger = DialogPrimitive.Trigger

type dialogContentProps<T extends ValidComponent = "div"> = ParentProps<
  DialogContentProps<T> & {
    class?: string
  }
>

export const DialogContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, dialogContentProps<T>>
) => {
  const [local, rest] = splitProps(props as dialogContentProps, [
    "class",
    "children",
  ])

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        class={cn(
          "bg-background/80 data-[expanded]:(animate-in fade-in-0) data-[closed]:(animate-out fade-out-0) fixed inset-0 z-50"
        )}
        {...rest}
      />
      <DialogPrimitive.Content
        class={cn(
          "bg-background data-[expanded]:(animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-48% duration-200) data-[closed]:(animate-out fade-out-0 zoom-out-95 slide-out-to-left-1/2 slide-out-to-top-48% duration-200) fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg md:w-full",
          local.class
        )}
        {...rest}
      >
        {local.children}
        <DialogPrimitive.CloseButton class="ring-offset-background focus:(outline-none ring-1.5 ring-ring ring-offset-2) transition-property-[opacity,box-shadow] absolute right-4 top-4 rounded-sm bg-inherit opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="h-4 w-4"
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
        </DialogPrimitive.CloseButton>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

type dialogTitleProps<T extends ValidComponent = "h2"> = DialogTitleProps<T> & {
  class?: string
}

export const DialogTitle = <T extends ValidComponent = "h2">(
  props: PolymorphicProps<T, dialogTitleProps<T>>
) => {
  const [local, rest] = splitProps(props as dialogTitleProps, ["class"])

  return (
    <DialogPrimitive.Title
      class={cn("text-foreground text-lg font-semibold", local.class)}
      {...rest}
    />
  )
}

type dialogDescriptionProps<T extends ValidComponent = "p"> =
  DialogDescriptionProps<T> & {
    class?: string
  }

export const DialogDescription = <T extends ValidComponent = "p">(
  props: PolymorphicProps<T, dialogDescriptionProps<T>>
) => {
  const [local, rest] = splitProps(props as dialogDescriptionProps, ["class"])

  return (
    <DialogPrimitive.Description
      class={cn("text-muted-foreground text-sm", local.class)}
      {...rest}
    />
  )
}

export const DialogHeader = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      class={cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        local.class
      )}
      {...rest}
    />
  )
}

export const DialogFooter = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      class={cn(
        "sm:(flex-row space-x-2) flex flex-col-reverse justify-end",
        local.class
      )}
      {...rest}
    />
  )
}

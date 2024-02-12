import { cn } from "@/lib/cn"
import { Dialog as DialogPrimitive } from "@kobalte/core"
import type { ComponentProps, ParentComponent } from "solid-js"
import { splitProps } from "solid-js"

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger

export const DialogOverlay: ParentComponent<
  DialogPrimitive.DialogOverlayProps
> = (props) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <DialogPrimitive.Overlay
      class={cn(
        "bg-background/80 data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 fixed inset-0 z-50 backdrop-blur-sm",
        local.class
      )}
      {...rest}
    />
  )
}

export const DialogContent: ParentComponent<
  DialogPrimitive.DialogContentProps
> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"])

  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <div class="fixed inset-0 z-50 flex items-center justify-center">
        <DialogPrimitive.Content
          class={cn(
            "bg-background data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 data-[closed]:slide-out-to-left-1/2 data-[closed]:slide-out-to-top-[48%] data-[expanded]:slide-in-from-left-1/2 data-[expanded]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg md:w-full",
            local.class
          )}
          {...rest}
        >
          {local.children}
          <DialogPrimitive.CloseButton class="ring-offset-background focus:ring-ring absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
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
            </svg>
            <span class="sr-only">Close</span>
          </DialogPrimitive.CloseButton>
        </DialogPrimitive.Content>
      </div>
    </DialogPrimitive.Portal>
  )
}

export const DialogTitle: ParentComponent<DialogPrimitive.DialogTitleProps> = (
  props
) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <DialogPrimitive.Title
      class={cn("text-foreground text-lg font-semibold", local.class)}
      {...rest}
    />
  )
}

export const DialogDescription: ParentComponent<
  DialogPrimitive.DialogDescriptionProps
> = (props) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <DialogPrimitive.Description
      class={cn("text-muted-foreground text-sm", local.class)}
      {...rest}
    />
  )
}

export const DialogHeader: ParentComponent<ComponentProps<"div">> = (props) => {
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

export const DialogFooter: ParentComponent<ComponentProps<"div">> = (props) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        local.class
      )}
      {...rest}
    />
  )
}

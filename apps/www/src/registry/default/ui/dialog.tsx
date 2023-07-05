import { cn } from "@/lib/cn"
import { Dialog as DialogPrimitive } from "@kobalte/core"
import { IconX } from "@tabler/icons-solidjs"
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
                "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0",
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
            <div class="fixed inset-0 z-50 flex justify-center items-center">
                <DialogPrimitive.Content
                    class={cn(
                        "grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg duration-200 data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 data-[closed]:slide-out-to-left-1/2 data-[closed]:slide-out-to-top-[48%] data-[expanded]:slide-in-from-left-1/2 data-[expanded]:slide-in-from-top-[48%] relative sm:rounded-lg md:w-full",
                        local.class
                    )}
                    {...rest}
                >
                    {local.children}
                    <DialogPrimitive.CloseButton class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
                        <IconX class="h-4 w-4" />
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
            class={cn("text-lg font-semibold text-foreground", local.class)}
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
            class={cn("text-sm text-muted-foreground", local.class)}
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

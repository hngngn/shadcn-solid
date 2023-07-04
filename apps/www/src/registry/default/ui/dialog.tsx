import { Dialog as DialogPrimitive } from "@kobalte/core"
import { IconX } from "@tabler/icons-solidjs"
import type { ComponentProps, ParentComponent } from "solid-js"
import { splitProps } from "solid-js"

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger

export const DialogOverlay: ParentComponent<
    DialogPrimitive.DialogOverlayProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])
    return (
        <DialogPrimitive.Overlay
            class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-fade-out data-[expanded]:animate-fade-in"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const DialogContent: ParentComponent<
    DialogPrimitive.DialogContentProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList", "children"])

    return (
        <DialogPrimitive.Portal>
            <DialogOverlay />
            <div class="fixed inset-0 z-50 flex justify-center items-center">
                <DialogPrimitive.Content
                    class="grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg animate-content-hide data-[expanded]:animate-content-show relative sm:rounded-lg md:w-full"
                    classList={{
                        [local.class!]: Boolean(local.class),
                        ...local.classList,
                    }}
                    {...rest}
                >
                    {local.children}
                    <DialogPrimitive.CloseButton class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:(outline-none ring-2 ring-ring ring-offset-2) disabled:pointer-events-none">
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
    const [local, rest] = splitProps(props, ["class", "classList"])
    return (
        <DialogPrimitive.Title
            class="text-lg font-semibold text-foreground"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const DialogDescription: ParentComponent<
    DialogPrimitive.DialogDescriptionProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])
    return (
        <DialogPrimitive.Description
            class="text-sm text-muted-foreground"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const DialogHeader: ParentComponent<ComponentProps<"div">> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])
    return (
        <div
            class="flex flex-col space-y-2 text-center sm:text-left"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const DialogFooter: ParentComponent<ComponentProps<"div">> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])
    return (
        <div
            class="flex flex-col-reverse sm:(flex-row justify-end space-x-2)"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

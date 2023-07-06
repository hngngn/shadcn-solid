import { cn } from "@/lib/cn"
import { Dialog as DialogPrimitive } from "@kobalte/core"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { TbX } from "solid-icons/tb"
import type { ComponentProps } from "solid-js"
import { mergeProps, splitProps, type ParentComponent } from "solid-js"

export const Sheet = DialogPrimitive.Root
export const SheetTrigger = DialogPrimitive.Trigger

export const SheetOverlay: ParentComponent<
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

export const sheetVariants = cva(
    "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:duration-300 data-[expanded]:duration-500",
    {
        variants: {
            side: {
                top: "inset-x-0 top-0 border-b data-[closed]:slide-out-to-top data-[expanded]:slide-in-from-top",
                bottom: "inset-x-0 bottom-0 border-t data-[closed]:slide-out-to-bottom data-[expanded]:slide-in-from-bottom",
                left: "inset-y-0 left-0 h-full w-3/4 border-r data-[closed]:slide-out-to-left data-[expanded]:slide-in-from-left sm:max-w-sm",
                right: "inset-y-0 right-0 h-full w-3/4 border-l data-[closed]:slide-out-to-right data-[expanded]:slide-in-from-right sm:max-w-sm",
            },
        },
        defaultVariants: {
            side: "right",
        },
    }
)

export const SheetContent: ParentComponent<
    DialogPrimitive.DialogContentProps & VariantProps<typeof sheetVariants>
> = (props) => {
    const merge = mergeProps(
        { side: "right" } as VariantProps<typeof sheetVariants>,
        props
    )
    const [local, rest] = splitProps(merge, ["class", "children", "side"])

    return (
        <DialogPrimitive.Portal>
            <SheetOverlay />
            <DialogPrimitive.Content
                class={sheetVariants({ side: local.side, class: local.class })}
                {...rest}
            >
                {local.children}
                <DialogPrimitive.CloseButton class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
                    <TbX class="h-4 w-4" />
                    <span class="sr-only">Close</span>
                </DialogPrimitive.CloseButton>
            </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
    )
}

export const SheetTitle: ParentComponent<DialogPrimitive.DialogTitleProps> = (
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

export const SheetDescription: ParentComponent<
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

export const SheetHeader: ParentComponent<ComponentProps<"div">> = (props) => {
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

export const SheetFooter: ParentComponent<ComponentProps<"div">> = (props) => {
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

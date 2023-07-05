import { AlertDialog as AlertDialogPrimitive } from "@kobalte/core"
import type { ComponentProps } from "solid-js"
import { splitProps, type ParentComponent } from "solid-js"
import { buttonVariants } from "./button"

export const AlertDialog = AlertDialogPrimitive.Root
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger

export const AlertDialogOverlay: ParentComponent<
    AlertDialogPrimitive.AlertDialogOverlayProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])
    return (
        <AlertDialogPrimitive.Overlay
            class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-fade-out data-[expanded]:animate-fade-in"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const AlertDialogContent: ParentComponent<
    AlertDialogPrimitive.AlertDialogContentProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])

    return (
        <AlertDialogPrimitive.Portal>
            <AlertDialogOverlay />
            <div class="fixed flex justify-center items-center inset-0 z-50">
                <AlertDialogPrimitive.Content
                    class="z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full animate-content-hide data-[expanded]:animate-content-show"
                    classList={{
                        [local.class!]: Boolean(local.class),
                        ...local.classList,
                    }}
                    {...rest}
                />
            </div>
        </AlertDialogPrimitive.Portal>
    )
}

export const AlertDialogHeader: ParentComponent<ComponentProps<"div">> = (
    props
) => {
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

export const AlertDialogFooter: ParentComponent<ComponentProps<"div">> = (
    props
) => {
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

export const AlertDialogTitle: ParentComponent<
    AlertDialogPrimitive.AlertDialogTitleProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])
    return (
        <AlertDialogPrimitive.Title
            class="text-lg font-semibold"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const AlertDialogDescription: ParentComponent<
    AlertDialogPrimitive.AlertDialogDescriptionProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])
    return (
        <AlertDialogPrimitive.Description
            class="text-sm text-muted-foreground"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const AlertDialogClose: ParentComponent<
    AlertDialogPrimitive.AlertDialogCloseButtonProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])
    return (
        <AlertDialogPrimitive.CloseButton
            class={`${buttonVariants({
                variant: "outline",
                class: " mt-2 sm:mt-0",
            })}`}
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const AlertDialogAction: ParentComponent<
    AlertDialogPrimitive.AlertDialogCloseButtonProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])
    return (
        <AlertDialogPrimitive.CloseButton
            class={buttonVariants()}
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

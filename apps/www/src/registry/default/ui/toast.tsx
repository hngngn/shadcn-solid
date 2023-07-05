import { cn } from "@/lib/cn"
import { Toast as ToastPrimitive } from "@kobalte/core"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { TbX } from "solid-icons/tb"
import type { ComponentProps, VoidComponent } from "solid-js"
import { mergeProps, splitProps, type ParentComponent } from "solid-js"
import { Portal } from "solid-js/web"

export const toastVariants = cva(
    "group pointer-events-auto relative flex w-full items-center justify-between overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-y-0 data-[swipe=end]:translate-y-[var(--kb-toast-swipe-end-y)] data-[swipe=move]:translate-y-[--kb-toast-swipe-move-y] data-[swipe=move]:transition-none data-[opened]:animate-in data-[closed]:animate-out data-[swipe=end]:animate-out data-[closed]:fade-out-80 data-[closed]:slide-out-to-right-full data-[opened]:slide-in-from-top-full data-[opened]:sm:slide-in-from-bottom-full",
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

export const Toast: ParentComponent<
    ToastPrimitive.ToastRootProps & VariantProps<typeof toastVariants>
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "variant"])

    return (
        <ToastPrimitive.Root
            class={cn(toastVariants({ variant: local.variant }), local.class)}
            {...rest}
        />
    )
}

export const ToastTitle: ParentComponent<ToastPrimitive.ToastTitleProps> = (
    props
) => {
    const [local, rest] = splitProps(props, ["class"])

    return (
        <ToastPrimitive.Title
            class={cn("text-sm font-semibold [&+div]:text-xs", local.class)}
            {...rest}
        />
    )
}

export const ToastDescription: ParentComponent<
    ToastPrimitive.ToastDescriptionProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class"])

    return (
        <ToastPrimitive.Description
            class={cn("text-sm opacity-90", local.class)}
            {...rest}
        />
    )
}

export const ToastRegion: ParentComponent<ToastPrimitive.ToastRegionProps> = (
    props
) => {
    const merge = mergeProps<ToastPrimitive.ToastRegionProps[]>(
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

export const ToastList: VoidComponent<ToastPrimitive.ToastListProps> = (
    props
) => {
    const [local, rest] = splitProps(props, ["class"])

    return (
        <ToastPrimitive.List
            class={cn(
                "fixed bottom-0 right-0 flex flex-col p-[16px] gap-[8px] w-[400px] max-w-full m-0 list-none z-50 outline-none",
                local.class
            )}
            {...rest}
        />
    )
}

export const ToastContent: ParentComponent<ComponentProps<"div">> = (props) => {
    const [local, rest] = splitProps(props, ["class", "children"])

    return (
        <div class={cn("w-full", local.class)} {...rest}>
            {local.children}
            <ToastPrimitive.CloseButton class="absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:(opacity-100 outline-none ring) group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:(ring-red-400 ring-offset-red-600)">
                <TbX class="h-4 w-4" />
            </ToastPrimitive.CloseButton>
        </div>
    )
}

export const ToastProgress: VoidComponent = () => {
    return (
        <ToastPrimitive.ProgressTrack class="w-full h-1 bg-primary/20 overflow-hidden rounded-xl group-[.destructive]:bg-background/20">
            <ToastPrimitive.ProgressFill class="bg-primary group-[.destructive]:bg-background h-full w-[--kb-toast-progress-fill-width] transition-all ease-linear duration-150" />
        </ToastPrimitive.ProgressTrack>
    )
}

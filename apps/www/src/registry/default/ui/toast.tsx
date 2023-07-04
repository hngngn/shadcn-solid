import { Toast as ToastPrimitive } from "@kobalte/core"
import { IconX } from "@tabler/icons-solidjs"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import type { ComponentProps, VoidComponent } from "solid-js"
import { mergeProps, splitProps, type ParentComponent } from "solid-js"
import { Portal } from "solid-js/web"

export const toastVariants = cva(
    "group pointer-events-auto relative flex w-full items-center justify-between overflow-hidden rounded-md border p-4 pr-6 shadow-lg data-[opened]:animate-slide-in data-[closed]:animate-slide-out data-[swipe=move]:translate-y-[--kb-toast-swipe-move-y] data-[swipe=cancel]:(translate-y-0 transition-transform duration-200 ease-out) data-[swipe=end]:animate-slide-out",
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
    const [local, rest] = splitProps(props, ["class", "classList", "variant"])

    return (
        <ToastPrimitive.Root
            class={toastVariants({ variant: local.variant })}
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const ToastTitle: ParentComponent<ToastPrimitive.ToastTitleProps> = (
    props
) => {
    const [local, rest] = splitProps(props, ["class", "classList"])

    return (
        <ToastPrimitive.Title
            class="text-sm font-semibold [&+div]:text-xs"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const ToastDescription: ParentComponent<
    ToastPrimitive.ToastDescriptionProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])

    return (
        <ToastPrimitive.Description
            class="text-sm opacity-90"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const ToastRegion: ParentComponent<ToastPrimitive.ToastRegionProps> = (
    props
) => {
    const merge = mergeProps(
        {
            swipeDirection: "down",
        } as ToastPrimitive.ToastRegionProps,
        props
    )
    const [local, rest] = splitProps(merge, ["class", "classList"])

    return (
        <Portal>
            <ToastPrimitive.Region
                classList={{
                    [local.class!]: Boolean(local.class),
                    ...local.classList,
                }}
                {...rest}
            />
        </Portal>
    )
}

export const ToastList: VoidComponent<ToastPrimitive.ToastListProps> = (
    props
) => {
    const [local, rest] = splitProps(props, ["class", "classList"])

    return (
        <ToastPrimitive.List
            class="fixed bottom-0 right-0 flex flex-col p-[--viewport-padding] gap-8px w-400px max-w-full m-0 list-none z-50 outline-none"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const ToastContent: ParentComponent<ComponentProps<"div">> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList", "children"])

    return (
        <div
            class="w-full"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        >
            {local.children}
            <ToastPrimitive.CloseButton class="absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:(opacity-100 outline-none ring) group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:(ring-red-400 ring-offset-red-600)">
                <IconX class="h-4 w-4" />
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

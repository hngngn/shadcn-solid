import { cn } from "@/lib/cn"
import { Tooltip as TooltipPrimitive } from "@kobalte/core"
import type { ParentComponent } from "solid-js"
import { mergeProps, splitProps } from "solid-js"

export const TooltipTrigger = TooltipPrimitive.Trigger

export const Tooltip: ParentComponent<TooltipPrimitive.TooltipRootProps> = (
    props
) => {
    const merge = mergeProps<TooltipPrimitive.TooltipRootProps[]>(
        { gutter: 4 },
        props
    )

    return <TooltipPrimitive.Root {...merge} />
}

export const TooltipContent: ParentComponent<
    TooltipPrimitive.TooltipContentProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class"])

    return (
        <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
                class={cn(
                    "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground data-[expanded:animate-in data-[expanded:fade-in-0 data-[expanded:zoom-in-95 data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95",
                    local.class
                )}
                {...rest}
            />
        </TooltipPrimitive.Portal>
    )
}

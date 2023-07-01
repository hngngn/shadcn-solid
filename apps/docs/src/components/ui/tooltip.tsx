import { Tooltip as TooltipPrimitive } from "@kobalte/core"
import type { ParentComponent } from "solid-js"
import { mergeProps, splitProps } from "solid-js"

export const TooltipTrigger = TooltipPrimitive.Trigger

export const Tooltip: ParentComponent<TooltipPrimitive.TooltipRootProps> = (
    props
) => {
    const merge = mergeProps(
        { gutter: 4 } as TooltipPrimitive.TooltipRootProps,
        props
    )

    return <TooltipPrimitive.Root {...merge} />
}

export const TooltipContent: ParentComponent<
    TooltipPrimitive.TooltipContentProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])

    return (
        <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
                class="z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground origin-[--kb-tooltip-content-transform-origin] animate-content-hide data-[expanded]:animate-content-show"
                classList={{
                    [local.class!]: Boolean(local.class),
                    ...local.classList,
                }}
                {...rest}
            />
        </TooltipPrimitive.Portal>
    )
}

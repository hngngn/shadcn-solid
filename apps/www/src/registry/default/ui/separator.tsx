import { cn } from "@/lib/cn"
import { Separator as SeparatorPrimitive } from "@kobalte/core"
import type { VoidComponent } from "solid-js"
import { splitProps } from "solid-js"

export const Separator: VoidComponent<SeparatorPrimitive.SeparatorRootProps> = (
    props
) => {
    const [local, rest] = splitProps(props, ["class"])
    return (
        <SeparatorPrimitive.Root
            class={cn(
                "shrink-0 bg-border data-[orientation=horizontal]:h-[1px] data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-[1px]",
                local.class
            )}
            {...rest}
        />
    )
}

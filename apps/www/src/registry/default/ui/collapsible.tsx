import { Collapsible as CollapsiblePrimitive } from "@kobalte/core"
import type { ParentComponent } from "solid-js"
import { splitProps } from "solid-js"

export const Collapsible = CollapsiblePrimitive.Root

export const CollapsibleTrigger = CollapsiblePrimitive.Trigger

export const CollapsibleContent: ParentComponent<
    CollapsiblePrimitive.CollapsibleContentProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])

    return (
        <CollapsiblePrimitive.Content
            class="animate-collapsible-up data-[expanded]:animate-collapsible-down"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

import { HoverCard as HoverCardPrimitive } from "@kobalte/core"
import { splitProps, type ParentComponent } from "solid-js"

export const HoverCard = HoverCardPrimitive.Root
export const HoverCardTrigger = HoverCardPrimitive.Trigger

export const HoverCardContent: ParentComponent<
    HoverCardPrimitive.HoverCardContentProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])
    return (
        <HoverCardPrimitive.Portal>
            <HoverCardPrimitive.Content
                class="z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none origin-[--kb-hovercard-content-transform-origin] animate-content-hide data-[expanded]:animate-content-show"
                classList={{
                    [local.class!]: Boolean(local.class),
                    ...local.classList,
                }}
                {...rest}
            />
        </HoverCardPrimitive.Portal>
    )
}

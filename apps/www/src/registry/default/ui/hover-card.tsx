import { cn } from "@/lib/cn"
import { HoverCard as HoverCardPrimitive } from "@kobalte/core"
import { splitProps, type ParentComponent } from "solid-js"

export const HoverCard = HoverCardPrimitive.Root
export const HoverCardTrigger = HoverCardPrimitive.Trigger

export const HoverCardContent: ParentComponent<
  HoverCardPrimitive.HoverCardContentProps
> = (props) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        class={cn(
          "bg-popover text-popover-foreground data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 z-50 w-64 rounded-md border p-4 shadow-md outline-none",
          local.class
        )}
        {...rest}
      />
    </HoverCardPrimitive.Portal>
  )
}

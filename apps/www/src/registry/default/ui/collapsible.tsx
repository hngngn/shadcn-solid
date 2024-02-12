import { cn } from "@/lib/cn"
import { Collapsible as CollapsiblePrimitive } from "@kobalte/core"
import type { ParentComponent } from "solid-js"
import { splitProps } from "solid-js"

export const Collapsible = CollapsiblePrimitive.Root

export const CollapsibleTrigger = CollapsiblePrimitive.Trigger

export const CollapsibleContent: ParentComponent<
  CollapsiblePrimitive.CollapsibleContentProps
> = (props) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <CollapsiblePrimitive.Content
      class={cn(
        "animate-collapsible-up data-[expanded]:animate-collapsible-down",
        local.class
      )}
      {...rest}
    />
  )
}

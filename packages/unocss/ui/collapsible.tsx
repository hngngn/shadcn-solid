import { splitProps, type ValidComponent } from "solid-js"
import {
  Collapsible as CollapsiblePrimitive,
  type CollapsibleContentProps,
} from "@kobalte/core/collapsible"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"

import { cn } from "@/libs/cn"

export const Collapsible = CollapsiblePrimitive

export const CollapsibleTrigger = CollapsiblePrimitive.Trigger

type collapsibleContentProps<T extends ValidComponent = "div"> =
  CollapsibleContentProps<T> & {
    class?: string
  }

export const CollapsibleContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, collapsibleContentProps<T>>
) => {
  const [local, rest] = splitProps(props as collapsibleContentProps, ["class"])

  return (
    <CollapsiblePrimitive.Content
      class={cn(
        "animate-collapsible-up data-[expanded]:animate-collapsible-down overflow-hidden",
        local.class
      )}
      {...rest}
    />
  )
}

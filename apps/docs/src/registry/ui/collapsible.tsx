import type { ComponentProps, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"
import { Collapsible as CollapsiblePrimitive } from "@kobalte/core/collapsible"

import { cx } from "@/registry/lib/cva"

export type CollapsibleProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof CollapsiblePrimitive<T>
>

export const Collapsible = <T extends ValidComponent = "div">(
  props: CollapsibleProps<T>,
) => {
  return <CollapsiblePrimitive data-slot="collapsible" {...props} />
}

export type CollapsibleTriggerProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof CollapsiblePrimitive.Trigger<T>>

export const CollapsibleTrigger = <T extends ValidComponent = "button">(
  props: CollapsibleTriggerProps<T>,
) => {
  return (
    <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
  )
}

export type CollapsibleContentProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof CollapsiblePrimitive.Content<T>>

export const CollapsibleContent = <T extends ValidComponent = "button">(
  props: CollapsibleContentProps<T>,
) => {
  const [, rest] = splitProps(props as CollapsibleContentProps, ["class"])

  return (
    <CollapsiblePrimitive.Content
      data-slot="collapsible-content"
      class={cx(
        "data-[closed]:animate-collapsible-up data-[expanded]:animate-collapsible-down overflow-hidden",
        props.class,
      )}
      {...rest}
    />
  )
}

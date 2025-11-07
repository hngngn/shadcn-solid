import type { ComponentProps, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"
import { SegmentedControl as SegmentedControlPrimitive } from "@kobalte/core/segmented-control"

import { cx } from "@/registry/lib/cva"

export type SegmentedControlProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof SegmentedControlPrimitive<T>>

export const SegmentedControl = <T extends ValidComponent = "div">(
  props: SegmentedControlProps<T>,
) => {
  const [, rest] = splitProps(props as SegmentedControlProps, ["class"])

  return (
    <SegmentedControlPrimitive
      data-slot="segmented-control"
      class={cx("group/segmented_control flex flex-col gap-2", props.class)}
      {...rest}
    />
  )
}

export type SegmentedControlItemInputProps<T extends ValidComponent = "input"> =
  ComponentProps<typeof SegmentedControlPrimitive.ItemInput<T>>

export const SegmentedControlItemInput = <T extends ValidComponent = "input">(
  props: SegmentedControlItemInputProps<T>,
) => {
  return (
    <SegmentedControlPrimitive.ItemInput
      data-slot="segmented-control-item-input"
      {...props}
    />
  )
}

export type SegmentedControlItemLabelProps<T extends ValidComponent = "label"> =
  ComponentProps<typeof SegmentedControlPrimitive.ItemLabel<T>>

export const SegmentedControlItemLabel = <T extends ValidComponent = "label">(
  props: SegmentedControlItemLabelProps<T>,
) => {
  const [, rest] = splitProps(props as SegmentedControlItemLabelProps, [
    "class",
  ])

  return (
    <SegmentedControlPrimitive.ItemLabel
      data-slot="segmented-control-item-label"
      class={cx(
        "text-foreground relative flex select-none flex-nowrap place-content-center whitespace-nowrap px-2 py-1 text-sm font-medium transition-[color,opacity]",
        "dark:(text-muted-foreground data-[checked]:text-foreground)",
        "data-[disabled]:(pointer-events-none opacity-50)",
        props.class,
      )}
      {...rest}
    />
  )
}

export type SegmentedControlIndicatorProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof SegmentedControlPrimitive.Indicator<T>>

export const SegmentedControlIndicator = <T extends ValidComponent = "div">(
  props: SegmentedControlIndicatorProps<T>,
) => {
  const [, rest] = splitProps(props as SegmentedControlIndicatorProps, [
    "class",
  ])

  return (
    <SegmentedControlPrimitive.Indicator
      data-slot="segmented-control-indicator"
      class={cx(
        "bg-background absolute left-[3px] top-[3px] rounded-md border border-transparent shadow-sm transition-[width,height,transform]",
        "dark:(border-input bg-input/30)",
        "group-[[data-invalid]]/segmented_control:(border-destructive dark:border-destructive)",
        props.class,
      )}
      {...rest}
    />
  )
}

export type SegmentedControlItemProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof SegmentedControlPrimitive.Item<T>>

export const SegmentedControlItem = <T extends ValidComponent = "div">(
  props: SegmentedControlItemProps<T>,
) => {
  const [, rest] = splitProps(props as SegmentedControlItemProps, ["class"])

  return (
    <SegmentedControlPrimitive.Item
      data-slot="segmented-control-item"
      class={cx(
        "relative",
        "not-first-of-type:before:(absolute inset-0 content-[''] bg-input transition-opacity duration-200)",
        "group-[[aria-orientation=horizontal]]/segmented_control:not-first-of-type:before:inset-y-2 group-[[aria-orientation=horizontal]]/segmented_control:not-first-of-type:before:inset-x-0 group-[[aria-orientation=horizontal]]/segmented_control:not-first-of-type:before:w-px group-[[aria-orientation=horizontal]]/segmented_control:not-first-of-type:before:translate-x-[calc(-1*1px/2)]",
        "group-[[aria-orientation=vertical]]/segmented_control:not-first-of-type:before:inset-x-2 group-[[aria-orientation=vertical]]/segmented_control:not-first-of-type:before:inset-y-0 group-[[aria-orientation=vertical]]/segmented_control:not-first-of-type:before:h-px group-[[aria-orientation=vertical]]/segmented_control:not-first-of-type:before:translate-y-[calc(-1*1px/2)]",
        "has-[[data-slot=segmented-control-item-input]:checked]:before:opacity-0 [&+::before]:has-[[data-slot=segmented-control-item-input]:checked]:opacity-0",
        props.class,
      )}
      {...rest}
    />
  )
}

export type SegmentedControlListProps = ComponentProps<"div">

export const SegmentedControlList = (props: SegmentedControlListProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="segmented-control-list"
      role="presentation"
      class={cx(
        "bg-muted text-muted-foreground relative h-full w-fit rounded-lg",
        "has-[[data-slot=segmented-control-item-input]:focus-visible]:[&_[data-slot=segmented-control-indicator]]:(ring-ring/50 outline-ring outline-1 ring-[3px])",
        "group-[[data-invalid]]/segmented_control:has-[[data-slot=segmented-control-item-input]:focus-visible]:[&_[data-slot=segmented-control-indicator]]:(ring-destructive/20 dark:ring-destructive/40)",
        props.class,
      )}
      {...rest}
    />
  )
}

export type SegmentedControlItemsProps = ComponentProps<"div">

export const SegmentedControlItems = (props: SegmentedControlItemsProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="segmented-control-items"
      role="presentation"
      class={cx(
        "inline-flex list-none p-[3px] group-[[aria-orientation=vertical]]/segmented_control:flex-col",
        props.class,
      )}
      {...rest}
    />
  )
}

export type SegmentedControlLabelProps<T extends ValidComponent = "span"> =
  ComponentProps<typeof SegmentedControlPrimitive.Label<T>>

export const SegmentedControlLabel = <T extends ValidComponent = "span">(
  props: SegmentedControlLabelProps<T>,
) => {
  const [, rest] = splitProps(props as SegmentedControlLabelProps, ["class"])

  return (
    <SegmentedControlPrimitive.Label
      data-slot="segmented-control-label"
      class={cx(
        "data-[invalid]:text-destructive select-none text-sm font-medium",
        props.class,
      )}
      {...rest}
    />
  )
}

export type SegmentedControlDescriptionProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof SegmentedControlPrimitive.Description<T>>

export const SegmentedControlDescription = <T extends ValidComponent = "div">(
  props: SegmentedControlDescriptionProps<T>,
) => {
  const [, rest] = splitProps(props as SegmentedControlDescriptionProps, [
    "class",
  ])

  return (
    <SegmentedControlPrimitive.Description
      data-slot="segmented-control-description"
      class={cx("text-muted-foreground text-sm", props.class)}
      {...rest}
    />
  )
}

export type SegmentedControlItemDescriptionProps<
  T extends ValidComponent = "div",
> = ComponentProps<typeof SegmentedControlPrimitive.ItemDescription<T>>

export const SegmentedControlItemDescription = <
  T extends ValidComponent = "div",
>(
  props: SegmentedControlItemDescriptionProps<T>,
) => {
  const [, rest] = splitProps(props as SegmentedControlItemDescriptionProps, [
    "class",
  ])

  return (
    <SegmentedControlPrimitive.ItemDescription
      data-slot="segmented-control-item-description"
      class={cx("text-muted-foreground text-sm", props.class)}
      {...rest}
    />
  )
}

export type SegmentedControlErrorMessageProps<
  T extends ValidComponent = "div",
> = ComponentProps<typeof SegmentedControlPrimitive.ErrorMessage<T>>

export const SegmentedControlErrorMessage = <T extends ValidComponent = "div">(
  props: SegmentedControlErrorMessageProps<T>,
) => {
  const [, rest] = splitProps(props as SegmentedControlErrorMessageProps, [
    "class",
  ])

  return (
    <SegmentedControlPrimitive.ErrorMessage
      data-slot="segmented-control-error-message"
      class={cx("text-destructive text-sm", props.class)}
      {...rest}
    />
  )
}

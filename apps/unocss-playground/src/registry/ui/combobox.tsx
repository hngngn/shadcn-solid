import type { ComponentProps, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"
import { Combobox as ComboboxPrimitive } from "@kobalte/core/combobox"
import { usePopperContext } from "@kobalte/core/popper"

import { cx } from "@/registry/lib/cva"

export const ComboboxPortal = ComboboxPrimitive.Portal

export type ComboboxProps<
  Option,
  Group = never,
  T extends ValidComponent = "div",
> = ComponentProps<typeof ComboboxPrimitive<Option, Group, T>>

export const Combobox = <
  Option,
  Group = never,
  T extends ValidComponent = "div",
>(
  props: ComboboxProps<Option, Group, T>,
) => {
  const [, rest] = splitProps(props as ComboboxProps<Option, Group>, ["class"])

  return (
    <ComboboxPrimitive
      data-slot="combobox"
      class={cx("space-y-2", props.class)}
      {...rest}
    />
  )
}

export type ComboboxInputProps<T extends ValidComponent = "input"> =
  ComponentProps<typeof ComboboxPrimitive.Input<T>>

export const ComboboxInput = <T extends ValidComponent = "input">(
  props: ComboboxInputProps<T>,
) => {
  const [, rest] = splitProps(props as ComboboxInputProps, ["class"])

  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-input"
      class={cx(
        "placeholder:text-muted-foreground pr-3 outline-none",
        "selection:(bg-primary text-primary-foreground)",
        props.class,
      )}
      {...rest}
    />
  )
}

export type ComboboxTriggerProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof ComboboxPrimitive.Trigger<T>>

export const ComboboxTrigger = <T extends ValidComponent = "button">(
  props: ComboboxTriggerProps<T>,
) => {
  const [, rest] = splitProps(props as ComboboxTriggerProps, ["class"])

  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      class={cx("[&>svg]:(text-muted-foreground size-3.5)", props.class)}
      {...rest}
    >
      <ComboboxPrimitive.Icon
        as="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m7 15l5 5l5-5M7 9l5-5l5 5"
        />
      </ComboboxPrimitive.Icon>
    </ComboboxPrimitive.Trigger>
  )
}

export type ComboboxControlProps<
  Option,
  T extends ValidComponent = "div",
> = ComponentProps<typeof ComboboxPrimitive.Control<Option, T>>

export const ComboboxControl = <Option, T extends ValidComponent = "div">(
  props: ComboboxControlProps<Option, T>,
) => {
  const [, rest] = splitProps(props as ComboboxControlProps<Option>, ["class"])

  return (
    <ComboboxPrimitive.Control
      data-slot="combobox-control"
      class={cx(
        "dark:bg-input/30 border-input shadow-xs flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base transition-[color,box-shadow] md:text-sm",
        "data-[invalid]:(ring-destructive/20 dark:ring-destructive/40 border-destructive)",
        "data-[disabled]:(pointer-events-none cursor-not-allowed opacity-50)",
        props.class,
      )}
      {...rest}
    />
  )
}

export type ComboboxContentProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ComboboxPrimitive.Content<T>>

export const ComboboxContent = <T extends ValidComponent = "div">(
  props: ComboboxContentProps<T>,
) => {
  const [, rest] = splitProps(props as ComboboxContentProps, ["class"])

  const context = usePopperContext()

  return (
    <ComboboxPrimitive.Content
      data-slot="combobox-content"
      class={cx(
        "bg-popover text-popover-foreground origin-(--kb-combobox-content-transform-origin) relative z-50 min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border shadow-md",
        "data-[expanded]:(animate-in fade-in-0 zoom-in-95)",
        "data-[closed]:(animate-out fade-out-0 zoom-out-95)",
        context.currentPlacement().includes("top") && "slide-in-from-bottom-2",
        context.currentPlacement().includes("bottom") && "slide-in-from-top-2",
        context.currentPlacement().includes("left") && "slide-in-from-right-2",
        context.currentPlacement().includes("right") && "slide-in-from-left-2",
        props.class,
      )}
      {...rest}
    >
      <ComboboxPrimitive.Listbox data-slot="combobox-listbox" class="p-1" />
    </ComboboxPrimitive.Content>
  )
}

export type ComboboxItemProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ComboboxPrimitive.Item<T>>

export const ComboboxItem = <T extends ValidComponent = "div">(
  props: ComboboxItemProps<T>,
) => {
  const [, rest] = splitProps(props as ComboboxItemProps, ["class", "children"])

  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      class={cx(
        "[&_svg:not([class*=text-])]:text-muted-foreground outline-hidden relative flex w-full cursor-default select-none items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm [&_svg:not([class*=size-])]:size-4",
        "data-[highlighted]:(bg-accent text-accent-foreground)",
        "data-[disabled]:(pointer-events-none opacity-50)",
        "[&_svg]:(pointer-events-none shrink-0)",
        props.class,
      )}
      {...rest}
    >
      {props.children}
      <ComboboxPrimitive.ItemIndicator>
        <ComboboxPrimitive.Icon
          as="svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 6L9 17l-5-5"
          />
        </ComboboxPrimitive.Icon>
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

export type ComboboxItemLabelProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ComboboxPrimitive.ItemLabel<T>>

export const ComboboxItemLabel = <T extends ValidComponent = "div">(
  props: ComboboxItemLabelProps<T>,
) => {
  return (
    <ComboboxPrimitive.ItemLabel data-slot="combobox-itemlabel" {...props} />
  )
}

export type ComboboxDescriptionProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ComboboxPrimitive.Description<T>>

export const ComboboxDescription = <T extends ValidComponent = "div">(
  props: ComboboxDescriptionProps<T>,
) => {
  const [, rest] = splitProps(props as ComboboxDescriptionProps, ["class"])

  return (
    <ComboboxPrimitive.Description
      data-slot="combobox-description"
      class={cx(
        "text-muted-foreground text-sm data-[disabled]:opacity-50",
        props.class,
      )}
      {...rest}
    />
  )
}

export type ComboboxLabelProps<T extends ValidComponent = "label"> =
  ComponentProps<typeof ComboboxPrimitive.Label<T>>

export const ComboboxLabel = <T extends ValidComponent = "label">(
  props: ComboboxLabelProps<T>,
) => {
  const [, rest] = splitProps(props as ComboboxLabelProps, ["class"])

  return (
    <ComboboxPrimitive.Label
      data-slot="combobox-label"
      class={cx(
        "flex select-none items-center gap-2 text-sm font-medium leading-none",
        "data-[disabled]:(pointer-events-none cursor-not-allowed opacity-50)",
        props.class,
      )}
      {...rest}
    />
  )
}

export type ComboboxErrorMessageProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ComboboxPrimitive.ErrorMessage<T>>

export const ComboboxErrorMessage = <T extends ValidComponent = "div">(
  props: ComboboxErrorMessageProps<T>,
) => {
  const [, rest] = splitProps(props as ComboboxErrorMessageProps, ["class"])

  return (
    <ComboboxPrimitive.ErrorMessage
      data-slot="combobox-errormessage"
      class={cx(
        "text-destructive text-sm data-[disabled]:opacity-50",
        props.class,
      )}
      {...rest}
    />
  )
}

export type ComboboxSectionProps<T extends ValidComponent = "li"> =
  ComponentProps<typeof ComboboxPrimitive.Section<T>>

export const ComboboxSection = <T extends ValidComponent = "li">(
  props: ComboboxSectionProps<T>,
) => {
  const [, rest] = splitProps(props as ComboboxSectionProps, ["class"])

  return (
    <ComboboxPrimitive.Section
      data-slot="combobox-section"
      class={cx(
        "text-muted-foreground not-first-of-type:mt-1 px-2 py-1.5 text-xs",
        props.class,
      )}
      {...rest}
    />
  )
}

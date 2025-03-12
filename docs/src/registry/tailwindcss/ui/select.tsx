import { splitProps, type ParentProps, type ValidComponent } from "solid-js"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import {
  Select as SelectPrimitive,
  type SelectContentProps,
  type SelectItemProps,
  type SelectTriggerProps,
} from "@kobalte/core/select"

import { cn } from "@/registry/tailwindcss/libs/cn"

export const Select = SelectPrimitive
export const SelectValue = SelectPrimitive.Value
export const SelectDescription = SelectPrimitive.Description
export const SelectErrorMessage = SelectPrimitive.ErrorMessage
export const SelectItemDescription = SelectPrimitive.ItemDescription
export const SelectHiddenSelect = SelectPrimitive.HiddenSelect
export const SelectSection = SelectPrimitive.Section

type selectTriggerProps<T extends ValidComponent = "button"> = ParentProps<
  SelectTriggerProps<T> & { class?: string }
>

export const SelectTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, selectTriggerProps<T>>
) => {
  const [local, rest] = splitProps(props as selectTriggerProps, [
    "class",
    "children",
  ])

  return (
    <SelectPrimitive.Trigger
      class={cn(
        "border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm transition-shadow focus:outline-none focus-visible:ring-[1.5px] disabled:cursor-not-allowed disabled:opacity-50",
        local.class
      )}
      {...rest}
    >
      {local.children}
      <SelectPrimitive.Icon
        as="svg"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        class="flex size-4 items-center justify-center opacity-50"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m8 9l4-4l4 4m0 6l-4 4l-4-4"
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

type selectContentProps<T extends ValidComponent = "div"> =
  SelectContentProps<T> & {
    class?: string
  }

export const SelectContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, selectContentProps<T>>
) => {
  const [local, rest] = splitProps(props as selectContentProps, ["class"])

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        class={cn(
          "bg-popover text-popover-foreground data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 relative z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-md",
          local.class
        )}
        {...rest}
      >
        <SelectPrimitive.Listbox class="p-1 focus-visible:outline-none" />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

type selectItemProps<T extends ValidComponent = "li"> = ParentProps<
  SelectItemProps<T> & { class?: string }
>

export const SelectItem = <T extends ValidComponent = "li">(
  props: PolymorphicProps<T, selectItemProps<T>>
) => {
  const [local, rest] = splitProps(props as selectItemProps, [
    "class",
    "children",
  ])

  return (
    <SelectPrimitive.Item
      class={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class
      )}
      {...rest}
    >
      <SelectPrimitive.ItemIndicator class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m5 12l5 5L20 7"
          />
          <title>Checked</title>
        </svg>
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemLabel>{local.children}</SelectPrimitive.ItemLabel>
    </SelectPrimitive.Item>
  )
}

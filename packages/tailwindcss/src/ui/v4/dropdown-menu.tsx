import type { ComponentProps, ValidComponent } from "solid-js"
import { mergeProps, splitProps } from "solid-js"
import { DropdownMenu as DropdownMenuPrimitive } from "@kobalte/core/dropdown-menu"

import { cx } from "@repo/tailwindcss/utils/cva"

export const DropdownMenuPortal = DropdownMenuPrimitive.Portal

export type DropdownMenuProps = ComponentProps<typeof DropdownMenuPrimitive>

export const DropdownMenu = (props: DropdownMenuProps) => {
  const merge = mergeProps<DropdownMenuProps[]>(
    {
      gutter: 4,
    },
    props,
  )

  return <DropdownMenuPrimitive data-slot="dropdown-menu" {...merge} />
}

export type DropdownMenuTriggerProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof DropdownMenuPrimitive.Trigger<T>>

export const DropdownMenuTrigger = <T extends ValidComponent = "div">(
  props: DropdownMenuTriggerProps<T>,
) => {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

export type DropdownMenuGroupProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof DropdownMenuPrimitive.Group<T>>

export const DropdownMenuGroup = <T extends ValidComponent = "div">(
  props: DropdownMenuGroupProps<T>,
) => {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

export type DropdownMenuSubProps = ComponentProps<
  typeof DropdownMenuPrimitive.Sub
>

export const DropdownMenuSub = (props: DropdownMenuSubProps) => {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

export type DropdownMenuRadioGroupProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof DropdownMenuPrimitive.RadioGroup<T>>

export const DropdownMenuRadioGroup = <T extends ValidComponent = "div">(
  props: DropdownMenuRadioGroupProps<T>,
) => {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

export type DropdownMenuSubTriggerProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof DropdownMenuPrimitive.SubTrigger<T>> & {
    inset?: boolean
  }

export const DropdownMenuSubTrigger = <T extends ValidComponent = "div">(
  props: DropdownMenuSubTriggerProps<T>,
) => {
  const [local, rest] = splitProps(props as DropdownMenuSubTriggerProps, [
    "class",
    "children",
    "inset",
  ])

  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={local.inset}
      class={cx(
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[expanded]:bg-accent data-[expanded]:text-accent-foreground outline-hidden flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm data-[inset]:pl-8 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      {...rest}
    >
      {local.children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="ml-auto"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m9 18l6-6l-6-6"
        />
      </svg>
    </DropdownMenuPrimitive.SubTrigger>
  )
}

export type DropdownMenuSubContentProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof DropdownMenuPrimitive.SubContent<T>>

export const DropdownMenuSubContent = <T extends ValidComponent = "div">(
  props: DropdownMenuSubContentProps<T>,
) => {
  const [local, rest] = splitProps(props as DropdownMenuSubContentProps, [
    "class",
  ])

  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      class={cx(
        "bg-popover text-popover-foreground data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 origin-(--kb-menu-content-transform-origin) z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg outline-none",
        "[[data-popper-positioner][style*='--kb-popper-content-transform-origin:_top']>[data-slot=dropdown-menu-sub-content]]:slide-in-from-top-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_bottom']>[data-slot=dropdown-menu-sub-content]]:slide-in-from-bottom-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_left']>[data-slot=dropdown-menu-sub-content]]:slide-in-from-left-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_right']>[data-slot=dropdown-menu-sub-content]]:slide-in-from-right-2",
        local.class,
      )}
      {...rest}
    />
  )
}

export type DropdownMenuContentProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof DropdownMenuPrimitive.Content<T>>

export const DropdownMenuContent = <T extends ValidComponent = "div">(
  props: DropdownMenuContentProps<T>,
) => {
  const [local, rest] = splitProps(props as DropdownMenuContentProps, ["class"])

  return (
    <DropdownMenuPrimitive.Content
      data-slot="dropdown-menu-content"
      class={cx(
        "bg-popover text-popover-foreground data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 origin-(--kb-menu-content-transform-origin) z-50 min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border p-1 shadow-md outline-none",
        "[[data-popper-positioner][style*='--kb-popper-content-transform-origin:_top']>[data-slot=dropdown-menu-content]]:slide-in-from-top-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_bottom']>[data-slot=dropdown-menu-content]]:slide-in-from-bottom-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_left']>[data-slot=dropdown-menu-content]]:slide-in-from-left-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_right']>[data-slot=dropdown-menu-content]]:slide-in-from-right-2",
        local.class,
      )}
      {...rest}
    />
  )
}

export type DropdownMenuItemProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof DropdownMenuPrimitive.Item<T>> & {
    inset?: boolean
    variant?: "default" | "destructive"
  }

export const DropdownMenuItem = <T extends ValidComponent = "div">(
  props: DropdownMenuItemProps<T>,
) => {
  const [local, rest] = splitProps(props as DropdownMenuItemProps, [
    "class",
    "inset",
    "variant",
  ])

  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={local.inset}
      data-variant={local.variant}
      class={cx(
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:data-[highlighted]:bg-destructive/10 dark:data-[variant=destructive]:data-[highlighted]:bg-destructive/20 data-[variant=destructive]:data-[highlighted]:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      {...rest}
    />
  )
}

export type DropdownMenuCheckboxItemProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem<T>>

export const DropdownMenuCheckboxItem = <T extends ValidComponent = "div">(
  props: DropdownMenuCheckboxItemProps<T>,
) => {
  const [local, rest] = splitProps(props as DropdownMenuCheckboxItemProps, [
    "class",
    "children",
  ])

  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      class={cx(
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      {...rest}
    >
      <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator
          as="svg"
          xmlns="http://www.w3.org/2000/svg"
          class="size-4"
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
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {local.children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

export type DropdownMenuRadioItemProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof DropdownMenuPrimitive.RadioItem<T>>

export const DropdownMenuRadioItem = <T extends ValidComponent = "div">(
  props: DropdownMenuRadioItemProps<T>,
) => {
  const [local, rest] = splitProps(props as DropdownMenuRadioItemProps, [
    "class",
    "children",
  ])

  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      class={cx(
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      {...rest}
    >
      <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator
          as="svg"
          xmlns="http://www.w3.org/2000/svg"
          class="size-2"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            fill="currentColor"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {local.children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

export type DropdownMenuGroupLabelProps<T extends ValidComponent = "span"> =
  ComponentProps<typeof DropdownMenuPrimitive.GroupLabel<T>> & {
    inset?: boolean
  }

export const DropdownMenuGroupLabel = <T extends ValidComponent = "span">(
  props: DropdownMenuGroupLabelProps<T>,
) => {
  const [local, rest] = splitProps(props as DropdownMenuGroupLabelProps, [
    "class",
    "inset",
  ])

  return (
    <DropdownMenuPrimitive.GroupLabel
      as="div"
      data-slot="dropdown-menu-group-label"
      data-inset={local.inset}
      class={cx(
        "text-foreground my-1.5 px-2 text-sm font-medium data-[inset]:pl-8",
        local.class,
      )}
      {...rest}
    />
  )
}

export type DropdownMenuItemLabelProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof DropdownMenuPrimitive.ItemLabel<T>> & {
    inset?: boolean
  }

export const DropdownMenuItemLabel = <T extends ValidComponent = "div">(
  props: DropdownMenuItemLabelProps<T>,
) => {
  const [local, rest] = splitProps(props as DropdownMenuItemLabelProps, [
    "class",
    "inset",
  ])

  return (
    <DropdownMenuPrimitive.ItemLabel
      data-slot="dropdown-menu-item-label"
      data-inset={local.inset}
      class={cx(
        "text-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        local.class,
      )}
      {...rest}
    />
  )
}

export type DropdownMenuSeparatorProps<T extends ValidComponent = "hr"> =
  ComponentProps<typeof DropdownMenuPrimitive.Separator<T>>

export const DropdownMenuSeparator = <T extends ValidComponent = "hr">(
  props: DropdownMenuSeparatorProps<T>,
) => {
  const [local, rest] = splitProps(props as DropdownMenuSeparatorProps, [
    "class",
  ])

  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      class={cx("bg-border -mx-1 my-1 h-px", local.class)}
      {...rest}
    />
  )
}

export type DropdownMenuShortcutProps = ComponentProps<"span">

export const DropdownMenuShortcut = (props: DropdownMenuShortcutProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <span
      data-slot="dropdown-menu-shortcut"
      class={cx(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        local.class,
      )}
      {...rest}
    />
  )
}

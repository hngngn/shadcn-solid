import {
  mergeProps,
  splitProps,
  type ComponentProps,
  type ValidComponent,
} from "solid-js"
import { Menubar as MenubarPrimitive } from "@kobalte/core/menubar"

import { cx } from "@/registry/lib/cva"

export const MenubarPortal = MenubarPrimitive.Portal

export type MenubarProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof MenubarPrimitive<T>
>

export const Menubar = <T extends ValidComponent = "div">(
  props: MenubarProps<T>,
) => {
  const [, rest] = splitProps(props as MenubarProps, ["class"])

  return (
    <MenubarPrimitive
      data-slot="menubar"
      class={cx(
        "bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
        props.class,
      )}
      {...rest}
    />
  )
}

export type MenubarMenuProps = ComponentProps<typeof MenubarPrimitive.Menu>

export const MenubarMenu = (props: MenubarMenuProps) => {
  const merge = mergeProps<MenubarMenuProps[]>(
    {
      gutter: 8,
    },
    props,
  )

  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...merge} />
}

export type MenubarGroupProps = ComponentProps<typeof MenubarPrimitive.Group>

export const MenubarGroup = (props: MenubarGroupProps) => {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}

export type MenubarRadioGroupProps = ComponentProps<
  typeof MenubarPrimitive.RadioGroup
>

export const MenubarRadioGroup = (props: MenubarRadioGroupProps) => {
  return (
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
  )
}

export type MenubarTriggerProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof MenubarPrimitive.Trigger<T>>

export const MenubarTrigger = <T extends ValidComponent = "button">(
  props: MenubarTriggerProps<T>,
) => {
  const [, rest] = splitProps(props as MenubarTriggerProps, ["class"])

  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      class={cx(
        "focus:bg-accent focus:text-accent-foreground data-[expanded]:bg-accent data-[expanded]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none",
        props.class,
      )}
      {...rest}
    />
  )
}

export type MenubarContentProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof MenubarPrimitive.Content<T>>

export const MenubarContent = <T extends ValidComponent = "div">(
  props: MenubarContentProps<T>,
) => {
  const [, rest] = splitProps(props as MenubarContentProps, ["class"])

  return (
    <MenubarPrimitive.Content
      data-slot="menubar-content"
      class={cx(
        "bg-popover text-popover-foreground data-[expanded]:animate-in data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 z-50 min-w-[12rem] origin-(--kb-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md focus-visible:outline-none",
        "[[data-popper-positioner][style*='--kb-popper-content-transform-origin:_top']>[data-slot=menubar-content]]:slide-in-from-top-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_bottom']>[data-slot=menubar-content]]:slide-in-from-bottom-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_left']>[data-slot=menubar-content]]:slide-in-from-left-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_right']>[data-slot=menubar-content]]:slide-in-from-right-2",
        props.class,
      )}
      {...rest}
    />
  )
}

export type MenubarItemProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof MenubarPrimitive.Item<T>
> & {
  inset?: boolean
  variant?: "default" | "destructive"
}

export const MenubarItem = <T extends ValidComponent = "div">(
  props: MenubarItemProps<T>,
) => {
  const merge = mergeProps(
    {
      variant: "default",
    } as MenubarItemProps,
    props,
  )
  const [, rest] = splitProps(merge, ["class", "inset", "variant"])

  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={props.inset}
      data-variant={props.variant}
      class={cx(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive",
        props.class,
      )}
      {...rest}
    />
  )
}

export type MenubarCheckboxItemProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof MenubarPrimitive.CheckboxItem<T>>

export const MenubarCheckboxItem = <T extends ValidComponent = "div">(
  props: MenubarCheckboxItemProps<T>,
) => {
  const [, rest] = splitProps(props as MenubarCheckboxItemProps, [
    "class",
    "children",
  ])

  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      class={cx(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        props.class,
      )}
      {...rest}
    >
      <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <svg
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
          </svg>
        </MenubarPrimitive.ItemIndicator>
      </span>
      {props.children}
    </MenubarPrimitive.CheckboxItem>
  )
}

export type MenubarRadioItemProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof MenubarPrimitive.RadioItem<T>>

export const MenubarRadioItem = <T extends ValidComponent = "div">(
  props: MenubarRadioItemProps<T>,
) => {
  const [, rest] = splitProps(props as MenubarRadioItemProps, [
    "class",
    "children",
  ])

  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      class={cx(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        props.class,
      )}
      {...rest}
    >
      <span class="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="size-2"
          >
            <g
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path d="M0 0h24v24H0z" />
              <path
                fill="currentColor"
                d="M7 3.34a10 10 0 1 1-4.995 8.984L2 12l.005-.324A10 10 0 0 1 7 3.34"
              />
            </g>
          </svg>
        </MenubarPrimitive.ItemIndicator>
      </span>
      {props.children}
    </MenubarPrimitive.RadioItem>
  )
}

export type MenubarGroupLabelProps<T extends ValidComponent = "span"> =
  ComponentProps<typeof MenubarPrimitive.GroupLabel<T>> & {
    inset?: boolean
  }

export const MenubarGroupLabel = <T extends ValidComponent = "span">(
  props: MenubarGroupLabelProps<T>,
) => {
  const [, rest] = splitProps(props as MenubarGroupLabelProps, [
    "class",
    "inset",
  ])

  return (
    <MenubarPrimitive.GroupLabel
      data-slot="menubar-group-label"
      data-inset={props.inset}
      class={cx(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        props.class,
      )}
      {...rest}
    />
  )
}

export type MenubarItemLabelProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof MenubarPrimitive.ItemLabel<T>> & {
    inset?: boolean
  }

export const MenubarItemLabel = <T extends ValidComponent = "div">(
  props: MenubarItemLabelProps<T>,
) => {
  const [, rest] = splitProps(props as MenubarItemLabelProps, [
    "class",
    "inset",
  ])

  return (
    <MenubarPrimitive.ItemLabel
      data-slot="menubar-item-label"
      data-inset={props.inset}
      class={cx(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        props.class,
      )}
      {...rest}
    />
  )
}

export type MenubarSeparatorProps<T extends ValidComponent = "hr"> =
  ComponentProps<typeof MenubarPrimitive.Separator<T>>

export const MenubarSeparator = <T extends ValidComponent = "hr">(
  props: MenubarSeparatorProps<T>,
) => {
  const [, rest] = splitProps(props as MenubarSeparatorProps, ["class"])

  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      class={cx("bg-border -mx-1 my-1 h-px", props.class)}
      {...rest}
    />
  )
}

export type MenubarShortcut = ComponentProps<"span">

export const MenubarShortcut = (props: MenubarShortcut) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <span
      data-slot="menubar-shortcut"
      class={cx(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        props.class,
      )}
      {...rest}
    />
  )
}

export type MenubarSubProps = ComponentProps<typeof MenubarPrimitive.Sub>

export const MenubarSub = (props: MenubarSubProps) => {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

export type MenubarSubTriggerProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof MenubarPrimitive.SubTrigger<T>> & {
    inset?: boolean
  }

export const MenubarSubTrigger = <T extends ValidComponent = "div">(
  props: MenubarSubTriggerProps<T>,
) => {
  const [, rest] = splitProps(props as MenubarSubTriggerProps, [
    "class",
    "inset",
    "children",
  ])

  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={props.inset}
      class={cx(
        "focus:bg-accent focus:text-accent-foreground data-[expanded]:bg-accent data-[expanded]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8",
        props.class,
      )}
      {...rest}
    >
      {props.children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="ml-auto size-4"
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
    </MenubarPrimitive.SubTrigger>
  )
}

export type MenubarSubContentProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof MenubarPrimitive.SubContent<T>>

export const MenubarSubContent = <T extends ValidComponent = "div">(
  props: MenubarSubContentProps<T>,
) => {
  const [, rest] = splitProps(props as MenubarSubContentProps, ["class"])

  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      class={cx(
        "bg-popover text-popover-foreground data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 z-50 min-w-[8rem] origin-(--kb-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg focus-visible:outline-none",
        "[[data-popper-positioner][style*='--kb-popper-content-transform-origin:_top']>[data-slot=menubar-sub-content]]:slide-in-from-top-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_bottom']>[data-slot=menubar-sub-content]]:slide-in-from-bottom-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_left']>[data-slot=menubar-sub-content]]:slide-in-from-left-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_right']>[data-slot=menubar-sub-content]]:slide-in-from-right-2",
        props.class,
      )}
      {...rest}
    />
  )
}

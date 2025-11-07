import {
  Show,
  mergeProps,
  splitProps,
  type ComponentProps,
  type ValidComponent,
} from "solid-js"
import { NavigationMenu as NavigationMenuPrimitive } from "@kobalte/core/navigation-menu"

import { cx } from "@/registry/lib/cva"

export const NavigationMenuPortal = NavigationMenuPrimitive.Portal

export type NavigationMenuProps<T extends ValidComponent = "ul"> =
  ComponentProps<typeof NavigationMenuPrimitive<T>> & {
    viewport?: boolean
  }

export const NavigationMenu = <T extends ValidComponent = "ul">(
  props: NavigationMenuProps<T>,
) => {
  const merge = mergeProps(
    { gutter: 6, viewport: true } as NavigationMenuProps,
    props,
  )
  const [, rest] = splitProps(merge, ["class", "children", "viewport"])

  return (
    <NavigationMenuPrimitive
      data-slot="navigation-menu"
      data-viewport={merge.viewport}
      class={cx(
        "group/navigation_menu relative flex max-w-max flex-1 items-center justify-center data-[orientation=vertical]:flex-col",
        props.class,
      )}
      {...rest}
    >
      {props.children}
      <Show when={merge.viewport}>
        <NavigationMenuPrimitive.Viewport class="origin-(--kb-menu-content-transform-origin) w-(--kb-navigation-menu-viewport-width) h-(--kb-navigation-menu-viewport-height) bg-popover text-popover-foreground z-50 overflow-x-clip overflow-y-visible rounded-md border shadow transition-[width,height] duration-300 data-[orientation=vertical]:(overflow-y-clip overflow-x-visible) data-[expanded]:(animate-in zoom-in-90 fade-in-0) data-[closed]:(animate-out zoom-out-95 fade-out-0)" />
      </Show>
    </NavigationMenuPrimitive>
  )
}

export type NavigationMenuListProps = ComponentProps<
  typeof NavigationMenuPrimitive.Menu
>

export const NavigationMenuList = (props: NavigationMenuListProps) => {
  return (
    <NavigationMenuPrimitive.Menu data-slot="navigation-menu-list" {...props} />
  )
}

export type NavigationMenuItemProps<T extends ValidComponent = "a"> =
  ComponentProps<typeof NavigationMenuPrimitive.Item<T>>

export const NavigationMenuItem = <T extends ValidComponent = "a">(
  props: NavigationMenuItemProps<T>,
) => {
  const [, rest] = splitProps(props as NavigationMenuItemProps, ["class"])

  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      class={cx(
        "[&_svg:not([class*=text-])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm outline-none transition-all [&_svg:not([class*=size-])]:size-4",
        "data-[expanded]:(focus:bg-accent hover:bg-accent bg-accent/50 text-accent-foreground)",
        "hover:(bg-accent text-accent-foreground)",
        "focus:(bg-accent text-accent-foreground)",
        "focus-visible:(ring-ring/50 outline-1 ring-[3px])",
        props.class,
      )}
      {...rest}
    />
  )
}

export type NavigationMenuTriggerProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof NavigationMenuPrimitive.Trigger<T>>

export const NavigationMenuTrigger = <T extends ValidComponent = "button">(
  props: NavigationMenuTriggerProps<T>,
) => {
  const [, rest] = splitProps(props as NavigationMenuTriggerProps, [
    "class",
    "children",
  ])

  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      class={cx(
        "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-[color,background-color,box-shadow] outline-none",
        "not-hover:data-[expanded]:(text-accent-foreground bg-accent/50)",
        "data-[highlighted]:(bg-accent text-accent-foreground)",
        "disabled:(pointer-events-none opacity-50)",
        props.class,
      )}
      {...rest}
    >
      {props.children}
      <NavigationMenuPrimitive.Icon class="relative top-[1px] ml-1 size-3 transition-transform duration-300 group-[:any-link]:hidden data-[expanded]:rotate-180 data-[expanded]:group-data-[orientation=vertical]/navigation_menu:(rotate-x-180 -rotate-90 data-[expanded]:-rotate-90)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m6 9l6 6l6-6"
          />
        </svg>
      </NavigationMenuPrimitive.Icon>
    </NavigationMenuPrimitive.Trigger>
  )
}

export type NavigationMenuContentProps<T extends ValidComponent = "ul"> =
  ComponentProps<typeof NavigationMenuPrimitive.Content<T>>

export const NavigationMenuContent = <T extends ValidComponent = "ul">(
  props: NavigationMenuContentProps<T>,
) => {
  const [, rest] = splitProps(props as NavigationMenuContentProps, ["class"])

  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      class={cx(
        "data-[motion^=from-]:(animate-in fade-in)",
        "data-[motion^=to-]:(animate-out fade-out)",
        "data-[orientation=horizontal]:(data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52)",
        "data-[orientation=vertical]:(data-[motion=from-end]:slide-in-from-bottom-52 data-[motion=from-start]:slide-in-from-top-52 data-[motion=to-end]:slide-out-to-bottom-52 data-[motion=to-start]:slide-out-to-top-52)",
        "absolute left-0 top-0 p-2 pr-2.5 outline-none duration-300",
        "**:data-[slot=navigation-menu-item]:focus:(ring-0 outline-none)",
        props.class,
      )}
      {...rest}
    />
  )
}

export type NavigationItemLabelProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof NavigationMenuPrimitive.ItemLabel<T>>

export const NavigationItemLabel = <T extends ValidComponent = "div">(
  props: NavigationItemLabelProps<T>,
) => {
  const [, rest] = splitProps(props as NavigationItemLabelProps, ["class"])

  return (
    <NavigationMenuPrimitive.ItemLabel
      data-slot="navigation-menu-label"
      class={cx("text-sm font-medium leading-none", props.class)}
      {...rest}
    />
  )
}

export type NavigationItemDescriptionProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof NavigationMenuPrimitive.ItemDescription<T>>

export const NavigationItemDescription = <T extends ValidComponent = "div">(
  props: NavigationItemDescriptionProps<T>,
) => {
  const [, rest] = splitProps(props as NavigationItemDescriptionProps, [
    "class",
  ])

  return (
    <NavigationMenuPrimitive.ItemDescription
      data-slot="navigation-menu-description"
      class={cx(
        "text-muted-foreground line-clamp-2 text-sm leading-snug",
        props.class,
      )}
      {...rest}
    />
  )
}

import type { ComponentProps, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"
import { Tabs as TabsPrimitive } from "@kobalte/core/tabs"

import { cx } from "@/registry/lib/cva"

export type TabsProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof TabsPrimitive<T>
>

export const Tabs = <T extends ValidComponent = "div">(props: TabsProps<T>) => {
  const [, rest] = splitProps(props as TabsProps, ["class"])

  return (
    <TabsPrimitive
      data-slot="tabs"
      class={cx(
        "flex flex-col gap-2",
        "data-[orientation=vertical]:flex-row",
        props.class,
      )}
      {...rest}
    />
  )
}

export type TabsListProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof TabsPrimitive.List<T>
>

export const TabsList = <T extends ValidComponent = "div">(
  props: TabsListProps<T>,
) => {
  const [, rest] = splitProps(props as TabsListProps, ["class"])

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      class={cx(
        "bg-muted text-muted-foreground ring-muted relative flex h-[calc(var(--spacing)*7.5)] w-fit items-center justify-center rounded-lg ring-[3px]",
        "data-[orientation=vertical]:(mt-[3px] size-full flex-col)",
        props.class,
      )}
      {...rest}
    />
  )
}

export type TabsTriggerProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof TabsPrimitive.Trigger<T>>

export const TabsTrigger = <T extends ValidComponent = "button">(
  props: TabsTriggerProps<T>,
) => {
  const [, rest] = splitProps(props as TabsTriggerProps, ["class"])

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      class={cx(
        "text-foreground dark:text-muted-foreground dark:data-[selected]:text-foreground peer relative z-10 inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 whitespace-nowrap px-2 py-1 text-sm font-medium transition-[color] focus-visible:outline-none [&_svg:not([class*=size-])]:size-4",
        "disabled:(pointer-events-none opacity-50)",
        "[&_svg]:(pointer-events-none shrink-0)",
        props.class,
      )}
      {...rest}
    />
  )
}

export type TabsContentProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof TabsPrimitive.Content<T>
>

export const TabsContent = <T extends ValidComponent = "div">(
  props: TabsContentProps<T>,
) => {
  const [, rest] = splitProps(props as TabsContentProps, ["class"])

  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      class={cx("flex-1 outline-none", props.class)}
      {...rest}
    />
  )
}

export type TabsIndicatorProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof TabsPrimitive.Indicator<T>>

export const TabsIndicator = <T extends ValidComponent = "div">(
  props: TabsIndicatorProps<T>,
) => {
  const [, rest] = splitProps(props as TabsIndicatorProps, ["class"])

  return (
    <TabsPrimitive.Indicator
      data-slot="tabs-indicator"
      class={cx(
        "bg-background absolute inset-0 rounded-lg border border-transparent shadow-sm transition-[box-shadow,transform,width,height] duration-200",
        "dark:(bg-input/30 border-input)",
        "peer-focus-visible:(border-ring ring-ring/50 outline-ring outline-1 ring-[3px])",
        props.class,
      )}
      {...rest}
    />
  )
}

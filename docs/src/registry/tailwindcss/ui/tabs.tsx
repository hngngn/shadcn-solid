import { splitProps, type ValidComponent, type VoidProps } from "solid-js"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import {
  Tabs as TabsPrimitive,
  type TabsContentProps,
  type TabsIndicatorProps,
  type TabsListProps,
  type TabsRootProps,
  type TabsTriggerProps,
} from "@kobalte/core/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/registry/tailwindcss/libs/cn"

type tabsProps<T extends ValidComponent = "div"> = TabsRootProps<T> & {
  class?: string
}

export const Tabs = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, tabsProps<T>>
) => {
  const [local, rest] = splitProps(props as tabsProps, ["class"])

  return (
    <TabsPrimitive
      class={cn("w-full data-[orientation=vertical]:flex", local.class)}
      {...rest}
    />
  )
}

type tabsListProps<T extends ValidComponent = "div"> = TabsListProps<T> & {
  class?: string
}

export const TabsList = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, tabsListProps<T>>
) => {
  const [local, rest] = splitProps(props as tabsListProps, ["class"])

  return (
    <TabsPrimitive.List
      class={cn(
        "bg-muted text-muted-foreground relative flex w-full rounded-lg p-1 data-[orientation=vertical]:flex-col data-[orientation=horizontal]:items-center data-[orientation=vertical]:items-stretch",
        local.class
      )}
      {...rest}
    />
  )
}

type tabsContentProps<T extends ValidComponent = "div"> =
  TabsContentProps<T> & {
    class?: string
  }

export const TabsContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, tabsContentProps<T>>
) => {
  const [local, rest] = splitProps(props as tabsContentProps, ["class"])

  return (
    <TabsPrimitive.Content
      class={cn(
        "focus-visible:ring-ring focus-visible:ring-offset-background transition-shadow duration-200 focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-offset-2 data-[orientation=horizontal]:mt-2 data-[orientation=vertical]:ml-2",
        local.class
      )}
      {...rest}
    />
  )
}

type tabsTriggerProps<T extends ValidComponent = "button"> =
  TabsTriggerProps<T> & {
    class?: string
  }

export const TabsTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, tabsTriggerProps<T>>
) => {
  const [local, rest] = splitProps(props as tabsTriggerProps, ["class"])

  return (
    <TabsPrimitive.Trigger
      class={cn(
        "data-[selected]:text-foreground peer relative z-10 inline-flex h-7 w-full items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium outline-none transition-colors disabled:pointer-events-none disabled:opacity-50",
        local.class
      )}
      {...rest}
    />
  )
}

const tabsIndicatorVariants = cva(
  "absolute transition-all duration-200 outline-none",
  {
    variants: {
      variant: {
        block:
          "data-[orientation=horizontal]:bottom-1 data-[orientation=horizontal]:left-0 data-[orientation=vertical]:right-1 data-[orientation=vertical]:top-0 data-[orientation=horizontal]:h-[calc(100%-0.5rem)] data-[orientation=vertical]:w-[calc(100%-0.5rem)] bg-background shadow rounded-md peer-focus-visible:ring-[1.5px] peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background peer-focus-visible:outline-none",
        underline:
          "data-[orientation=horizontal]:-bottom-[1px] data-[orientation=horizontal]:left-0 data-[orientation=vertical]:-right-[1px] data-[orientation=vertical]:top-0 data-[orientation=horizontal]:h-[2px] data-[orientation=vertical]:w-[2px] bg-primary",
      },
    },
    defaultVariants: {
      variant: "block",
    },
  }
)

type tabsIndicatorProps<T extends ValidComponent = "div"> = VoidProps<
  TabsIndicatorProps<T> &
    VariantProps<typeof tabsIndicatorVariants> & {
      class?: string
    }
>

export const TabsIndicator = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, tabsIndicatorProps<T>>
) => {
  const [local, rest] = splitProps(props as tabsIndicatorProps, [
    "class",
    "variant",
  ])

  return (
    <TabsPrimitive.Indicator
      class={cn(tabsIndicatorVariants({ variant: local.variant }), local.class)}
      {...rest}
    />
  )
}

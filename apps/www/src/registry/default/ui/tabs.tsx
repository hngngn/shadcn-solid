import { cn } from "@/lib/cn"
import { Tabs as TabsPrimitive } from "@kobalte/core"
import type { ParentComponent } from "solid-js"
import { splitProps } from "solid-js"

export const Tabs: ParentComponent<TabsPrimitive.TabsRootProps> = (props) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <TabsPrimitive.Root
      class={cn("w-full data-[orientation=vertical]:flex", local.class)}
      {...rest}
    />
  )
}

export const TabsList: ParentComponent<TabsPrimitive.TabsListProps> = (
  props
) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <TabsPrimitive.List
      class={cn(
        "bg-muted text-muted-foreground relative flex h-9 rounded-lg p-1 data-[orientation=vertical]:flex-col data-[orientation=horizontal]:items-center data-[orientation=vertical]:items-stretch data-[orientation=horizontal]:border-b data-[orientation=vertical]:border-r",
        local.class
      )}
      {...rest}
    />
  )
}

export const TabsContent: ParentComponent<TabsPrimitive.TabsContentProps> = (
  props
) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <TabsPrimitive.Content
      class={cn(
        "ring-offset-background focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        local.class
      )}
      {...rest}
    />
  )
}

export const TabsTrigger: ParentComponent<TabsPrimitive.TabsTriggerProps> = (
  props
) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <TabsPrimitive.Trigger
      class={cn(
        "ring-offset-background focus-visible:ring-ring data-[selected]:bg-background data-[selected]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[selected]:shadow",
        local.class
      )}
      {...rest}
    />
  )
}

export const TabsIndicator: ParentComponent<
  TabsPrimitive.TabsIndicatorProps
> = (props) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <TabsPrimitive.Indicator
      class={cn(
        "duration-250ms absolute transition-all data-[orientation=horizontal]:-bottom-[1px] data-[orientation=vertical]:-right-[1px] data-[orientation=horizontal]:h-[2px] data-[orientation=vertical]:w-[2px]",
        local.class
      )}
      {...rest}
    />
  )
}

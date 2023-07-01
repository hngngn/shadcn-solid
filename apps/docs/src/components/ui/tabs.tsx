import { Tabs as TabsPrimitive } from "@kobalte/core"
import type { ParentComponent } from "solid-js"
import { splitProps } from "solid-js"

export const Tabs: ParentComponent<TabsPrimitive.TabsRootProps> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])
    return (
        <TabsPrimitive.Root
            class="w-full data-[orientation=vertical]:flex"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const TabsList: ParentComponent<TabsPrimitive.TabsListProps> = (
    props
) => {
    const [local, rest] = splitProps(props, ["class", "classList"])
    return (
        <TabsPrimitive.List
            class="relative flex data-[orientation=horizontal]:(items-center border-b) data-[orientation=vertical]:(flex-col items-stretch border-r) h-9 rounded-lg bg-muted p-1 text-muted-foreground"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const TabsContent: ParentComponent<TabsPrimitive.TabsContentProps> = (
    props
) => {
    const [local, rest] = splitProps(props, ["class", "classList"])
    return (
        <TabsPrimitive.Content
            class="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const TabsTrigger: ParentComponent<TabsPrimitive.TabsTriggerProps> = (
    props
) => {
    const [local, rest] = splitProps(props, ["class", "classList"])
    return (
        <TabsPrimitive.Trigger
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[selected]:(bg-background text-foreground shadow)"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const TabsIndicator: ParentComponent<
    TabsPrimitive.TabsIndicatorProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])
    return (
        <TabsPrimitive.Indicator
            class="absolute transition-all duration-250ms data-[orientation=horizontal]:(-bottom-1px h-2px) data-[orientation=vertical]:(-right-1px w-2px)"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

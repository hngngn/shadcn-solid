import { Tabs as TabsPrimitive } from "@kobalte/core"
import type {
	TabsContentProps,
	TabsIndicatorProps,
	TabsListProps,
	TabsRootProps,
	TabsTriggerProps,
} from "@kobalte/core/dist/types/tabs"
import { splitProps, type Component } from "solid-js"

export const Tabs: Component<TabsRootProps> = (props) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<TabsPrimitive.Root
			class="w-full data-[orientation=vertical]:flex"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

export const TabsList: Component<TabsListProps> = (props) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<TabsPrimitive.List
			class="relative flex data-[orientation=horizontal]:(items-center border-b) data-[orientation=vertical]: (flex-col items-stretch border-r) h-10 rounded-md bg-muted p-1 text-muted-foreground"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

export const TabsContent: Component<TabsContentProps> = (props) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<TabsPrimitive.Content
			class="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

export const TabsTrigger: Component<TabsTriggerProps> = (props) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<TabsPrimitive.Trigger
			class="flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium   ring-offset-background transition-all focus-visible:(outline-none ring-2 ring-ring ring-offset-2) disabled: (pointer-events-none opacity-50) ui-disabled:bg-background ui-selected:(text-foreground shadow-sm)"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

export const TabsIndicator: Component<TabsIndicatorProps> = (props) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<TabsPrimitive.Indicator
			class="absolute transition-all duration-250ms data-[orientation=horizontal]:(-bottom-1px h-2px) data-[orientation=vertical]:(-right-1px w-2px)"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

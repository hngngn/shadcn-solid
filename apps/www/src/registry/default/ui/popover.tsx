import { cn } from "@/lib/cn"
import { Popover as PopoverPrimitive } from "@kobalte/core"
import { TbX } from "solid-icons/tb"
import { mergeProps, splitProps, type ParentComponent } from "solid-js"

export const PopoverTrigger = PopoverPrimitive.Trigger
export const PopoverTitle = PopoverPrimitive.Title
export const PopoverDescription = PopoverPrimitive.Description

export const Popover: ParentComponent<PopoverPrimitive.PopoverRootProps> = (
	props
) => {
	const merge = mergeProps(
		{ gutter: 4 } as PopoverPrimitive.PopoverRootProps,
		props
	)
	return <PopoverPrimitive.Root {...merge} />
}

export const PopoverContent: ParentComponent<
	PopoverPrimitive.PopoverContentProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class", "children"])
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				class={cn(
					"z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95",
					local.class
				)}
				{...rest}
			>
				{local.children}
				<PopoverPrimitive.CloseButton class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
					<TbX class="h-4 w-4" />
					<span class="sr-only">Close</span>
				</PopoverPrimitive.CloseButton>
			</PopoverPrimitive.Content>
		</PopoverPrimitive.Portal>
	)
}

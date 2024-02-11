import { cn } from "@/lib/cn"
import { Select as SelectPrimitive } from "@kobalte/core"
import type { VoidComponent } from "solid-js"
import { splitProps, type ParentComponent } from "solid-js"

export const Select = SelectPrimitive.Root
export const SelectValue = SelectPrimitive.Value
export const SelectDescription = SelectPrimitive.Description
export const SelectErrorMessage = SelectPrimitive.ErrorMessage
export const SelectItemDescription = SelectPrimitive.ItemDescription
export const SelectHiddenSelect = SelectPrimitive.HiddenSelect

export const SelectTrigger: ParentComponent<
	SelectPrimitive.SelectTriggerProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class", "children"])
	return (
		<SelectPrimitive.Trigger
			class={cn(
				"flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus-visible:ring focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
				local.class
			)}
			{...rest}
		>
			{local.children}
			<SelectPrimitive.Icon class="flex h-3.5 w-3.5 items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="1em"
					height="1em"
					viewBox="0 0 24 24"
					class="w-4 h-4 opacity-50"
				>
					<path
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m8 9l4-4l4 4m0 6l-4 4l-4-4"
					/>
				</svg>
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	)
}

export const SelectContent: VoidComponent<
	SelectPrimitive.SelectContentProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				class={cn(
					"relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95",
					local.class
				)}
				{...rest}
			>
				<SelectPrimitive.Listbox class="p-1" />
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	)
}

export const SelectItem: ParentComponent<SelectPrimitive.SelectItemProps> = (
	props
) => {
	const [local, rest] = splitProps(props, ["class", "children"])
	return (
		<SelectPrimitive.Item
			class={cn(
				"relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				local.class
			)}
			{...rest}
		>
			<SelectPrimitive.ItemIndicator class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="w-4 h-4"
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
				</svg>
			</SelectPrimitive.ItemIndicator>
			<SelectPrimitive.ItemLabel>
				{local.children}
			</SelectPrimitive.ItemLabel>
		</SelectPrimitive.Item>
	)
}

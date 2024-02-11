import { cn } from "@/lib/cn"
import type { Dialog as DialogPrimitive } from "@kobalte/core"
import { Combobox as ComboboxPrimitive } from "@kobalte/core"
import type {
	ComponentProps,
	ParentProps,
	VoidComponent,
	VoidProps,
} from "solid-js"
import { splitProps, type ParentComponent } from "solid-js"
import { Dialog, DialogContent } from "./dialog"

export const CommandItemLabel = ComboboxPrimitive.ItemLabel

export const Command = <Option, OptGroup>(
	props: Omit<
		ParentProps<ComboboxPrimitive.ComboboxRootProps<Option, OptGroup>>,
		| "open"
		| "defaultOpen"
		| "multiple"
		| "value"
		| "defaultValue"
		| "removeOnBackspace"
		| "readOnly"
		| "allowsEmptyCollection"
	>
) => {
	const [local, rest] = splitProps(props, ["class"])

	return (
		<ComboboxPrimitive.Root
			// force render list
			open
			// @ts-ignore -- prevent select
			value=""
			allowsEmptyCollection
			class={cn(
				"flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
				local.class
			)}
			{...rest}
		/>
	)
}

export const CommandList = <Option, OptGroup>(
	props: VoidProps<ComboboxPrimitive.ComboboxListboxProps<Option, OptGroup>>
) => {
	const [local, rest] = splitProps(props, ["class"])

	return (
		<ComboboxPrimitive.Listbox
			cmdk-list=""
			class={cn(
				"max-h-[300px] overflow-y-auto overflow-x-hidden p-1",
				local.class
			)}
			{...rest}
		/>
	)
}

export const CommandInput: VoidComponent<
	ComboboxPrimitive.ComboboxInputProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class"])

	return (
		<ComboboxPrimitive.Control
			class="flex items-center border-b px-3"
			cmdk-input-wrapper=""
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				class="mr-2 h-4 w-4 shrink-0 opacity-50"
			>
				<path
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"
				/>
			</svg>
			<ComboboxPrimitive.Input
				cmdk-input=""
				class={cn(
					"flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
					local.class
				)}
				{...rest}
			/>
		</ComboboxPrimitive.Control>
	)
}

export const CommandItem: ParentComponent<
	ComboboxPrimitive.ComboboxItemProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class", "item"])

	return (
		<ComboboxPrimitive.Item
			item={local.item}
			cmdk-item=""
			class={cn(
				"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				local.class
			)}
			{...rest}
		/>
	)
}

export const CommandShortcut: ParentComponent<ComponentProps<"span">> = (
	props
) => {
	const [local, rest] = splitProps(props, ["class"])

	return (
		<span
			class={cn(
				"ml-auto text-xs tracking-widest text-muted-foreground",
				local.class
			)}
			{...rest}
		/>
	)
}

export const CommandHeading: ParentComponent<
	ComboboxPrimitive.ComboboxSectionProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class"])

	return (
		<ComboboxPrimitive.Section
			cmdk-heading=""
			class={cn(
				"text-muted-foreground px-2 py-1.5 text-xs font-medium [&:not(&:first-of-type)]:mt-2",
				local.class
			)}
			{...rest}
		/>
	)
}

export const CommandDialog = <Option, OptGroup>(
	props: DialogPrimitive.DialogRootProps &
		Omit<
			ParentProps<ComboboxPrimitive.ComboboxRootProps<Option, OptGroup>>,
			| "open"
			| "defaultOpen"
			| "multiple"
			| "value"
			| "defaultValue"
			| "removeOnBackspace"
			| "readOnly"
			| "allowsEmptyCollection"
		>
) => {
	const [local, rest] = splitProps(props, ["children"])

	return (
		<Dialog {...rest}>
			<DialogContent class="overflow-hidden p-0">
				<Command
					class="[&_[cmdk-heading]]:px-2 [&_[cmdk-heading]]:font-medium [&_[cmdk-heading]]:text-muted-foreground [&_[cmdk-list]:not([hidden])_~[cmdk-list]]:pt-0 [&_[cmdk-list]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
					{...rest}
				>
					{local.children}
				</Command>
			</DialogContent>
		</Dialog>
	)
}

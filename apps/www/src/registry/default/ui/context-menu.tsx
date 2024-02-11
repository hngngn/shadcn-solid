import { cn } from "@/lib/cn"
import { ContextMenu as ContextMenuPrimitive } from "@kobalte/core"
import type { ComponentProps, VoidComponent } from "solid-js"
import { splitProps, type ParentComponent } from "solid-js"

export const ContextMenu = ContextMenuPrimitive.Root
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger
export const ContextMenuGroup = ContextMenuPrimitive.Group
export const ContextMenuSub = ContextMenuPrimitive.Sub
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

export const ContextMenuSubTrigger: ParentComponent<
	ContextMenuPrimitive.ContextMenuSubTriggerProps & {
		inset?: boolean
	}
> = (props) => {
	const [local, rest] = splitProps(props, ["class", "children", "inset"])

	return (
		<ContextMenuPrimitive.SubTrigger
			class={cn(
				"flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[expanded]:bg-accent data-[expanded]:text-accent-foreground",
				local.inset && "pl-8",
				local.class
			)}
			{...rest}
		>
			{local.children}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="ml-auto w-4 h-4"
				viewBox="0 0 24 24"
			>
				<path
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="m9 6l6 6l-6 6"
				/>
			</svg>
		</ContextMenuPrimitive.SubTrigger>
	)
}

export const ContextMenuSubContent: ParentComponent<
	ContextMenuPrimitive.ContextMenuSubContentProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class"])

	return (
		<ContextMenuPrimitive.Portal>
			<ContextMenuPrimitive.SubContent
				class={cn(
					"z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95",
					local.class
				)}
				{...rest}
			/>
		</ContextMenuPrimitive.Portal>
	)
}

export const ContextMenuContent: ParentComponent<
	ContextMenuPrimitive.ContextMenuContentProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class"])

	return (
		<ContextMenuPrimitive.Portal>
			<ContextMenuPrimitive.Content
				class={cn(
					"z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95",
					local.class
				)}
				{...rest}
			/>
		</ContextMenuPrimitive.Portal>
	)
}

export const ContextMenuItem: ParentComponent<
	ContextMenuPrimitive.ContextMenuItemProps & {
		inset?: boolean
	}
> = (props) => {
	const [local, rest] = splitProps(props, ["class", "inset"])

	return (
		<ContextMenuPrimitive.Item
			class={cn(
				"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:(bg-accent text-accent-foreground) data-[disabled]:(pointer-events-none opacity-50)",
				local.inset && "pl-8",
				local.class
			)}
			{...rest}
		/>
	)
}

export const ContextMenuCheckboxItem: ParentComponent<
	ContextMenuPrimitive.ContextMenuCheckboxItemProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class", "children"])

	return (
		<ContextMenuPrimitive.CheckboxItem
			class={cn(
				"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				local.class
			)}
			{...rest}
		>
			<ContextMenuPrimitive.ItemIndicator class="absolute left-2 h-3.5 w-3.5 inline-flex items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="w-4 h-4"
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
			</ContextMenuPrimitive.ItemIndicator>
			{local.children}
		</ContextMenuPrimitive.CheckboxItem>
	)
}

export const ContextMenuRadioItem: ParentComponent<
	ContextMenuPrimitive.ContextMenuRadioItemProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class", "children"])

	return (
		<ContextMenuPrimitive.RadioItem
			class={cn(
				"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				local.class
			)}
			{...rest}
		>
			<ContextMenuPrimitive.ItemIndicator class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="h-2 w-2"
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
			</ContextMenuPrimitive.ItemIndicator>
			{local.children}
		</ContextMenuPrimitive.RadioItem>
	)
}

export const ContextMenuItemLabel: ParentComponent<
	ContextMenuPrimitive.ContextMenuItemLabelProps & {
		inset?: boolean
	}
> = (props) => {
	const [local, rest] = splitProps(props, ["class", "inset"])

	return (
		<ContextMenuPrimitive.ItemLabel
			class={cn(
				"px-2 py-1.5 text-sm font-semibold text-foreground",
				local.inset && "pl-8",
				local.class
			)}
			{...rest}
		/>
	)
}

export const ContextMenuGroupLabel: ParentComponent<
	ContextMenuPrimitive.ContextMenuGroupLabelProps & {
		inset?: boolean
	}
> = (props) => {
	const [local, rest] = splitProps(props, ["class", "inset"])

	return (
		<ContextMenuPrimitive.GroupLabel
			as="div"
			class={cn(
				"px-2 py-1.5 text-sm font-semibold text-foreground",
				local.inset && "pl-8",
				local.class
			)}
			{...rest}
		/>
	)
}

export const ContextMenuSeparator: VoidComponent<
	ContextMenuPrimitive.ContextMenuSeparatorProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class"])

	return (
		<ContextMenuPrimitive.Separator
			class={cn("-mx-1 my-1 h-px bg-border", local.class)}
			{...rest}
		/>
	)
}

export const ContextMenuShortcut: ParentComponent<ComponentProps<"span">> = (
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

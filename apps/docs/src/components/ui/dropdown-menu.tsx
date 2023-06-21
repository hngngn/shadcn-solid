import { DropdownMenu as DropdownMenuPrimitive } from "@kobalte/core"
import type {
	DropdownMenuContentProps,
	DropdownMenuItemProps,
} from "@kobalte/core/dist/types/dropdown-menu"
import { splitProps, type ParentComponent } from "solid-js"

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal

export const DropdownMenuContent: ParentComponent<DropdownMenuContentProps> = (
	props
) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<DropdownMenuPrimitive.Content
			class="z-50 min-w-8rem overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

export const DropdownMenuItem: ParentComponent<DropdownMenuItemProps> = (
	props
) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<DropdownMenuPrimitive.Item
			class="relative flex cursor-default select-none items-center rounded-sm p-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground ui-disabled:(pointer-events-none opacity-50)"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

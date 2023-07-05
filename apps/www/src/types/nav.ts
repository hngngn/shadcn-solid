export type TNavItem = {
	title: string
	href?: string
	disabled?: boolean
	external?: boolean
	label?: string
}

export type TSidebarNavItem = TNavItem & {
	items: TSidebarNavItem[]
}

export type TNavItemWithChildren = TNavItem & {
	items: TNavItemWithChildren[]
}

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

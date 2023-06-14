import type { TNavItem, TSidebarNavItem } from "../types"

type TDocsConfig = {
	mainNav: TNavItem[]
	sidebarNav: TSidebarNavItem[]
}

export const docsConfig: TDocsConfig = {
	mainNav: [
		{
			title: "Documentation",
			href: "/docs",
		},
		{
			title: "Components",
			href: "/docs/components/accordion",
		},
		{
			title: "Examples",
			href: "/examples/dashboard",
		},
		{
			title: "Figma",
			href: "/docs/figma",
		},
	],
	sidebarNav: [
		{
			title: "Getting Started",
			items: [
				{
					title: "Introduction",
					href: "/docs",
					items: [],
				},
				{
					title: "Installation",
					href: "/docs/installation",
					items: [],
				},
				{
					title: "Theming",
					href: "/docs/theming",
					items: [],
				},
				{
					title: "CLI",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Typography",
					href: "/docs/typography",
					items: [],
				},
			],
		},
		{
			title: "Community",
			items: [
				{
					title: "Figma",
					href: "/docs/figma",
					items: [],
				},
			],
		},
		{
			title: "Forms",
			items: [
				{
					title: "Modular Forms",
					href: "#",
					label: "Soon",
					disabled: true,
					items: [],
				},
			],
		},
		{
			title: "Components",
			items: [
				{
					title: "Accordion",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Alert",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Alert Dialog",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Button",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Checkbox",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Collapsible",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Combobox",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Context Menu",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Data Table",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Dialog",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Dropdown Menu",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Hover Card",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Text Field",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Image",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Popover",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Progress",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Radio Group",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Select",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Separator",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Skeleton",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Switch",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Tabs",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Textarea",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Toast",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Toggle",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
				{
					title: "Tooltip",
					href: "#",
					items: [],
					label: "Soon",
					disabled: true,
				},
			],
		},
	],
}

import type { TNavItem, TSidebarNavItem } from "../types"

type TDocsConfig = {
	mainNav: TNavItem[]
	sidebarNav: TSidebarNavItem[]
}

export const docsConfig: TDocsConfig = {
	mainNav: [
		{
			title: "Documentation",
			href: "/docs/introduction",
		},
		{
			title: "Components",
			href: "/docs/components/accordion",
		},
		{
			title: "Examples",
			href: "/examples/dashboard",
		},
	],
	sidebarNav: [
		{
			title: "Getting Started",
			items: [
				{
					title: "Introduction",
					href: "/docs/introduction",
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
					href: "/docs/components/accordion",
					items: [],
				},
				{
					title: "Alert",
					href: "/docs/components/alert",
					items: [],
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
					href: "/docs/components/button",
					items: [],
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
					href: "/docs/components/collapsible",
					items: [],
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
					title: "Sheet",
					href: "/docs/components/sheet",
					items: [],
					label: "New",
				},
				{
					title: "Dropdown Menu",
					href: "/docs/components/dropdown-menu",
					items: [],
				},
				{
					title: "Card",
					href: "/docs/components/card",
					items: [],
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
					href: "/docs/components/textfield",
					items: [],
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
					href: "/docs/components/separator",
					items: [],
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
					href: "/docs/components/switch",
					items: [],
				},
				{
					title: "Tabs",
					href: "/docs/components/tabs",
					items: [],
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

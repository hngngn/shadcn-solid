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
        // {
        //     title: "Examples",
        //     href: "/examples/dashboard",
        // },
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
                    title: "Dark mode",
                    href: "/docs/dark-mode",
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
                {
                    title: "Figma",
                    href: "/docs/figma",
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
                    href: "/docs/components/alert-dialog",
                    items: [],
                },
                {
                    title: "Button",
                    href: "/docs/components/button",
                    items: [],
                },
                {
                    title: "Card",
                    href: "/docs/components/card",
                    items: [],
                },
                {
                    title: "Checkbox",
                    href: "/docs/components/checkbox",
                    items: [],
                },
                {
                    title: "Collapsible",
                    href: "/docs/components/collapsible",
                    items: [],
                },
                {
                    title: "Combobox",
                    href: "/docs/components/combobox",
                    items: [],
                },
                {
                    title: "Context Menu",
                    href: "/docs/components/context-menu",
                    items: [],
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
                    href: "/docs/components/dialog",
                    items: [],
                },
                {
                    title: "Dropdown Menu",
                    href: "/docs/components/dropdown-menu",
                    items: [],
                },
                {
                    title: "Hover Card",
                    href: "/docs/components/hover-card",
                    items: [],
                },
                {
                    title: "Image",
                    href: "/docs/components/image",
                    items: [],
                },
                {
                    title: "Popover",
                    href: "/docs/components/popover",
                    items: [],
                },
                {
                    title: "Progress",
                    href: "/docs/components/progress",
                    items: [],
                },
                {
                    title: "Radio Group",
                    href: "/docs/components/radio-group",
                    items: [],
                },
                {
                    title: "Select",
                    href: "/docs/components/select",
                    items: [],
                },
                {
                    title: "Separator",
                    href: "/docs/components/separator",
                    items: [],
                },
                {
                    title: "Sheet",
                    href: "/docs/components/sheet",
                    items: [],
                },
                {
                    title: "Skeleton",
                    href: "/docs/components/skeleton",
                    items: [],
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
                    title: "Text Field",
                    href: "/docs/components/textfield",
                    items: [],
                },
                {
                    title: "Textarea",
                    href: "/docs/components/textarea",
                    items: [],
                },
                {
                    title: "Toast",
                    href: "/docs/components/toast",
                    items: [],
                },
                {
                    title: "Toggle",
                    href: "/docs/components/toggle",
                    items: [],
                },
                {
                    title: "Tooltip",
                    href: "/docs/components/tooltip",
                    items: [],
                },
            ],
        },
    ],
}
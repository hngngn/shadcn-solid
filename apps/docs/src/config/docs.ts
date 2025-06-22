export interface TNavItem {
  title: string
  href?: string
  disabled?: boolean
  indicator?: "new" | "updated"
}

export type TSidebarNavItem = TNavItem & {
  items: TSidebarNavItem[]
}

export type TNavItemWithChildren = TNavItem & {
  items: TNavItemWithChildren[]
}

export interface TDocsConfig {
  mainNav: TNavItem[]
  sidebarNav: TSidebarNavItem[]
}

export const docsConfig: TDocsConfig = {
  mainNav: [
    {
      title: "Docs",
      href: "/docs/introduction",
    },
    {
      title: "Components",
      href: "/docs/components/accordion",
    },
    // {
    //   title: "Blocks",
    //   href: "/blocks",
    // },
    // {
    //   title: "Charts",
    //   href: "/charts",
    // },
  ],
  sidebarNav: [
    {
      title: "Get Started",
      items: [
        {
          title: "Introduction",
          href: "/docs/introduction",
          items: [],
        },
        {
          title: "components.json",
          href: "/docs/components-json",
          items: [],
          disabled: true,
        },
        {
          title: "Theming",
          href: "/docs/theming",
          items: [],
          disabled: true,
        },
        {
          title: "Dark mode",
          href: "/docs/dark-mode",
          items: [],
          disabled: true,
        },
        {
          title: "CLI",
          href: "/docs/cli",
          items: [],
          disabled: true,
        },
      ],
    },
    // {
    //   title: "Installation",
    //   items: [
    //     {
    //       title: "Solid Start",
    //       href: "/docs/installation/solid-start",
    //       items: [],
    //     },
    //     {
    //       title: "Astro",
    //       href: "/docs/installation/astro",
    //       items: [],
    //     },
    //     {
    //       title: "Manual",
    //       href: "/docs/installation/manual",
    //       items: [],
    //     },
    //   ],
    // },
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
          title: "Badge",
          href: "/docs/components/badge",
          items: [],
        },
        {
          title: "Breadcrumbs",
          href: "/docs/components/breadcrumbs",
          items: [],
          indicator: "new",
        },
        {
          title: "Button",
          href: "/docs/components/button",
          items: [],
        },
        {
          title: "Calendar",
          href: "/docs/components/calendar",
          items: [],
          indicator: "new",
        },
        {
          title: "Card",
          href: "/docs/components/card",
          items: [],
        },
        {
          title: "Carousel",
          href: "/docs/components/carousel",
          items: [],
        },
        {
          title: "Chart",
          href: "/docs/components/chart",
          items: [],
          indicator: "new",
          disabled: true,
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
          title: "Command",
          href: "/docs/components/command",
          items: [],
        },
        {
          title: "Context Menu",
          href: "/docs/components/context-menu",
          items: [],
        },
        {
          title: "Data Table",
          href: "/docs/components/data-table",
          items: [],
          disabled: true,
        },
        {
          title: "Date Picker",
          href: "/docs/components/date-picker",
          items: [],
          indicator: "updated",
        },
        {
          title: "Dialog",
          href: "/docs/components/dialog",
          items: [],
        },
        {
          title: "Drawer",
          href: "/docs/components/drawer",
          items: [],
          indicator: "updated",
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
          title: "Menubar",
          href: "/docs/components/menubar",
          items: [],
        },
        {
          title: "Navigation Menu",
          href: "/docs/components/navigation-menu",
          items: [],
        },
        {
          title: "Number Field",
          href: "/docs/components/number-field",
          items: [],
        },
        {
          title: "OTP Field",
          href: "/docs/components/otp-field",
          items: [],
        },
        {
          title: "Pagination",
          href: "/docs/components/pagination",
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
          title: "Resizable",
          href: "/docs/components/resizable",
          items: [],
          disabled: true,
        },
        {
          title: "Select",
          href: "/docs/components/select",
          items: [],
          disabled: true,
        },
        {
          title: "Separator",
          href: "/docs/components/separator",
          items: [],
          disabled: true,
        },
        {
          title: "Sidebar",
          href: "/docs/components/sidebar",
          items: [],
          indicator: "new",
          disabled: true,
        },
        {
          title: "Skeleton",
          href: "/docs/components/skeleton",
          items: [],
          disabled: true,
        },
        {
          title: "Slider",
          href: "/docs/components/slider",
          items: [],
          indicator: "new",
        },
        {
          title: "Sonner",
          href: "/docs/components/sonner",
          items: [],
          disabled: true,
        },
        {
          title: "Switch",
          href: "/docs/components/switch",
          items: [],
          disabled: true,
        },
        {
          title: "Table",
          href: "/docs/components/table",
          items: [],
          disabled: true,
        },
        {
          title: "Tabs",
          href: "/docs/components/tabs",
          items: [],
          disabled: true,
        },
        {
          title: "Text Field",
          href: "/docs/components/text-field",
          items: [],
        },
        {
          title: "Toast",
          href: "/docs/components/toast",
          items: [],
          disabled: true,
        },
        {
          title: "Toggle Group",
          href: "/docs/components/toggle-group",
          items: [],
          disabled: true,
        },
        {
          title: "Toggle",
          href: "/docs/components/toggle",
          items: [],
          disabled: true,
        },
        {
          title: "Tooltip",
          href: "/docs/components/tooltip",
          items: [],
          disabled: true,
        },
      ],
    },
  ],
}

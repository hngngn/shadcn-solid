import { createSignal } from "solid-js"
import MiniSearch from "minisearch"

import {
  Search,
  SearchControl,
  SearchItem,
  SearchItemLabel,
  SearchListbox,
  SearchNoResult,
} from "@repo/tailwindcss/ui/v4/search"

interface TNavItem {
  title: string
  href?: string
  disabled?: boolean
}

const docsConfig: TNavItem[] = [
  {
    title: "Accordion",
    href: "/docs/components/accordion",
    disabled: false,
  },
  {
    title: "Alert",
    href: "/docs/components/alert",
    disabled: false,
  },
  {
    title: "Alert Dialog",
    href: "/docs/components/alert-dialog",
    disabled: false,
  },
  {
    title: "Badge",
    href: "/docs/components/badge",
    disabled: false,
  },
  {
    title: "Breadcrumbs",
    href: "/docs/components/breadcrumbs",
    disabled: false,
  },
  {
    title: "Button",
    href: "/docs/components/button",
    disabled: false,
  },
  {
    title: "Calendar",
    href: "/docs/components/calendar",
    disabled: false,
  },
  {
    title: "Card",
    href: "/docs/components/card",
    disabled: false,
  },
  {
    title: "Carousel",
    href: "/docs/components/carousel",
    disabled: false,
  },
  {
    title: "Chart",
    href: "/docs/components/chart",
    disabled: true,
  },
  {
    title: "Checkbox",
    href: "/docs/components/checkbox",
    disabled: false,
  },
  {
    title: "Collapsible",
    href: "/docs/components/collapsible",
    disabled: false,
  },
  {
    title: "Combobox",
    href: "/docs/components/combobox",
    disabled: false,
  },
  {
    title: "Command",
    href: "/docs/components/command",
    disabled: false,
  },
  {
    title: "Context Menu",
    href: "/docs/components/context-menu",
    disabled: false,
  },
  {
    title: "Data Table",
    href: "/docs/components/data-table",
    disabled: true,
  },
  {
    title: "Date Picker",
    href: "/docs/components/date-picker",
    disabled: false,
  },
  {
    title: "Dialog",
    href: "/docs/components/dialog",
    disabled: false,
  },
  {
    title: "Drawer",
    href: "/docs/components/drawer",
    disabled: false,
  },
  {
    title: "Dropdown Menu",
    href: "/docs/components/dropdown-menu",
    disabled: false,
  },
  {
    title: "Hover Card",
    href: "/docs/components/hover-card",
    disabled: false,
  },
  {
    title: "Menubar",
    href: "/docs/components/menubar",
    disabled: false,
  },
  {
    title: "Navigation Menu",
    href: "/docs/components/navigation-menu",
    disabled: false,
  },
  {
    title: "Number Field",
    href: "/docs/components/number-field",
    disabled: false,
  },
  {
    title: "OTP Field",
    href: "/docs/components/otp-field",
    disabled: false,
  },
  {
    title: "Pagination",
    href: "/docs/components/pagination",
    disabled: false,
  },
  {
    title: "Popover",
    href: "/docs/components/popover",
    disabled: false,
  },
  {
    title: "Progress",
    href: "/docs/components/progress",
    disabled: false,
  },
  {
    title: "Radio Group",
    href: "/docs/components/radio-group",
    disabled: false,
  },
  {
    title: "Resizable",
    href: "/docs/components/resizable",
    disabled: false,
  },
  {
    title: "Search",
    href: "/docs/components/search",
    disabled: false,
  },
  {
    title: "Select",
    href: "/docs/components/select",
    disabled: true,
  },
  {
    title: "Separator",
    href: "/docs/components/separator",
    disabled: true,
  },
  {
    title: "Sidebar",
    href: "/docs/components/sidebar",
    disabled: true,
  },
  {
    title: "Skeleton",
    href: "/docs/components/skeleton",
    disabled: true,
  },
  {
    title: "Slider",
    href: "/docs/components/slider",
  },
  {
    title: "Sonner",
    href: "/docs/components/sonner",
    disabled: true,
  },
  {
    title: "Switch",
    href: "/docs/components/switch",
    disabled: true,
  },
  {
    title: "Table",
    href: "/docs/components/table",
    disabled: true,
  },
  {
    title: "Tabs",
    href: "/docs/components/tabs",
    disabled: true,
  },
  {
    title: "Text Field",
    href: "/docs/components/text-field",
  },
  {
    title: "Toast",
    href: "/docs/components/toast",
    disabled: true,
  },
  {
    title: "Toggle Group",
    href: "/docs/components/toggle-group",
    disabled: true,
  },
  {
    title: "Toggle",
    href: "/docs/components/toggle",
    disabled: true,
  },
  {
    title: "Tooltip",
    href: "/docs/components/tooltip",
    disabled: true,
  },
]

const minisearch = new MiniSearch<TNavItem>({
  idField: "href",
  fields: ["title"],
  storeFields: ["title"],
})
minisearch.addAll(docsConfig)

const SearchInlineDemo = () => {
  const [options, setOptions] = createSignal<TNavItem[]>([])

  return (
    <Search
      triggerMode="focus"
      debounceOptionsMillisecond={300}
      options={options()}
      onInputChange={(query) =>
        setOptions(
          minisearch.search(query, {
            prefix: true,
            fields: ["title"],
          }) as unknown as TNavItem[],
        )
      }
      optionValue="title"
      optionLabel="title"
      placeholder="Search components…"
      itemComponent={(props) => (
        <SearchItem item={props.item}>
          <SearchItemLabel>{props.item.rawValue.title}</SearchItemLabel>
        </SearchItem>
      )}
      class="w-full gap-0"
    >
      <SearchControl
        aria-label="Components Search"
        class="w-full rounded-b-none rounded-t-md"
      />
      <div class="bg-popover text-popover-foreground border-input min-h-40 rounded-b-md border border-t-0">
        <SearchListbox />
        <SearchNoResult>No component found</SearchNoResult>
      </div>
    </Search>
  )
}

export default SearchInlineDemo

import { For, type ParentProps } from "solid-js"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuDescription,
  NavigationMenuItem,
  NavigationMenuItemLabel,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const ListItem = (props: ParentProps<{ title: string; href: string }>) => {
  return (
    <NavigationMenuLink
      href={props.href}
      class="hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:ring-ring block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-[box-shadow,background-color] duration-200 focus-visible:outline-none focus-visible:ring-[1.5px]"
    >
      <NavigationMenuItemLabel class="text-sm font-medium leading-none">
        {props.title}
      </NavigationMenuItemLabel>
      <NavigationMenuDescription class="text-muted-foreground line-clamp-2 text-sm leading-snug">
        {props.children}
      </NavigationMenuDescription>
    </NavigationMenuLink>
  )
}

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Data Table",
    href: "/docs/components/data-table",
    description: "Powerful table and datagrids built using TanStack Table.",
  },
  {
    title: "Date Picker",
    href: "/docs/components/date-picker",
    description:
      "A component that allows users to select a date from a calendar.",
  },
  {
    title: "OTP Field",
    href: "/docs/components/otp-field",
    description: "An accessible and customizable OTP Input component.",
  },
  {
    title: "Resizable",
    href: "/docs/components/resizable",
    description:
      "A component that divides your interface into resizable sections.",
  },
  {
    title: "Sonner",
    href: "/docs/components/sonner",
    description: "An opinionated toast component for Solid.",
  },
  {
    title: "Toggle Group",
    href: "/docs/components/toggle-group",
    description:
      "A set of two-state buttons that can be toggled on (pressed) or off (not pressed).",
  },
]

const NavigationMenuDemo = () => {
  return (
    <NavigationMenu>
      <NavigationMenuItem>
        <NavigationMenuTrigger class="focus-visible:ring-ring data-[expanded]:bg-accent transition-[box-shadow,background-color] focus-visible:outline-none focus-visible:ring-[1.5px]">
          Learn
        </NavigationMenuTrigger>
        <NavigationMenuContent class="grid w-[400px] gap-3 p-4 lg:w-[500px] lg:grid-cols-[.75fr_1fr] [&>li:first-of-type]:row-span-3">
          <NavigationMenuLink
            href="/"
            class="from-muted/50 to-muted focus-visible:ring-ring flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none transition-shadow duration-200 hover:shadow-md focus-visible:shadow-md focus-visible:ring-[1.5px]"
          >
            <NavigationMenuItemLabel class="mb-2 mt-4 text-lg font-medium">
              shadcn-solid
            </NavigationMenuItemLabel>
            <NavigationMenuDescription class="text-muted-foreground text-sm leading-tight">
              Beautifully designed components built with your choice of UI and
              CSS frameworks
            </NavigationMenuDescription>
          </NavigationMenuLink>
          <ListItem href="/docs" title="Introduction">
            Beautifully designed components built with your choice of UI and CSS
            frameworks
          </ListItem>
          <ListItem href="/docs/installation" title="Installation">
            How to install dependencies and structure your app.
          </ListItem>
          <ListItem href="/docs/components/typography" title="Typography">
            Styles for headings, paragraphs, lists...etc.
          </ListItem>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger class="focus-visible:ring-1.5px focus-visible:ring-ring data-[expanded]:bg-accent transition-[box-shadow,background-color] focus-visible:outline-none">
          Overview
        </NavigationMenuTrigger>
        <NavigationMenuContent class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
          <For each={components}>
            {(item) => (
              <ListItem href={item.href} title={item.title}>
                {item.description}
              </ListItem>
            )}
          </For>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuTrigger
        as="a"
        href="/docs"
        class="focus-visible:ring-ring data-[expanded]:bg-accent transition-[box-shadow,background-color] focus-visible:outline-none focus-visible:ring-[1.5px]"
      >
        Documentation
      </NavigationMenuTrigger>
    </NavigationMenu>
  )
}

export default NavigationMenuDemo

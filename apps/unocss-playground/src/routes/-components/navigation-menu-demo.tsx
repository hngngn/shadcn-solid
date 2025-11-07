import { For } from "solid-js"
import type { ParentProps } from "solid-js"

import { useIsMobile } from "@/registry/hooks/use-mobile"
import {
  NavigationItemDescription,
  NavigationItemLabel,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuPortal,
  NavigationMenuTrigger,
} from "@/registry/ui/navigation-menu"

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

const ListItem = (props: ParentProps<{ title: string; href: string }>) => {
  return (
    <NavigationMenuItem href={props.href}>
      <NavigationItemLabel>{props.title}</NavigationItemLabel>
      <NavigationItemDescription>{props.children}</NavigationItemDescription>
    </NavigationMenuItem>
  )
}

const NavigationMenuDemo = () => {
  const isMobile = useIsMobile()

  return (
    <NavigationMenu viewport={!isMobile()}>
      <NavigationMenuList>
        <NavigationMenuTrigger>Home</NavigationMenuTrigger>
        <NavigationMenuPortal>
          <NavigationMenuContent class="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] [&>li:first-of-type]:row-span-3">
            <NavigationMenuItem
              href="/"
              class="from-muted/50 to-muted bg-linear-to-b outline-none flex h-full w-full select-none flex-col justify-end rounded-md p-6 no-underline focus:shadow-md"
            >
              <NavigationItemLabel class="mb-2 mt-4 text-lg font-medium">
                shadcn-solid
              </NavigationItemLabel>
              <NavigationItemDescription class="text-muted-foreground text-sm leading-tight">
                Beautifully designed components built with your choice of UI and
                CSS frameworks.
              </NavigationItemDescription>
            </NavigationMenuItem>
            <ListItem href="/docs" title="Introduction">
              Beautifully designed components built with your choice of UI and
              CSS frameworks.
            </ListItem>
            <ListItem href="/docs/installation" title="Installation">
              How to install dependencies and structure your app.
            </ListItem>
            <ListItem href="/docs/components/typography" title="Typography">
              Styles for headings, paragraphs, lists...etc.
            </ListItem>
          </NavigationMenuContent>
        </NavigationMenuPortal>
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuTrigger>Documentation</NavigationMenuTrigger>
        <NavigationMenuPortal>
          <NavigationMenuContent class="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
            <For each={components}>
              {(component) => (
                <ListItem title={component.title} href={component.href}>
                  {component.description}
                </ListItem>
              )}
            </For>
          </NavigationMenuContent>
        </NavigationMenuPortal>
      </NavigationMenuList>

      <NavigationMenuTrigger as="a" href="/docs">
        Docs
      </NavigationMenuTrigger>
    </NavigationMenu>
  )
}

export default NavigationMenuDemo

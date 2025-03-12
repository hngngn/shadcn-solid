import {
  For,
  splitProps,
  type Accessor,
  type ComponentProps,
  type JSXElement,
} from "solid-js"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/registry/tailwindcss/ui/sidebar"

const NavSecondary = (
  props: ComponentProps<typeof SidebarGroup> & {
    items: {
      title: string
      url: string
      icon: Accessor<JSXElement>
    }[]
  }
) => {
  const [local, rest] = splitProps(props, ["items"])

  return (
    <SidebarGroup {...rest}>
      <SidebarGroupContent>
        <SidebarMenu>
          <For each={local.items}>
            {(item) => (
              <SidebarMenuItem>
                <SidebarMenuButton as="a" size="sm" href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </For>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export default NavSecondary

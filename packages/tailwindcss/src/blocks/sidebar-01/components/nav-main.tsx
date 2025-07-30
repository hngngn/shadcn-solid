import { For, Show, type Accessor, type JSX } from "solid-js"
import type { CollapsibleRootProps } from "@kobalte/core/collapsible"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/tailwindcss/ui/v4/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@repo/tailwindcss/ui/v4/sidebar"

const NavMain = (props: {
  items: {
    title: string
    url: string
    icon?: Accessor<JSX.Element>
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        <For each={props.items}>
          {(item) => (
            <Collapsible
              defaultOpen={item.isActive}
              as={(props: CollapsibleRootProps) => (
                <SidebarMenuItem {...props}>
                  <CollapsibleTrigger<typeof SidebarMenuButton>
                    as={(props) => (
                      <SidebarMenuButton
                        {...props}
                        tooltip={item.title}
                        class="aria-expanded:[&>svg:last-of-type]:rotate-90"
                      >
                        <Show when={item.icon!()}>{item.icon!()}</Show>
                        <span>{item.title}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="ml-auto transition-transform duration-200"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m9 18l6-6l-6-6"
                          />
                        </svg>
                      </SidebarMenuButton>
                    )}
                  />
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <For each={item.items}>
                        {(subItem) => (
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton as="a" href={subItem.url}>
                              <span>{subItem.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )}
                      </For>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              )}
            />
          )}
        </For>
      </SidebarMenu>
    </SidebarGroup>
  )
}

export default NavMain

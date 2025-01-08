import { For, type Accessor, type JSX } from "solid-js"
import type { DropdownMenuTriggerProps } from "@kobalte/core/dropdown-menu"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/tailwindcss/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSideBar,
} from "@/registry/tailwindcss/ui/sidebar"

const NavProjects = (props: {
  projects: {
    name: string
    url: string
    icon: Accessor<JSX.Element>
  }[]
}) => {
  const { isMobile } = useSideBar()

  return (
    <SidebarGroup class="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        <For each={props.projects}>
          {(item) => (
            <SidebarMenuItem>
              <SidebarMenuButton as="a" href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </SidebarMenuButton>
              <DropdownMenu
                placement={isMobile() ? "bottom-end" : "right-start"}
              >
                <DropdownMenuTrigger
                  as={(props: DropdownMenuTriggerProps) => (
                    // @ts-expect-error
                    <SidebarMenuAction {...props} showOnHover>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="size-4"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        >
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="19" cy="12" r="1" />
                          <circle cx="5" cy="12" r="1" />
                        </g>
                      </svg>
                      <span class="sr-only">More</span>
                    </SidebarMenuAction>
                  )}
                />
                <DropdownMenuContent class="w-48 rounded-lg">
                  <DropdownMenuItem>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="text-muted-foreground size-4"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
                      />
                    </svg>
                    <span>View Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="text-muted-foreground size-4"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      >
                        <path d="m15 17l5-5l-5-5" />
                        <path d="M4 18v-2a4 4 0 0 1 4-4h12" />
                      </g>
                    </svg>
                    <span>Share Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="text-muted-foreground size-4"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m-6 5v6m4-6v6"
                      />
                    </svg>
                    <span>Delete Project</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          )}
        </For>
        <SidebarMenuItem>
          <SidebarMenuButton class="text-sidebar-foreground/70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="text-sidebar-foreground/70 size-4"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </g>
            </svg>
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

export default NavProjects

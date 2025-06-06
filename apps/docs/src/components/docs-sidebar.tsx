import type { ComponentProps } from "solid-js"
import { For, splitProps } from "solid-js"
import { Link } from "@tanstack/solid-router"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/tailwindcss/ui/v4/sidebar"
import { cx } from "@repo/tailwindcss/utils/cva"

import { docsConfig } from "@/config/docs"

const DocsSidebar = (props: ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar
      class="sticky top-[calc(var(--header-height)+1px)] z-30 hidden h-[calc(100svh-var(--header-height)-var(--footer-height))] bg-transparent lg:flex"
      collapsible="none"
      {...props}
    >
      <SidebarContent class="no-scrollbar px-2 pb-12">
        <div class="h-(--top-spacing) shrink-0" />
        <For each={docsConfig.sidebarNav}>
          {(item) => (
            <SidebarGroup>
              <SidebarGroupLabel class="text-muted-foreground font-medium">
                {item.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu class="gap-0.5">
                  <For each={item.items}>
                    {(item) => (
                      <SidebarMenuItem>
                        <SidebarMenuButton<typeof SidebarMenuButton>
                          as={(props) => {
                            const [local, rest] = splitProps(props, ["class"])

                            return (
                              <Link
                                to={item.href}
                                class={cx(
                                  local.class,
                                  "relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md",
                                )}
                                activeProps={{
                                  class: "bg-accent border-accent",
                                }}
                                {...rest}
                              >
                                {item.title}
                              </Link>
                            )
                          }}
                        />
                      </SidebarMenuItem>
                    )}
                  </For>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </For>
      </SidebarContent>
    </Sidebar>
  )
}

export default DocsSidebar

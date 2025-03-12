import { For } from "solid-js"
import { useBeforeLeave } from "@solidjs/router"

import { docsConfig } from "@/config/docs"
import { Button } from "@/registry/tailwindcss/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/registry/tailwindcss/ui/drawer"

import { Sidebar } from "./sidebar"

export const MobileNavbar = () => {
  return (
    <Drawer breakPoints={[0.75]}>
      {(props) => {
        useBeforeLeave(() => {
          props.setOpen(false)
        })

        return (
          <>
            <DrawerTrigger
              as={Button}
              variant="ghost"
              size="icon"
              class="mr-2 hover:bg-transparent md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="size-4"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 8h16M4 16h16"
                />
                <title>Open menu</title>
              </svg>
            </DrawerTrigger>
            <DrawerContent class="max-h-[60svh] [&>div:first-of-type]:h-1">
              <div class="overflow-y-auto p-6">
                <div class="flex flex-col gap-y-2">
                  <div class="flex flex-col text-sm">
                    <a
                      href="/"
                      class="text-foreground hover:text-foreground/80 px-2 py-1 transition-colors"
                    >
                      Home
                    </a>
                    <For each={docsConfig.mainNav}>
                      {(item) => (
                        <a
                          href={item.href}
                          class="text-foreground hover:text-foreground/80 px-2 py-1 transition-colors"
                        >
                          {item.title}
                        </a>
                      )}
                    </For>
                  </div>
                  <Sidebar />
                </div>
              </div>
            </DrawerContent>
          </>
        )
      }}
    </Drawer>
  )
}

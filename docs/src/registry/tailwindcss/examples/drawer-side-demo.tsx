import { For } from "solid-js"

import { cn } from "@/registry/tailwindcss/libs/cn"
import { Button } from "@/registry/tailwindcss/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/registry/tailwindcss/ui/drawer"

const SIDES = ["top", "right", "bottom", "left"] as const

const DrawerSideDemo = () => {
  return (
    <div class="grid grid-cols-2 gap-2">
      <For each={SIDES}>
        {(side) => (
          <Drawer side={side}>
            <DrawerTrigger as={Button} variant="outline">
              {side}
            </DrawerTrigger>
            <DrawerContent
              class={cn(
                (side === "bottom" || side === "top") && "h-64",
                (side === "right" || side === "left") && "w-64"
              )}
            />
          </Drawer>
        )}
      </For>
    </div>
  )
}

export default DrawerSideDemo

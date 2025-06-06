import { For } from "solid-js"

import { Button } from "@repo/tailwindcss/ui/v4/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerLabel,
  DrawerPortal,
  DrawerTrigger,
} from "@repo/tailwindcss/ui/v4/drawer"

const SIDES = ["top", "right", "bottom", "left"] as const

const DrawerSideDemo = () => {
  return (
    <div class="space-x-2">
      <For each={SIDES}>
        {(side) => (
          <Drawer side={side}>
            <DrawerTrigger<typeof Button>
              as={(props) => (
                <Button variant="outline" class="capitalize" {...props}>
                  {side}
                </Button>
              )}
            />
            <DrawerPortal>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerLabel>Move Goal</DrawerLabel>
                  <DrawerDescription>
                    Set your daily activity goal.
                  </DrawerDescription>
                </DrawerHeader>
                <div class="overflow-y-auto px-4 text-sm">
                  <h4 class="mb-4 text-lg font-medium leading-none">
                    Lorem Ipsum
                  </h4>
                  <For each={Array.from({ length: 10 })}>
                    {() => (
                      <p class="mb-4 leading-normal">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </p>
                    )}
                  </For>
                </div>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose<typeof Button>
                    as={(props) => (
                      <Button variant="outline" {...props}>
                        Cancel
                      </Button>
                    )}
                  />
                </DrawerFooter>
              </DrawerContent>
            </DrawerPortal>
          </Drawer>
        )}
      </For>
    </div>
  )
}

export default DrawerSideDemo

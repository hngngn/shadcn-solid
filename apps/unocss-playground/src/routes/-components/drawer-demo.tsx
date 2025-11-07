import { For, createSignal } from "solid-js"
import { VisStackedBar } from "@unovis/solid"

import { Button } from "@/registry/ui/button"
import type { ChartConfig } from "@/registry/ui/chart"
import { ChartContainer } from "@/registry/ui/chart"
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
} from "@/registry/ui/drawer"

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
]

type DataRecord = (typeof data)[number]

const chartConfig = {
  goal: {
    label: "Goal",
    color: "var(--primary)",
  },
} satisfies ChartConfig

const DrawerBottom = () => {
  const [goal, setGoal] = createSignal(350)

  const onClick = (adjustment: number) => {
    setGoal((prevGoal) => Math.max(200, Math.min(400, prevGoal + adjustment)))
  }

  return (
    <Drawer>
      <DrawerTrigger<typeof Button>
        as={(props) => (
          <Button variant="outline" {...props}>
            Open Drawer
          </Button>
        )}
      />
      <DrawerPortal>
        <DrawerContent withHandle>
          <div class="mx-auto w-full max-w-sm">
            <DrawerHeader class="text-center">
              <DrawerLabel>Move Goal</DrawerLabel>
              <DrawerDescription>
                Set your daily activity goal.
              </DrawerDescription>
            </DrawerHeader>
            <div class="p-4 pb-0">
              <div class="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  class="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => {
                    onClick(-10)
                  }}
                  disabled={goal() <= 200}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-4"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 12h14"
                    />
                  </svg>
                  <span class="sr-only">Decrease</span>
                </Button>
                <div class="flex-1 text-center">
                  <div class="text-7xl font-bold tracking-tighter">
                    {goal()}
                  </div>
                  <div class="text-muted-foreground text-.70rem uppercase">
                    Calories/day
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  class="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => {
                    onClick(-10)
                  }}
                  disabled={goal() <= 200}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-4"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 12h14m-7-7v14"
                    />
                  </svg>
                  <span class="sr-only">Increase</span>
                </Button>
              </div>
              <div class="mt-3 h-120px">
                <ChartContainer
                  type="xy"
                  config={chartConfig}
                  data={data}
                  class="size-full"
                >
                  <VisStackedBar<DataRecord>
                    x={(_, i) => i}
                    y={(d) => d.goal}
                    color="var(--color-goal)"
                    roundedCorners={4}
                  />
                </ChartContainer>
              </div>
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose as={Button} variant="outline">
                Cancel
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  )
}

const SIDES = ["top", "right", "bottom", "left"] as const

const DrawerDirection = () => {
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

const DrawerDemo = () => {
  return (
    <div class="flex flex-wrap items-start gap-4">
      <DrawerBottom />
      <DrawerDirection />
    </div>
  )
}

export default DrawerDemo

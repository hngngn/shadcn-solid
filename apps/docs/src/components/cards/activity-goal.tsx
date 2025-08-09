import { createSignal } from "solid-js"
import { VisStackedBar } from "@unovis/solid"

import { Button } from "@repo/tailwindcss/ui/v4/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/tailwindcss/ui/v4/card"
import type { ChartConfig } from "@repo/tailwindcss/ui/v4/chart"
import { ChartContainer } from "@repo/tailwindcss/ui/v4/chart"

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

const CardsActivityGoal = () => {
  const [goal, setGoal] = createSignal(350)

  const handleOnClick = (adjustment: number) => {
    setGoal(Math.max(200, Math.min(400, goal() + adjustment)))
  }

  return (
    <Card class="h-full gap-5">
      <CardHeader>
        <CardTitle>Move Goal</CardTitle>
        <CardDescription>Set your daily activity goal.</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-1 flex-col">
        <div class="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            class="size-7 rounded-full"
            onClick={() => {
              handleOnClick(-10)
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
          <div class="text-center">
            <div class="text-4xl font-bold tracking-tighter tabular-nums">
              {goal()}
            </div>
            <div class="text-muted-foreground text-xs uppercase">
              Calories/day
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            class="size-7 rounded-full"
            onClick={() => {
              handleOnClick(10)
            }}
            disabled={goal() >= 400}
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
        <ChartContainer
          type="xy"
          config={chartConfig}
          data={data}
          class="h-[60px]"
        >
          <VisStackedBar<DataRecord>
            x={(_, i) => i}
            y={(d) => d.goal}
            color="var(--color-goal)"
            roundedCorners={4}
          />
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <Button class="w-full" variant="secondary">
          Set Goal
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CardsActivityGoal

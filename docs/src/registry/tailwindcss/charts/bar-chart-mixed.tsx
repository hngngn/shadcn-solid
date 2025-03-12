import { render } from "solid-js/web"
import { VisAxis, VisStackedBar, VisTooltip } from "@unovis/solid"
import { Direction, Orientation, StackedBar } from "@unovis/ts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/tailwindcss/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/registry/tailwindcss/ui/chart"

type DataRecord = {
  browser: string
  visitors: number
  fill: string
}

const data: DataRecord[] = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

const BarChartMixed = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart- Mixed</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent class="">
        <ChartContainer
          config={chartConfig}
          type="xy"
          data={data}
          yDirection={Direction.South}
        >
          <VisStackedBar<DataRecord>
            x={(_, i) => i}
            y={(d) => d.visitors}
            color={(d) => d.fill}
            roundedCorners={5}
            orientation={Orientation.Horizontal}
          />
          <VisAxis<DataRecord>
            type="y"
            tickFormat={(_, i) =>
              chartConfig[data[i].browser as keyof typeof chartConfig].label
            }
            gridLine={false}
            tickLine={false}
            domainLine={false}
            numTicks={data.length}
          />
          <VisTooltip
            triggers={{
              [StackedBar.selectors.bar]: (d: DataRecord, x) => {
                const container = document.createElement("div")
                const Component = () => (
                  <ChartTooltipContent
                    data={d}
                    x={x}
                    config={chartConfig}
                    labelKey="browser"
                    hideLabel
                  />
                )
                render(() => <Component />, container)
                return container.innerHTML
              },
            }}
          />
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div class="flex w-full items-start gap-2 text-sm">
          <div class="grid gap-2">
            <div class="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month{" "}
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
                  <path d="m22 7l-8.5 8.5l-5-5L2 17" />
                  <path d="M16 7h6v6" />
                </g>
              </svg>
            </div>
            <div class="text-muted-foreground flex items-center gap-2 leading-none">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default BarChartMixed

import { render } from "solid-js/web"
import { VisAxis, VisStackedBar, VisTooltip } from "@unovis/solid"
import { StackedBar } from "@unovis/ts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/registry/ui/chart"

interface DataRecord {
  browser: string
  visitors: number
  fill: string
}

const data: DataRecord[] = [
  { browser: "chrome", visitors: 187, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 275, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

const BarChartActive = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart- Active</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent class="">
        <ChartContainer
          config={chartConfig}
          type="xy"
          data={data}
          yDomain={[0, 310]}
        >
          <style
            innerText={`path[data-stacked-bar-active=true] {
					--vis-stacked-bar-stroke-color: ${data.find((d) => d.browser === "firefox")?.fill};
					--vis-stacked-bar-stroke-width: 2;
					--vis-stacked-bar-hover-stroke-color: var(--vis-stacked-bar-stroke-color);
					--vis-stacked-bar-hover-stroke-width: var(--vis-stacked-bar-stroke-width);
					}`}
          />
          <VisStackedBar<DataRecord>
            id={(d) => `stacked-bar-${d.browser}`}
            x={(_, i) => i}
            y={(d) => d.visitors}
            color={(d) => d.fill}
            roundedCorners={8}
            attributes={{
              [StackedBar.selectors.bar]: {
                "stroke-width": 2,
                "stroke-dasharray": 4,
                "stroke-dashoffset": 4,
                "fill-opacity": 0.8,
                "data-stacked-bar-active": (d) => d.browser === "firefox",
              },
            }}
          />
          <VisAxis<DataRecord>
            type="x"
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
            <div class="flex items-center gap-2 leading-none font-medium">
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

export default BarChartActive

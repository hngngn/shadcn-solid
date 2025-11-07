import { render } from "solid-js/web"
import { VisAxis, VisStackedBar, VisTooltip } from "@unovis/solid"
import { StackedBar } from "@unovis/ts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/registry/ui/chart"

interface DataRecord {
  date: string
  running: number
  swimming: number
}

const data: DataRecord[] = [
  { date: "2024-07-15", running: 450, swimming: 300 },
  { date: "2024-07-16", running: 380, swimming: 420 },
  { date: "2024-07-17", running: 520, swimming: 120 },
  { date: "2024-07-18", running: 140, swimming: 550 },
  { date: "2024-07-19", running: 600, swimming: 350 },
  { date: "2024-07-20", running: 480, swimming: 400 },
]

const chartConfig = {
  running: {
    label: "Running",
    color: "var(--chart-1)",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0m16 4v-2.38c0-2.12 1.03-3.12 1-5.62c-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0m-4-3h4M4 13h4"
        />
      </svg>
    ),
  },
  swimming: {
    label: "Swimming",
    color: "var(--chart-2)",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2c2.5 0 2.5-2 5-2c1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1c2.5 0 2.5-2 5-2c2.6 0 2.4 2 5 2c2.5 0 2.5-2 5-2c1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1c2.5 0 2.5-2 5-2c2.6 0 2.4 2 5 2c2.5 0 2.5-2 5-2c1.3 0 1.9.5 2.5 1"
        />
      </svg>
    ),
  },
} satisfies ChartConfig

const ChartTooltipIcon = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tooltip - Icon</CardTitle>
        <CardDescription>Tooltip with icons.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} type="xy" data={data}>
          <VisStackedBar<DataRecord>
            x={(_, i) => i}
            y={[(d) => d.running, (d) => d.swimming]}
            color={["var(--color-running)", "var(--color-swimming)"]}
            roundedCorners={4}
          />
          <VisAxis<DataRecord>
            type="x"
            gridLine={false}
            tickLine={false}
            domainLine={false}
            numTicks={data.length}
            tickFormat={(d) =>
              new Date(data[d as number].date).toLocaleDateString("en-US", {
                weekday: "short",
              })
            }
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
                    labelKey="date"
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
    </Card>
  )
}

export default ChartTooltipIcon

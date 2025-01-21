import { render } from "solid-js/web"
import { VisAxis, VisStackedBar, VisTooltip } from "@unovis/solid"
import { StackedBar } from "@unovis/ts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/tailwindcss/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/registry/tailwindcss/ui/chart"

type DataRecord = {
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
    color: "hsl(var(--chart-1))",
  },
  swimming: {
    label: "Swimming",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const ChartTooltipLine = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tooltip - Line Indicator</CardTitle>
        <CardDescription>Tooltip with line indicator.</CardDescription>
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
                    indicator="line"
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

export default ChartTooltipLine

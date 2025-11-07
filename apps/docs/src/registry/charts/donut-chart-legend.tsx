import { VisBulletLegend, VisDonut } from "@unovis/solid"
import type { BulletLegendItemInterface } from "@unovis/ts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/ui/card"
import { ChartContainer, type ChartConfig } from "@/registry/ui/chart"

interface DataRecord {
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

const DonutChartLegend = () => {
  const items = (): BulletLegendItemInterface[] => {
    return Object.entries(chartConfig)
      .filter(([key]) => key !== "visitors")
      .map(([_, config]) => ({
        name: config.label,
        // @ts-expect-error
        color: config.color,
      }))
  }

  return (
    <Card class="flex flex-col">
      <CardHeader class="items-center">
        <CardTitle>Donut Chart - Legend</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent class="flex-1 pb-0">
        <ChartContainer config={chartConfig} type="single">
          <VisDonut<DataRecord>
            data={data}
            value={(d) => d.visitors}
            color={(d) => d.fill}
            arcWidth={40}
          />
        </ChartContainer>
        <div class="flex items-center justify-center py-3 pt-6">
          <div class="w-2/3 [&>div]:!flex [&>div]:flex-wrap [&>div]:justify-center [&>div]:gap-2 [&>div>*]:flex [&>div>*]:basis-1/4 [&>div>*]:justify-center">
            <VisBulletLegend items={items()} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DonutChartLegend

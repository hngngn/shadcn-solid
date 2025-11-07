import {
  VisArea,
  VisAxis,
  VisBulletLegend,
  VisLine,
  VisTooltip,
} from "@unovis/solid"
import { CurveType, Position, type BulletLegendItemInterface } from "@unovis/ts"

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
  ChartCrosshair,
  ChartTooltipContent,
  type ChartConfig,
} from "@/registry/ui/chart"

interface DataRecord {
  month: string
  desktop: number
  mobile: number
}

const data: DataRecord[] = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const AreaChartLegend = () => {
  const items = (): BulletLegendItemInterface[] => {
    return Object.entries(chartConfig).map(([_, config]) => ({
      name: config.label,
      color: config.color,
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Legend</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent class="">
        <ChartContainer
          config={chartConfig}
          type="xy"
          data={data}
          yDomain={[0, 620]}
        >
          <VisArea<DataRecord>
            x={(_, i) => i}
            y={[(d) => d.mobile, (d) => d.desktop]}
            color={["var(--color-mobile)", "var(--color-desktop)"]}
            opacity={0.4}
            curveType={CurveType.Natural}
          />
          <VisLine<DataRecord>
            x={(_, i) => i}
            y={[(d) => d.mobile, (d) => d.mobile + d.desktop]}
            color={["var(--color-mobile)", "var(--color-desktop)"]}
            curveType={CurveType.Natural}
            lineWidth={1}
          />
          <VisAxis<DataRecord>
            type="x"
            tickFormat={(d) => data[d as number].month.slice(0, 3)}
            gridLine={false}
            tickLine={false}
            domainLine={false}
            numTicks={data.length}
          />
          <ChartCrosshair<DataRecord>
            color={["var(--color-mobile)", "var(--color-desktop)"]}
            template={(props) => (
              <ChartTooltipContent
                labelKey="month"
                indicator="line"
                {...props}
              />
            )}
          />
          <VisTooltip horizontalPlacement={Position.Center} />
        </ChartContainer>
        <div class="flex items-center justify-center gap-4 pt-3">
          <VisBulletLegend items={items()} />
        </div>
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
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default AreaChartLegend

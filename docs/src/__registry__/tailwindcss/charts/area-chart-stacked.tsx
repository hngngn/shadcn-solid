import { VisArea, VisAxis, VisLine, VisTooltip } from "@unovis/solid"
import { CurveType, Position } from "@unovis/ts"

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
  ChartCrosshair,
  ChartTooltipContent,
  type ChartConfig,
} from "@/registry/tailwindcss/ui/chart"

type DataRecord = {
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
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const AreaChartStacked = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Stacked</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent class="h-[300px]">
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
              <ChartTooltipContent labelKey="month" {...props} />
            )}
          />
          <VisTooltip horizontalPlacement={Position.Center} />
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
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default AreaChartStacked

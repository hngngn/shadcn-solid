import { render } from "solid-js/web"
import {
  VisArea,
  VisAxis,
  VisGroupedBar,
  VisLine,
  VisTooltip,
} from "@unovis/solid"
import { Area, CurveType, GroupedBar, Position } from "@unovis/ts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/ui/card"
import type { ChartConfig } from "@/registry/ui/chart"
import {
  ChartContainer,
  ChartCrosshair,
  ChartTooltipContent,
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

const BarChartMultiple = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent class="">
        <ChartContainer
          config={chartConfig}
          type="xy"
          data={data}
          yDomain={[0, 310]}
        >
          <VisGroupedBar<DataRecord>
            x={(_, i) => i}
            y={[(d) => d.desktop, (d) => d.mobile]}
            color={["var(--color-desktop)", "var(--color-mobile)"]}
            roundedCorners={4}
            barPadding={0.2}
          />
          <VisAxis<DataRecord>
            type="x"
            tickFormat={(d) => data[d as number].month.slice(0, 3)}
            gridLine={false}
            tickLine={false}
            domainLine={false}
            numTicks={data.length}
          />
          <VisTooltip
            triggers={{
              [GroupedBar.selectors.bar]: (d: DataRecord, x) => {
                const container = document.createElement("div")
                const Component = () => (
                  <ChartTooltipContent
                    data={d}
                    x={x}
                    config={chartConfig}
                    labelKey="month"
                    indicator="dashed"
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

const AreaChartGradient = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Gradient</CardTitle>
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
          <svg height={0} width={0}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stop-color="var(--color-desktop)"
                  stop-opacity={0.8}
                />
                <stop
                  offset="95%"
                  stop-color="var(--color-desktop)"
                  stop-opacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stop-color="var(--color-mobile)"
                  stop-opacity={0.8}
                />
                <stop
                  offset="95%"
                  stop-color="var(--color-mobile)"
                  stop-opacity={0.1}
                />
              </linearGradient>
            </defs>
          </svg>
          <VisArea<DataRecord>
            x={(_, i) => i}
            y={[(d) => d.mobile, (d) => d.desktop]}
            color="auto"
            opacity={0.4}
            curveType={CurveType.Natural}
            attributes={{
              [`${Area.selectors.area}:nth-child(1)`]: {
                fill: "url(#fillDesktop)",
              },
              [`${Area.selectors.area}:nth-child(2)`]: {
                fill: "url(#fillMobile)",
              },
            }}
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

const LineChartMultiple = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          type="xy"
          data={data}
          yDomain={[0, 310]}
        >
          <VisLine<DataRecord>
            x={(_, i) => i}
            y={(d) => d.desktop}
            color="var(--color-desktop)"
            curveType={CurveType.Natural}
          />{" "}
          <VisLine<DataRecord>
            x={(_, i) => i}
            y={(d) => d.mobile}
            color="var(--color-mobile)"
            curveType={CurveType.Natural}
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
            color={["var(--color-desktop)", "var(--color-mobile)"]}
            template={(props) => (
              <ChartTooltipContent labelKey="month" hideLabel {...props} />
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
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

const ChartDemo = () => {
  return (
    <>
      <AreaChartGradient />
      <BarChartMultiple />
      <LineChartMultiple />
    </>
  )
}

export default ChartDemo

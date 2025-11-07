import { For, createMemo, createSignal } from "solid-js"
import { VisAxis, VisLine, VisTooltip } from "@unovis/solid"
import { Position } from "@unovis/ts"

import { useIsMobile } from "@/registry/hooks/use-mobile"
import {
  Card,
  CardContent,
  CardDescription,
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
  date: string
  desktop: { view: number }
  mobile: { view: number }
}

const data: DataRecord[] = [
  { date: "2024-04-01", desktop: { view: 222 }, mobile: { view: 150 } },
  { date: "2024-04-02", desktop: { view: 97 }, mobile: { view: 180 } },
  { date: "2024-04-03", desktop: { view: 167 }, mobile: { view: 120 } },
  { date: "2024-04-04", desktop: { view: 242 }, mobile: { view: 260 } },
  { date: "2024-04-05", desktop: { view: 373 }, mobile: { view: 290 } },
  { date: "2024-04-06", desktop: { view: 301 }, mobile: { view: 340 } },
  { date: "2024-04-07", desktop: { view: 245 }, mobile: { view: 180 } },
  { date: "2024-04-08", desktop: { view: 409 }, mobile: { view: 320 } },
  { date: "2024-04-09", desktop: { view: 59 }, mobile: { view: 110 } },
  { date: "2024-04-10", desktop: { view: 261 }, mobile: { view: 190 } },
  { date: "2024-04-11", desktop: { view: 327 }, mobile: { view: 350 } },
  { date: "2024-04-12", desktop: { view: 292 }, mobile: { view: 210 } },
  { date: "2024-04-13", desktop: { view: 342 }, mobile: { view: 380 } },
  { date: "2024-04-14", desktop: { view: 137 }, mobile: { view: 220 } },
  { date: "2024-04-15", desktop: { view: 120 }, mobile: { view: 170 } },
  { date: "2024-04-16", desktop: { view: 138 }, mobile: { view: 190 } },
  { date: "2024-04-17", desktop: { view: 446 }, mobile: { view: 360 } },
  { date: "2024-04-18", desktop: { view: 364 }, mobile: { view: 410 } },
  { date: "2024-04-19", desktop: { view: 243 }, mobile: { view: 180 } },
  { date: "2024-04-20", desktop: { view: 89 }, mobile: { view: 150 } },
  { date: "2024-04-21", desktop: { view: 137 }, mobile: { view: 200 } },
  { date: "2024-04-22", desktop: { view: 224 }, mobile: { view: 170 } },
  { date: "2024-04-23", desktop: { view: 138 }, mobile: { view: 230 } },
  { date: "2024-04-24", desktop: { view: 387 }, mobile: { view: 290 } },
  { date: "2024-04-25", desktop: { view: 215 }, mobile: { view: 250 } },
  { date: "2024-04-26", desktop: { view: 75 }, mobile: { view: 130 } },
  { date: "2024-04-27", desktop: { view: 383 }, mobile: { view: 420 } },
  { date: "2024-04-28", desktop: { view: 122 }, mobile: { view: 180 } },
  { date: "2024-04-29", desktop: { view: 315 }, mobile: { view: 240 } },
  { date: "2024-04-30", desktop: { view: 454 }, mobile: { view: 380 } },
  { date: "2024-05-01", desktop: { view: 165 }, mobile: { view: 220 } },
  { date: "2024-05-02", desktop: { view: 293 }, mobile: { view: 310 } },
  { date: "2024-05-03", desktop: { view: 247 }, mobile: { view: 190 } },
  { date: "2024-05-04", desktop: { view: 385 }, mobile: { view: 420 } },
  { date: "2024-05-05", desktop: { view: 481 }, mobile: { view: 390 } },
  { date: "2024-05-06", desktop: { view: 498 }, mobile: { view: 520 } },
  { date: "2024-05-07", desktop: { view: 388 }, mobile: { view: 300 } },
  { date: "2024-05-08", desktop: { view: 149 }, mobile: { view: 210 } },
  { date: "2024-05-09", desktop: { view: 227 }, mobile: { view: 180 } },
  { date: "2024-05-10", desktop: { view: 293 }, mobile: { view: 330 } },
  { date: "2024-05-11", desktop: { view: 335 }, mobile: { view: 270 } },
  { date: "2024-05-12", desktop: { view: 197 }, mobile: { view: 240 } },
  { date: "2024-05-13", desktop: { view: 197 }, mobile: { view: 160 } },
  { date: "2024-05-14", desktop: { view: 448 }, mobile: { view: 490 } },
  { date: "2024-05-15", desktop: { view: 473 }, mobile: { view: 380 } },
  { date: "2024-05-16", desktop: { view: 338 }, mobile: { view: 400 } },
  { date: "2024-05-17", desktop: { view: 499 }, mobile: { view: 420 } },
  { date: "2024-05-18", desktop: { view: 315 }, mobile: { view: 350 } },
  { date: "2024-05-19", desktop: { view: 235 }, mobile: { view: 180 } },
  { date: "2024-05-20", desktop: { view: 177 }, mobile: { view: 230 } },
  { date: "2024-05-21", desktop: { view: 82 }, mobile: { view: 140 } },
  { date: "2024-05-22", desktop: { view: 81 }, mobile: { view: 120 } },
  { date: "2024-05-23", desktop: { view: 252 }, mobile: { view: 290 } },
  { date: "2024-05-24", desktop: { view: 294 }, mobile: { view: 220 } },
  { date: "2024-05-25", desktop: { view: 201 }, mobile: { view: 250 } },
  { date: "2024-05-26", desktop: { view: 213 }, mobile: { view: 170 } },
  { date: "2024-05-27", desktop: { view: 420 }, mobile: { view: 460 } },
  { date: "2024-05-28", desktop: { view: 233 }, mobile: { view: 190 } },
  { date: "2024-05-29", desktop: { view: 78 }, mobile: { view: 130 } },
  { date: "2024-05-30", desktop: { view: 340 }, mobile: { view: 280 } },
  { date: "2024-05-31", desktop: { view: 178 }, mobile: { view: 230 } },
  { date: "2024-06-01", desktop: { view: 178 }, mobile: { view: 200 } },
  { date: "2024-06-02", desktop: { view: 470 }, mobile: { view: 410 } },
  { date: "2024-06-03", desktop: { view: 103 }, mobile: { view: 160 } },
  { date: "2024-06-04", desktop: { view: 439 }, mobile: { view: 380 } },
  { date: "2024-06-05", desktop: { view: 88 }, mobile: { view: 140 } },
  { date: "2024-06-06", desktop: { view: 294 }, mobile: { view: 250 } },
  { date: "2024-06-07", desktop: { view: 323 }, mobile: { view: 370 } },
  { date: "2024-06-08", desktop: { view: 385 }, mobile: { view: 320 } },
  { date: "2024-06-09", desktop: { view: 438 }, mobile: { view: 480 } },
  { date: "2024-06-10", desktop: { view: 155 }, mobile: { view: 200 } },
  { date: "2024-06-11", desktop: { view: 92 }, mobile: { view: 150 } },
  { date: "2024-06-12", desktop: { view: 492 }, mobile: { view: 420 } },
  { date: "2024-06-13", desktop: { view: 81 }, mobile: { view: 130 } },
  { date: "2024-06-14", desktop: { view: 426 }, mobile: { view: 380 } },
  { date: "2024-06-15", desktop: { view: 307 }, mobile: { view: 350 } },
  { date: "2024-06-16", desktop: { view: 371 }, mobile: { view: 310 } },
  { date: "2024-06-17", desktop: { view: 475 }, mobile: { view: 520 } },
  { date: "2024-06-18", desktop: { view: 107 }, mobile: { view: 170 } },
  { date: "2024-06-19", desktop: { view: 341 }, mobile: { view: 290 } },
  { date: "2024-06-20", desktop: { view: 408 }, mobile: { view: 450 } },
  { date: "2024-06-21", desktop: { view: 169 }, mobile: { view: 210 } },
  { date: "2024-06-22", desktop: { view: 317 }, mobile: { view: 270 } },
  { date: "2024-06-23", desktop: { view: 480 }, mobile: { view: 530 } },
  { date: "2024-06-24", desktop: { view: 132 }, mobile: { view: 180 } },
  { date: "2024-06-25", desktop: { view: 141 }, mobile: { view: 190 } },
  { date: "2024-06-26", desktop: { view: 434 }, mobile: { view: 380 } },
  { date: "2024-06-27", desktop: { view: 448 }, mobile: { view: 490 } },
  { date: "2024-06-28", desktop: { view: 149 }, mobile: { view: 200 } },
  { date: "2024-06-29", desktop: { view: 103 }, mobile: { view: 160 } },
  { date: "2024-06-30", desktop: { view: 446 }, mobile: { view: 400 } },
]

const chartConfig = {
  view: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const LineChartInteractive = () => {
  const isMobile = useIsMobile()

  const numTicks = () => {
    if (isMobile()) {
      return 4
    }
    return 9
  }

  const [activeChart, setActiveChart] =
    createSignal<keyof typeof chartConfig>("desktop")

  const keys = createMemo(() =>
    // @ts-expect-error

    Object.keys(data[0][activeChart()]).map((i) => ({ view: i })),
  )

  const y = createMemo(() =>
    // @ts-expect-error
    // eslint-disable-next-line solid/reactivity
    keys().map((i) => (d: DataRecord) => d[activeChart()][i.view]),
  )

  const total = createMemo(() => ({
    desktop: data.reduce((acc, curr) => acc + curr.desktop.view, 0),
    mobile: data.reduce((acc, curr) => acc + curr.mobile.view, 0),
  }))

  return (
    <Card class="py-4 sm:py-0">
      <CardHeader class="flex flex-col items-stretch border-b p-0! sm:flex-row">
        <div class="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Line Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div class="flex">
          <For each={["desktop", "mobile"]}>
            {(key) => {
              const chart = key as keyof typeof chartConfig
              return (
                <button
                  data-active={activeChart() === chart}
                  class="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                  onClick={() => setActiveChart(chart)}
                >
                  <span class="text-muted-foreground text-xs">
                    {chartConfig[chart].label}
                  </span>
                  <span class="text-lg leading-none font-bold sm:text-3xl">
                    {total()[key as keyof typeof total]}
                  </span>
                </button>
              )
            }}
          </For>
        </div>
      </CardHeader>
      <CardContent class="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          type="xy"
          data={data}
          class="aspect-auto"
          height={250}
          width={"100%"}
          yDomain={[0, Math.max(...data.map((d) => d.mobile.view + 50))]}
        >
          <VisLine<DataRecord>
            x={(_, i) => i}
            y={y()}
            color={`var(--color-${activeChart()})`}
          />
          <VisAxis<DataRecord>
            type="x"
            tickFormat={(d) => {
              const date = new Date(data[d as number].date)
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            }}
            gridLine={false}
            tickLine={false}
            domainLine={false}
            numTicks={numTicks()}
          />
          <ChartCrosshair<DataRecord>
            color={`var(--color-${activeChart()})`}
            template={(props) => (
              <ChartTooltipContent
                labelKey="date"
                nameKey="view"
                labelFormatter={() =>
                  new Date(props.data.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                }
                {...props}
                data={{
                  date: props.data.date,
                  // @ts-expect-error
                  [activeChart()]: props.data[activeChart()],
                }}
              />
            )}
          />
          <VisTooltip horizontalPlacement={Position.Center} />
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default LineChartInteractive

import { createSignal } from "solid-js"
import {
  VisArea,
  VisAxis,
  VisBulletLegend,
  VisLine,
  VisTooltip,
} from "@unovis/solid"
import {
  Area,
  CurveType,
  Position,
  type BulletLegendItemInterface,
} from "@unovis/ts"

import { useIsMobile } from "@repo/tailwindcss/hooks/use-mobile"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/tailwindcss/ui/v4/card"
import {
  ChartContainer,
  ChartCrosshair,
  ChartTooltipContent,
  type ChartConfig,
} from "@repo/tailwindcss/ui/v4/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  SelectValue,
} from "@repo/tailwindcss/ui/v4/select"

interface DataRecord {
  date: string
  desktop: number
  mobile: number
}

const data: DataRecord[] = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
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

const selectData = [
  {
    label: "Last 3 months",
    value: "90d",
  },
  {
    label: "Last 30 days",
    value: "30d",
  },
  {
    label: "Last 7 days",
    value: "7d",
  },
]

const AreaChartInteractive = () => {
  const items = (): BulletLegendItemInterface[] => {
    return Object.entries(chartConfig).map(([_, config]) => ({
      name: config.label,
      color: config.color,
    }))
  }

  const [domain, setDomain] = createSignal<[number, number]>([
    data.findIndex((d) => d.date === "2024-04-01"),
    data.findIndex((d) => d.date === "2024-06-30"),
  ])
  const [selectedDuration, setSelectedDuration] = createSignal<
    (typeof selectData)[number] | null
  >(selectData[0])

  const handleSelectedDuration = (
    value: (typeof selectData)[number] | null,
  ) => {
    setSelectedDuration(value)
    setDomain([
      selectedDuration()?.value === "30d"
        ? data.findIndex((d) => d.date === "2024-06-01")
        : selectedDuration()?.value === "7d"
          ? data.findIndex((d) => d.date === "2024-06-24")
          : data.findIndex((d) => d.date === "2024-04-01"),
      data.length - 1,
    ])
  }

  const isMobile = useIsMobile()

  const numTicks = () => {
    if (isMobile()) {
      return 4
    }
    return 15
  }

  return (
    <Card class="pt-0">
      <CardHeader class="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div class="grid flex-1 gap-1">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select
          disallowEmptySelection
          options={selectData}
          optionValue="value"
          optionTextValue="label"
          value={selectedDuration()}
          onChange={handleSelectedDuration}
          placeholder="Last 3 months"
          itemComponent={(props) => (
            <SelectItem item={props.item}>
              {props.item.rawValue.label}
            </SelectItem>
          )}
        >
          <SelectTrigger
            class="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue<(typeof selectData)[number]>>
              {(state) => state.selectedOption().label}
            </SelectValue>
          </SelectTrigger>
          <SelectPortal>
            <SelectContent />
          </SelectPortal>
        </Select>
      </CardHeader>
      <CardContent class="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          type="xy"
          config={chartConfig}
          data={data}
          yDomain={[0, 1600]}
          xDomain={domain()}
          class="aspect-auto"
          height={250}
          width={"100%"}
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
            numTicks={Math.min(numTicks(), domain()[1] - domain()[0])}
          />
          <ChartCrosshair<DataRecord>
            color={["var(--color-mobile)", "var(--color-desktop)"]}
            template={(props) => (
              <ChartTooltipContent
                labelKey="date"
                labelFormatter={(d) => {
                  const date = new Date(data[d as number].date)
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }}
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
    </Card>
  )
}

export default AreaChartInteractive

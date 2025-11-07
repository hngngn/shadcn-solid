import { VisAxis, VisLine, VisScatter, VisTooltip } from "@unovis/solid"
import { CurveType, Position } from "@unovis/ts"

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

const data = [
  {
    average: 400,
    today: 240,
    day: "Monday",
  },
  {
    average: 300,
    today: 139,
    day: "Tuesday",
  },
  {
    average: 200,
    today: 980,
    day: "Wednesday",
  },
  {
    average: 278,
    today: 390,
    day: "Thursday",
  },
  {
    average: 189,
    today: 480,
    day: "Friday",
  },
  {
    average: 239,
    today: 380,
    day: "Saturday",
  },
  {
    average: 349,
    today: 430,
    day: "Sunday",
  },
]

type DataRecord = (typeof data)[number]

const chartConfig = {
  today: {
    label: "Today",
    color: "var(--primary)",
  },
  average: {
    label: "Average",
    color: "var(--primary)",
  },
} satisfies ChartConfig

const ExerciseMinutes = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Exercise Minutes</CardTitle>
        <CardDescription>
          Your exercise minutes are ahead of where you normally are.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          type="xy"
          data={data}
          config={chartConfig}
          class="w-full md:h-[200px]"
          yDomain={[0, 1000]}
        >
          <VisLine<DataRecord>
            x={(_, i) => i}
            y={(d) => d.today}
            color="var(--color-today)"
            curveType={CurveType.Natural}
          />
          <VisLine<DataRecord>
            x={(_, i) => i}
            y={(d) => d.average}
            color="color-mix(in oklab, var(--color-average) 50%, transparent)"
            curveType={CurveType.Natural}
          />
          <VisAxis<DataRecord>
            type="x"
            tickFormat={(d) => data[d as number].day.slice(0, 3)}
            gridLine={false}
            tickLine={false}
            domainLine={false}
            numTicks={data.length}
          />
          <VisScatter<DataRecord>
            x={(_, i) => i}
            y={(d) => d.today}
            color="var(--color-today)"
          />
          <VisScatter<DataRecord>
            x={(_, i) => i}
            y={(d) => d.average}
            color="color-mix(in oklab, var(--color-average) 50%, transparent)"
          />
          <ChartCrosshair<DataRecord>
            color="var(--color-today)"
            template={(props) => (
              <ChartTooltipContent<DataRecord> labelKey="day" {...props} />
            )}
          />
          <VisTooltip horizontalPlacement={Position.Center} />
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default ExerciseMinutes

import { VisArea, VisLine, VisScatter } from "@unovis/solid"
import { CurveType } from "@unovis/ts"

import { Button } from "@repo/tailwindcss/ui/v4/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/tailwindcss/ui/v4/card"
import { ChartContainer, type ChartConfig } from "@repo/tailwindcss/ui/v4/chart"

const data = [
  {
    revenue: 10400,
    subscription: 40,
  },
  {
    revenue: 14405,
    subscription: 90,
  },
  {
    revenue: 9400,
    subscription: 200,
  },
  {
    revenue: 8200,
    subscription: 278,
  },
  {
    revenue: 7000,
    subscription: 89,
  },
  {
    revenue: 9600,
    subscription: 239,
  },
  {
    revenue: 11244,
    subscription: 78,
  },
  {
    revenue: 26475,
    subscription: 89,
  },
]

type DataRecord = (typeof data)[number]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--primary)",
  },
  subscription: {
    label: "Subscriptions",
    color: "var(--primary)",
  },
} satisfies ChartConfig

const CardsStats = () => {
  return (
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      <Card>
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle class="text-3xl">$15,231.89</CardTitle>
          <CardDescription>+20.1% from last month</CardDescription>
        </CardHeader>
        <CardContent class="pb-0">
          <ChartContainer
            type="xy"
            config={chartConfig}
            data={data}
            class="h-[80px] w-full"
          >
            <VisLine<DataRecord>
              x={(_, i) => i}
              y={(d) => d.revenue}
              color="var(--color-revenue)"
              curveType={CurveType.Natural}
            />
            <VisScatter<DataRecord>
              x={(_, i) => i}
              y={(d) => d.revenue}
              color="var(--color-revenue)"
            />
          </ChartContainer>
        </CardContent>
      </Card>
      <Card class="pb-0 lg:hidden xl:flex">
        <CardHeader>
          <CardDescription>Subscriptions</CardDescription>
          <CardTitle class="text-3xl">+2,350</CardTitle>
          <CardDescription>+180.1% from last month</CardDescription>
          <CardAction>
            <Button variant="ghost" size="sm">
              View More
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent class="mt-auto max-h-[124px] flex-1 p-0">
          <ChartContainer
            type="xy"
            config={chartConfig}
            data={data}
            class="size-full"
            yDomain={[0, 300]}
          >
            <VisArea<DataRecord>
              x={(_, i) => i}
              y={(d) => d.subscription}
              color="var(--color-subscription)"
              opacity={0.05}
              curveType={CurveType.Natural}
            />
            <VisLine<DataRecord>
              x={(_, i) => i}
              y={(d) => d.subscription}
              color="var(--color-subscription)"
              curveType={CurveType.Natural}
              lineWidth={1}
            />
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default CardsStats

import type { Accessor, JSX } from "solid-js"

import clientOnlyWrapper from "@/components/client-only-wrapper"

const AreaChartInteractive = clientOnlyWrapper(
  () => import("@repo/tailwindcss/charts/area-chart-interactive"),
  {
    lazy: true,
  },
)
const BarChartInteractive = clientOnlyWrapper(
  () => import("@repo/tailwindcss/charts/bar-chart-interactive"),
  {
    lazy: true,
  },
)
const LineChartInteractive = clientOnlyWrapper(
  () => import("@repo/tailwindcss/charts/line-chart-interactive"),
  {
    lazy: true,
  },
)
type ChartComponent = Accessor<JSX.Element>

interface ChartItem {
  id: string
  component: ChartComponent
  fullWidth?: boolean
}

interface ChartGroups {
  area: ChartItem[]
  bar: ChartItem[]
  line: ChartItem[]
  pie: ChartItem[]
  radar: ChartItem[]
  radial: ChartItem[]
  tooltip: ChartItem[]
}

export const charts: ChartGroups = {
  area: [
    {
      id: "area-chart-interactive",
      component: () => <AreaChartInteractive />,
      fullWidth: true,
    },
  ],
  bar: [
    {
      id: "bar-chart-interactive",
      component: () => <BarChartInteractive />,
      fullWidth: true,
    },
  ],
  line: [
    {
      id: "line-chart-interactive",
      component: () => <LineChartInteractive />,
      fullWidth: true,
    },
  ],
  pie: [],
  radar: [],
  radial: [],
  tooltip: [],
}

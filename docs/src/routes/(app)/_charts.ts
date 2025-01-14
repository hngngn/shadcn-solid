import { clientOnly } from "@solidjs/start"

const AreaChart = clientOnly(
  () => import("@/registry/tailwindcss/charts/area-chart")
)
const AreaChartGradient = clientOnly(
  () => import("@/registry/tailwindcss/charts/area-chart-gradient")
)
const AreaChartInteractive = clientOnly(
  () => import("@/registry/tailwindcss/charts/area-chart-interactive")
)
const AreaChartLegend = clientOnly(
  () => import("@/registry/tailwindcss/charts/area-chart-legend")
)
const AreaChartLinear = clientOnly(
  () => import("@/registry/tailwindcss/charts/area-chart-linear")
)
const AreaChartStacked = clientOnly(
  () => import("@/registry/tailwindcss/charts/area-chart-stacked")
)
const AreaChartStep = clientOnly(
  () => import("@/registry/tailwindcss/charts/area-chart-step")
)
const BarChart = clientOnly(
  () => import("@/registry/tailwindcss/charts/bar-chart")
)
const BarChartActive = clientOnly(
  () => import("@/registry/tailwindcss/charts/bar-chart-active")
)
const BarChartHorizontal = clientOnly(
  () => import("@/registry/tailwindcss/charts/bar-chart-horizontal")
)
const BarChartInteractive = clientOnly(
  () => import("@/registry/tailwindcss/charts/bar-chart-interactive")
)
const BarChartMixed = clientOnly(
  () => import("@/registry/tailwindcss/charts/bar-chart-mixed")
)
const BarChartMultiple = clientOnly(
  () => import("@/registry/tailwindcss/charts/bar-chart-multiple")
)
const BarChartStacked = clientOnly(
  () => import("@/registry/tailwindcss/charts/bar-chart-stacked")
)
const LineChart = clientOnly(
  () => import("@/registry/tailwindcss/charts/line-chart")
)
const LineChartLinear = clientOnly(
  () => import("@/registry/tailwindcss/charts/line-chart-linear")
)
const LineChartMultiple = clientOnly(
  () => import("@/registry/tailwindcss/charts/line-chart-multiple")
)
const LineChartInteractive = clientOnly(
  () => import("@/registry/tailwindcss/charts/line-chart-interactive")
)

export const Chart = {
  AreaChart,
  AreaChartLinear,
  AreaChartStep,
  AreaChartStacked,
  AreaChartLegend,
  AreaChartGradient,
  AreaChartInteractive,
  BarChart,
  BarChartHorizontal,
  BarChartMultiple,
  BarChartStacked,
  BarChartMixed,
  BarChartActive,
  BarChartInteractive,
  LineChart,
  LineChartLinear,
  LineChartMultiple,
  LineChartInteractive,
}

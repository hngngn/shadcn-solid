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
const DonutChart = clientOnly(
  () => import("@/registry/tailwindcss/charts/donut-chart")
)
const DonutChartPie = clientOnly(
  () => import("@/registry/tailwindcss/charts/donut-chart-pie")
)
const DonutChartLegend = clientOnly(
  () => import("@/registry/tailwindcss/charts/donut-chart-legend")
)
const ChartTooltipDefault = clientOnly(
  () => import("@/registry/tailwindcss/charts/chart-tooltip-default")
)
const ChartTooltipLine = clientOnly(
  () => import("@/registry/tailwindcss/charts/chart-tooltip-line")
)
const ChartTooltipNoIndicator = clientOnly(
  () => import("@/registry/tailwindcss/charts/chart-tooltip-no-indicator")
)
const ChartTooltipCustomLabel = clientOnly(
  () => import("@/registry/tailwindcss/charts/chart-tooltip-custom-label")
)
const ChartTooltipLabelFormatter = clientOnly(
  () => import("@/registry/tailwindcss/charts/chart-tooltip-label-formatter")
)
const ChartTooltipNoLabel = clientOnly(
  () => import("@/registry/tailwindcss/charts/chart-tooltip-no-label")
)
const ChartTooltipFormatter = clientOnly(
  () => import("@/registry/tailwindcss/charts/chart-tooltip-formatter")
)
const ChartTooltipIcon = clientOnly(
  () => import("@/registry/tailwindcss/charts/chart-tooltip-icon")
)
const ChartTooltipAdvanced = clientOnly(
  () => import("@/registry/tailwindcss/charts/chart-tooltip-advanced")
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
  DonutChart,
  DonutChartPie,
  DonutChartLegend,
  ChartTooltipDefault,
  ChartTooltipLine,
  ChartTooltipNoIndicator,
  ChartTooltipCustomLabel,
  ChartTooltipLabelFormatter,
  ChartTooltipNoLabel,
  ChartTooltipFormatter,
  ChartTooltipIcon,
  ChartTooltipAdvanced,
}

import type { Accessor, JSX } from "solid-js"

import AreaChart from "@/registry/charts/area-chart"
import AreaChartGradient from "@/registry/charts/area-chart-gradient"
import AreaChartInteractive from "@/registry/charts/area-chart-interactive"
import AreaChartLegend from "@/registry/charts/area-chart-legend"
import AreaChartLinear from "@/registry/charts/area-chart-linear"
import AreaChartStacked from "@/registry/charts/area-chart-stacked"
import AreaChartStep from "@/registry/charts/area-chart-step"
import BarChart from "@/registry/charts/bar-chart"
import BarChartActive from "@/registry/charts/bar-chart-active"
import BarChartHorizontal from "@/registry/charts/bar-chart-horizontal"
import BarChartInteractive from "@/registry/charts/bar-chart-interactive"
import BarChartMixed from "@/registry/charts/bar-chart-mixed"
import BarChartMultiple from "@/registry/charts/bar-chart-multiple"
import BarChartStacked from "@/registry/charts/bar-chart-stacked"
import ChartTooltipAdvanced from "@/registry/charts/chart-tooltip-advanced"
import ChartTooltipCustomLabel from "@/registry/charts/chart-tooltip-custom-label"
import ChartTooltipDefault from "@/registry/charts/chart-tooltip-default"
import ChartTooltipFormatter from "@/registry/charts/chart-tooltip-formatter"
import ChartTooltipIcon from "@/registry/charts/chart-tooltip-icon"
import ChartTooltipLabelFormatter from "@/registry/charts/chart-tooltip-label-formatter"
import ChartTooltipLine from "@/registry/charts/chart-tooltip-line"
import ChartTooltipNoIndicator from "@/registry/charts/chart-tooltip-no-indicator"
import ChartTooltipNoLabel from "@/registry/charts/chart-tooltip-no-label"
import DonutChart from "@/registry/charts/donut-chart"
import DonutChartLegend from "@/registry/charts/donut-chart-legend"
import DonutChartPie from "@/registry/charts/donut-chart-pie"
import LineChart from "@/registry/charts/line-chart"
import LineChartInteractive from "@/registry/charts/line-chart-interactive"
import LineChartLinear from "@/registry/charts/line-chart-linear"
import LineChartMultiple from "@/registry/charts/line-chart-multiple"

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
  donut: ChartItem[]
  tooltip: ChartItem[]
}

export const charts: ChartGroups = {
  area: [
    {
      id: "area-chart-interactive",
      component: () => <AreaChartInteractive />,
      fullWidth: true,
    },
    {
      id: "area-chart-gradient",
      component: () => <AreaChartGradient />,
    },
    {
      id: "area-chart-legend",
      component: () => <AreaChartLegend />,
    },
    {
      id: "area-chart-linear",
      component: () => <AreaChartLinear />,
    },
    {
      id: "area-chart-stacked",
      component: () => <AreaChartStacked />,
    },
    {
      id: "area-chart-step",
      component: () => <AreaChartStep />,
    },
    {
      id: "area-chart",
      component: () => <AreaChart />,
    },
  ],
  bar: [
    {
      id: "bar-chart-interactive",
      component: () => <BarChartInteractive />,
      fullWidth: true,
    },
    {
      id: "bar-chart-active",
      component: () => <BarChartActive />,
    },
    {
      id: "bar-chart-horizontal",
      component: () => <BarChartHorizontal />,
    },
    {
      id: "bar-chart-mixed",
      component: () => <BarChartMixed />,
    },
    {
      id: "bar-chart-multiple",
      component: () => <BarChartMultiple />,
    },
    {
      id: "bar-chart-stacked",
      component: () => <BarChartStacked />,
    },
    {
      id: "bar-chart",
      component: () => <BarChart />,
    },
  ],
  line: [
    {
      id: "line-chart-interactive",
      component: () => <LineChartInteractive />,
      fullWidth: true,
    },
    {
      id: "line-chart-linear",
      component: () => <LineChartLinear />,
    },
    {
      id: "line-chart-multiple",
      component: () => <LineChartMultiple />,
    },
    {
      id: "line-chart",
      component: () => <LineChart />,
    },
  ],
  donut: [
    {
      id: "donut-chart",
      component: () => <DonutChart />,
    },
    {
      id: "donut-chart-legend",
      component: () => <DonutChartLegend />,
    },
    {
      id: "donut-chart-pie",
      component: () => <DonutChartPie />,
    },
  ],
  tooltip: [
    {
      id: "chart-tooltip-default",
      component: () => <ChartTooltipDefault />,
    },
    {
      id: "chart-tooltip-line",
      component: () => <ChartTooltipLine />,
    },
    {
      id: "chart-tooltip-no-indicator",
      component: () => <ChartTooltipNoIndicator />,
    },
    {
      id: "chart-tooltip-custom-label",
      component: () => <ChartTooltipCustomLabel />,
    },
    {
      id: "chart-tooltip-label-formatter",
      component: () => <ChartTooltipLabelFormatter />,
    },
    {
      id: "chart-tooltip-no-label",
      component: () => <ChartTooltipNoLabel />,
    },
    {
      id: "chart-tooltip-formatter",
      component: () => <ChartTooltipFormatter />,
    },
    {
      id: "chart-tooltip-icon",
      component: () => <ChartTooltipIcon />,
    },
    {
      id: "chart-tooltip-advanced",
      component: () => <ChartTooltipAdvanced />,
    },
  ],
}

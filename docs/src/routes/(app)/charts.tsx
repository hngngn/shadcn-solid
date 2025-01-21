import { Chart } from "@/routes/(app)/_charts"

import { Announcement } from "@/components/announcement"
import ChartDisplay from "@/components/chart-display"
import { Button } from "@/registry/tailwindcss/ui/button"
import { Separator } from "@/registry/tailwindcss/ui/separator"

const ChartsPage = () => {
  return (
    <>
      <section class="border-grid border-b">
        <div class="container-wrapper">
          <div class="container flex flex-col items-start gap-1 py-8 md:py-10 lg:py-12">
            <Announcement />
            <h1 class="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
              Beautiful Charts
            </h1>
            <p class="text-foreground max-w-2xl text-balance text-lg font-light">
              Built using Unovis. Copy and paste into your apps. Open Source.
            </p>
            <div class="flex w-full items-center justify-start gap-2 py-2">
              <Button as="a" href="#charts" size="sm">
                Browse Charts
              </Button>
              <Button
                as="a"
                href="/docs/components/chart"
                size="sm"
                variant="ghost"
              >
                Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>
      <div class="container-wrapper">
        <div class="container py-6">
          <section id="charts" class="scroll-mt-20">
            <div class="grid gap-4">
              <div class="gap-6 md:flex md:flex-row-reverse md:items-start">
                <div class="grid flex-1 gap-12">
                  <div
                    class="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
                    id="area-chart"
                  >
                    <ChartDisplay name="area-chart">
                      <Chart.AreaChart />
                    </ChartDisplay>
                    <ChartDisplay name="area-chart-linear">
                      <Chart.AreaChartLinear />
                    </ChartDisplay>
                    <ChartDisplay name="area-chart-step">
                      <Chart.AreaChartStep />
                    </ChartDisplay>
                    <ChartDisplay name="area-chart-stacked">
                      <Chart.AreaChartStacked />
                    </ChartDisplay>
                    <ChartDisplay name="area-chart-legend">
                      <Chart.AreaChartLegend />
                    </ChartDisplay>
                    <ChartDisplay name="area-chart-gradient">
                      <Chart.AreaChartGradient />
                    </ChartDisplay>
                    <div class="md:col-span-2 lg:col-span-3">
                      <ChartDisplay name="area-chart-interactive">
                        <Chart.AreaChartInteractive />
                      </ChartDisplay>
                    </div>
                  </div>
                  <Separator />
                  <div
                    class="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
                    id="bar-chart"
                  >
                    <ChartDisplay name="bar-chart">
                      <Chart.BarChart />
                    </ChartDisplay>
                    <ChartDisplay name="bar-chart-horizontal">
                      <Chart.BarChartHorizontal />
                    </ChartDisplay>
                    <ChartDisplay name="bar-chart-multiple">
                      <Chart.BarChartMultiple />
                    </ChartDisplay>
                    <ChartDisplay name="bar-chart-stacked">
                      <Chart.BarChartStacked />
                    </ChartDisplay>
                    <ChartDisplay name="bar-chart-mixed">
                      <Chart.BarChartMixed />
                    </ChartDisplay>
                    <ChartDisplay name="bar-chart-active">
                      <Chart.BarChartActive />
                    </ChartDisplay>
                    <div class="md:col-span-2 lg:col-span-3">
                      <ChartDisplay name="bar-chart-interactive">
                        <Chart.BarChartInteractive />
                      </ChartDisplay>
                    </div>
                  </div>
                  <Separator />
                  <div
                    class="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
                    id="line-chart"
                  >
                    <ChartDisplay name="line-chart">
                      <Chart.LineChart />
                    </ChartDisplay>
                    <ChartDisplay name="line-chart-linear">
                      <Chart.LineChartLinear />
                    </ChartDisplay>
                    <ChartDisplay name="line-chart-multiple">
                      <Chart.LineChartMultiple />
                    </ChartDisplay>
                    <div class="md:col-span-2 lg:col-span-3">
                      <ChartDisplay name="line-chart-interactive">
                        <Chart.LineChartInteractive />
                      </ChartDisplay>
                    </div>
                  </div>
                  <div
                    class="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
                    id="circular-chart"
                  >
                    <ChartDisplay name="donut-chart">
                      <Chart.DonutChart />
                    </ChartDisplay>
                    <ChartDisplay name="donut-chart-pie">
                      <Chart.DonutChartPie />
                    </ChartDisplay>
                    <ChartDisplay name="donut-chart-legend">
                      <Chart.DonutChartLegend />
                    </ChartDisplay>
                  </div>
                  <Separator />
                  <div
                    class="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10"
                    id="chart-tooltip"
                  >
                    <ChartDisplay name="chart-tooltip-default">
                      <Chart.ChartTooltipDefault />
                    </ChartDisplay>
                    <ChartDisplay name="chart-tooltip-line">
                      <Chart.ChartTooltipLine />
                    </ChartDisplay>
                    <ChartDisplay name="chart-tooltip-no-indicator">
                      <Chart.ChartTooltipNoIndicator />
                    </ChartDisplay>
                    <ChartDisplay name="chart-tooltip-custom-label">
                      <Chart.ChartTooltipCustomLabel />
                    </ChartDisplay>
                    <ChartDisplay name="chart-tooltip-label-formatter">
                      <Chart.ChartTooltipLabelFormatter />
                    </ChartDisplay>
                    <ChartDisplay name="chart-tooltip-no-label">
                      <Chart.ChartTooltipNoLabel />
                    </ChartDisplay>
                    <ChartDisplay name="chart-tooltip-formatter">
                      <Chart.ChartTooltipFormatter />
                    </ChartDisplay>
                    <ChartDisplay name="chart-tooltip-icon">
                      <Chart.ChartTooltipIcon />
                    </ChartDisplay>
                    <ChartDisplay name="chart-tooltip-advanced">
                      <Chart.ChartTooltipAdvanced />
                    </ChartDisplay>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default ChartsPage

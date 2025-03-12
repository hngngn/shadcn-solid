import { Show } from "solid-js"
import { render } from "solid-js/web"
import { VisAxis, VisStackedBar, VisTooltip } from "@unovis/solid"
import { StackedBar } from "@unovis/ts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/tailwindcss/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from "@/registry/tailwindcss/ui/chart"

type DataRecord = {
  date: string
  running: number
  swimming: number
}

const data: DataRecord[] = [
  { date: "2024-07-15", running: 450, swimming: 300 },
  { date: "2024-07-16", running: 380, swimming: 420 },
  { date: "2024-07-17", running: 520, swimming: 120 },
  { date: "2024-07-18", running: 140, swimming: 550 },
  { date: "2024-07-19", running: 600, swimming: 350 },
  { date: "2024-07-20", running: 480, swimming: 400 },
]

const chartConfig = {
  running: {
    label: "Running",
    color: "hsl(var(--chart-1))",
  },
  swimming: {
    label: "Swimming",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const ChartTooltipAdvanced = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tooltip - Advanced</CardTitle>
        <CardDescription>
          Tooltip with custom formatter and total.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} type="xy" data={data}>
          <VisStackedBar<DataRecord>
            x={(_, i) => i}
            y={[(d) => d.running, (d) => d.swimming]}
            color={["var(--color-running)", "var(--color-swimming)"]}
            roundedCorners={4}
          />
          <VisAxis<DataRecord>
            type="x"
            gridLine={false}
            tickLine={false}
            domainLine={false}
            numTicks={data.length}
            tickFormat={(d) =>
              new Date(data[d as number].date).toLocaleDateString("en-US", {
                weekday: "short",
              })
            }
          />
          <VisTooltip
            triggers={{
              [StackedBar.selectors.bar]: (d: DataRecord, x) => {
                const container = document.createElement("div")
                const Component = () => (
                  <ChartTooltipContent
                    data={d}
                    x={x}
                    config={chartConfig}
                    labelKey="date"
                    hideLabel
                    formatter={(value, name, item, index) => (
                      <>
                        <div
                          class="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                          style={{
                            "--color-bg": `var(--color-${(name as string).toLowerCase()})`,
                          }}
                        />
                        {name}
                        <div class="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                          {value}
                          <span class="text-muted-foreground font-normal">
                            kcal
                          </span>
                        </div>
                        {/* Add this after the last item */}
                        <Show when={index === 1}>
                          <div class="text-foreground mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium">
                            Total
                            <div class="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                              {item.running + item.swimming}
                              <span class="text-muted-foreground font-normal">
                                kcal
                              </span>
                            </div>
                          </div>
                        </Show>
                      </>
                    )}
                  />
                )
                render(() => <Component />, container)
                return container.innerHTML
              },
            }}
          />
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default ChartTooltipAdvanced

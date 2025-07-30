import { For, Show } from "solid-js"
import { createFileRoute, redirect } from "@tanstack/solid-router"

import { cx } from "@repo/tailwindcss/utils/cva"

import ChartDisplay from "@/components/chart-display"

import { charts } from "./-charts"

const chartTypes = [
  "area",
  "bar",
  "line",
  "pie",
  "radar",
  "radial",
  "tooltip",
] as const
type ChartType = (typeof chartTypes)[number]

export const Route = createFileRoute("/_main/charts/$type")({
  beforeLoad: ({ params }) => {
    if (!chartTypes.includes(params.type as ChartType)) {
      throw redirect({ to: "/charts/$type", params: { type: "area" } })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()

  const chartType = () => params().type as ChartType
  const chartList = () => charts[chartType()]

  return (
    <div class="grid flex-1 gap-12 lg:gap-24">
      <h2 class="sr-only">
        {params().type.charAt(0).toUpperCase() + params().type.slice(1)} Charts
      </h2>
      <div class="grid flex-1 scroll-mt-20 items-stretch gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10">
        <For each={Array.from({ length: 12 })}>
          {(_, index) => {
            const chart = () => chartList()[index()]

            return (
              <Show
                when={chart()}
                fallback={
                  <div class="hidden aspect-square w-full rounded-lg border border-dashed xl:block" />
                }
              >
                <ChartDisplay
                  name={chart().id}
                  class={cx(chart().fullWidth && "md:col-span-2 lg:col-span-3")}
                >
                  {chart().component()}
                </ChartDisplay>
              </Show>
            )
          }}
        </For>
      </div>
    </div>
  )
}

import { splitProps, type ComponentProps } from "solid-js"

import { Index } from "@/registry/__index__"
import { cx } from "@/registry/lib/cva"

import { ChartToolbar } from "./chart-toolbar"

const ChartDisplay = (
  props: ComponentProps<"div"> & {
    name: string
  },
) => {
  const [, rest] = splitProps(props, ["class", "children"])
  const item = () => Index.tailwindcss[props.name]

  return (
    <div
      class={cx(
        "themes-wrapper group relative flex flex-col overflow-hidden rounded-xl border transition-all duration-200 ease-in-out hover:z-30",
        props.class,
      )}
      {...rest}
    >
      <ChartToolbar
        item={item()}
        class="bg-card text-card-foreground relative z-20 flex justify-end border-b px-3 py-2.5"
      >
        {props.children}
      </ChartToolbar>
      <div class="relative z-10 [&>div]:rounded-none [&>div]:border-none [&>div]:shadow-none">
        {props.children}
      </div>
    </div>
  )
}

export default ChartDisplay

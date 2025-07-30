import { createMemo, splitProps, type ComponentProps } from "solid-js"
import type { RegistryEntry } from "scripts/registry/schema"

import { cx } from "@repo/tailwindcss/utils/cva"

import { Index } from "@/__registry__"

import { ChartToolbar } from "./chart-toolbar"

const ChartDisplay = (
  props: ComponentProps<"div"> & {
    name: string
  },
) => {
  const [, rest] = splitProps(props, ["class", "children"])
  const item = createMemo<RegistryEntry>(() => Index.tailwindcss[props.name])

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

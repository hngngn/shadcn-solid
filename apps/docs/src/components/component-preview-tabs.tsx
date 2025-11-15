import {
  Show,
  mergeProps,
  splitProps,
  type ComponentProps,
  type JSX,
} from "solid-js"

import { cx } from "@/registry/lib/cva"

type Props = ComponentProps<"div"> & {
  align?: "center" | "start" | "end"
  hideCode?: boolean
  component: () => JSX.Element
}

const ComponentPreviewTabs = (props: Props) => {
  const merge = mergeProps(
    {
      align: "center",
      hideCode: false,
    } as Props,
    props,
  )
  const [, rest] = splitProps(merge, [
    "class",
    "align",
    "hideCode",
    "component",
    "children",
  ])

  return (
    <div
      class={cx(
        "group relative mt-4 mb-12 flex flex-col gap-2 rounded-lg border",
        merge.class,
      )}
      {...rest}
    >
      <div data-slot="preview">
        <div
          data-align={merge.align}
          class={cx(
            "preview flex h-[450px] w-full justify-center p-10 has-data-[slot='card']:h-fit has-data-[slot='data-table-demo']:h-full data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start",
          )}
        >
          {merge.component()}
        </div>
        <Show when={!merge.hideCode}>
          <div
            data-slot="code"
            class="overflow-hidden **:data-rehype-pretty-code-figure:m-0! **:data-rehype-pretty-code-figure:rounded-t-none **:data-rehype-pretty-code-figure:border-t [&_pre]:max-h-[400px]"
          >
            {merge.children}
          </div>
        </Show>
      </div>
    </div>
  )
}

export default ComponentPreviewTabs

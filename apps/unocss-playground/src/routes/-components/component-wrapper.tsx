import type { ComponentProps } from "solid-js"
import { splitProps } from "solid-js"

import { cx } from "@/registry/lib/cva"
import { getComponentName } from "@/routes/-components/app-sidebar"

type Props = ComponentProps<"div"> & {
  name: string
}

const ComponentWrapper = (props: Props) => {
  const [, rest] = splitProps(props, ["name", "class", "children"])

  return (
    <div
      id={props.name}
      data-name={props.name.toLowerCase()}
      class={cx(
        "flex w-full scroll-mt-16 flex-col rounded-lg border",
        props.class,
      )}
      {...rest}
    >
      <div class="border-b px-4 py-3">
        <div class="text-sm font-medium">{getComponentName(props.name)}</div>
      </div>
      <div class="flex flex-1 items-center gap-2 p-4">{props.children}</div>
    </div>
  )
}

export default ComponentWrapper

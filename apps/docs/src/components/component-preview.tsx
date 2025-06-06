import type { JSX } from "solid-js"
import {
  Match,
  Switch,
  createMemo,
  mergeProps,
  splitProps,
  type ComponentProps,
} from "solid-js"

import { Index } from "@/__registry__"

import ComponentPreviewTabs from "./component-preview-tabs"

type Props = ComponentProps<"div"> & {
  name: string
  align?: "center" | "start" | "end"
  description?: string
  hideCode?: boolean
  type?: "block" | "component" | "example"
}

const ComponentPreview = (props: Props) => {
  const merge = mergeProps(
    {
      align: "center",
      hideCode: false,
    } as Props,
    props,
  )
  const [local, rest] = splitProps(merge, [
    "name",
    "type",
    "class",
    "align",
    "hideCode",
  ])

  const component = createMemo(
    () => Index.tailwindcss[local.name]?.component as JSX.Element,
  )

  return (
    <Switch
      fallback={
        <ComponentPreviewTabs
          class={local.class}
          align={local.align}
          hideCode={local.hideCode}
          component={component()}
          {...rest}
        />
      }
    >
      <Match when={!component()}>
        <p class="text-muted-foreground text-sm">
          Component{" "}
          <code class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {local.name}
          </code>{" "}
          not found in registry.
        </p>
      </Match>
      <Match when={local.type === "block"}>Block</Match>
    </Switch>
  )
}

export default ComponentPreview

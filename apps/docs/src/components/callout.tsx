import type { JSX } from "solid-js"
import { Show, splitProps, type ComponentProps } from "solid-js"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/tailwindcss/ui/v4/alert"
import { cx } from "@repo/tailwindcss/utils/cva"

const Callout = (
  props: ComponentProps<typeof Alert> & { icon?: JSX.Element },
) => {
  const [local, rest] = splitProps(props, [
    "class",
    "icon",
    "title",
    "children",
  ])

  return (
    <Alert
      class={cx(
        "bg-surface text-surface-foreground mt-6 w-auto border-none md:-mx-4",
        local.class,
      )}
      {...rest}
    >
      {local.icon}
      <Show when={local.title}>
        <AlertTitle>{local.title}</AlertTitle>
      </Show>
      <AlertDescription class="text-card-foreground/80">
        {local.children}
      </AlertDescription>
    </Alert>
  )
}

export default Callout

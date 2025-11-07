import {
  Show,
  mergeProps,
  splitProps,
  type ComponentProps,
  type ValidComponent,
} from "solid-js"
import ResizablePrimitive from "@corvu/resizable"

import { cx } from "@/registry/lib/cva"

export type ResizableProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof ResizablePrimitive<T>
>

export const Resizable = <T extends ValidComponent>(
  props: ResizableProps<T>,
) => {
  const [, rest] = splitProps(props as ResizableProps, ["class"])

  return (
    <ResizablePrimitive
      data-slot="resizable"
      class={cx("size-full", props.class)}
      {...rest}
    />
  )
}

export type ResizablePanelProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ResizablePrimitive.Panel<T>>

export const ResizablePanel = <T extends ValidComponent>(
  props: ResizablePanelProps<T>,
) => {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
}

export type ResizableHandleProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof ResizablePrimitive.Handle<T>> & {
    withHandle?: boolean
  }

export const ResizableHandle = <T extends ValidComponent>(
  props: ResizableHandleProps<T>,
) => {
  const merge = mergeProps({ withHandle: false } as ResizableHandleProps, props)
  const [, rest] = splitProps(merge, ["class", "withHandle"])

  return (
    <ResizablePrimitive.Handle
      data-slot="resizable-handle"
      class={cx(
        "bg-border relative flex w-px items-center justify-center [&[data-orientation=vertical]>div]:rotate-90",
        "focus-visible:(ring-ring outline-hidden ring-1 ring-offset-1)",
        "after:(absolute inset-y-0 left-1/2 w-1 -translate-x-1/2)",
        "data-[orientation=vertical]:(h-px w-full after:(left-0 h-1 w-full -translate-y-1/2 translate-x-0))",
        props.class,
      )}
      {...rest}
    >
      <Show when={props.withHandle}>
        <div class="bg-border rounded-xs z-10 flex h-4 w-3 items-center justify-center border">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-2.5"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <circle cx="9" cy="12" r="1" />
              <circle cx="9" cy="5" r="1" />
              <circle cx="9" cy="19" r="1" />
              <circle cx="15" cy="12" r="1" />
              <circle cx="15" cy="5" r="1" />
              <circle cx="15" cy="19" r="1" />
            </g>
          </svg>
        </div>
      </Show>
    </ResizablePrimitive.Handle>
  )
}

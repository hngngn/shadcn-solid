import { splitProps, type ComponentProps } from "solid-js"

import { cn } from "@/libs/cn"

const ComponentWrapper = (props: ComponentProps<"div"> & { name?: string }) => {
  const [local, rest] = splitProps(props, ["class", "name", "children"])

  return (
    <div
      class={cn("flex w-full flex-col rounded-lg border", local.class)}
      {...rest}
    >
      <div class="border-b px-4 py-3">
        <div class="text-sm font-medium">{local.name}</div>
      </div>
      <div class="flex flex-1 flex-col items-center justify-center gap-2 p-4 [&>div]:max-w-full">
        {local.children}
      </div>
    </div>
  )
}

export default ComponentWrapper

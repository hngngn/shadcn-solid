import { splitProps, type ComponentProps } from "solid-js"

import { cn } from "@/registry/tailwindcss/libs/cn"

export const Skeleton = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      class={cn("bg-primary/10 animate-pulse rounded-md", local.class)}
      {...rest}
    />
  )
}

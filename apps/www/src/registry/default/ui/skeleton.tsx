import { cn } from "@/lib/cn"
import { splitProps, type ComponentProps, type ParentComponent } from "solid-js"

export const Skeleton: ParentComponent<ComponentProps<"div">> = (props) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      class={cn("bg-primary/10 animate-pulse rounded-md", local.class)}
      {...rest}
    />
  )
}

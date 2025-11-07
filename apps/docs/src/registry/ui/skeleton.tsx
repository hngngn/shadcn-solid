import type { ComponentProps, ValidComponent } from "solid-js"
import { mergeProps, splitProps } from "solid-js"
import { Root as SkeletonPrimitive } from "@kobalte/core/skeleton"

import { cx } from "@/registry/lib/cva"

export type SkeletonProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof SkeletonPrimitive<T>
>

export const Skeleton = <T extends ValidComponent = "div">(
  props: SkeletonProps<T>,
) => {
  const merge = mergeProps(
    {
      radius: 8,
    } as SkeletonProps,
    props,
  )
  const [, rest] = splitProps(merge, ["class"])

  return (
    <SkeletonPrimitive
      data-slot="skeleton"
      class={cx(
        "relative translate-z-0",
        "data-[visible=true]:after:bg-accent data-[visible=true]:after:absolute data-[visible=true]:after:inset-0 data-[visible=true]:after:z-[11] data-[visible=true]:after:content-['']",
        "data-[visible=true]:animate-pulse data-[visible=true]:overflow-hidden",
        props.class,
      )}
      {...rest}
    />
  )
}

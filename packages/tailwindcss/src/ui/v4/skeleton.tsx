import type { ComponentProps, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"
import { Root as SkeletonPrimitive } from "@kobalte/core/skeleton"

import { cx } from "@repo/tailwindcss/utils/cva"

export type SkeletonProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof SkeletonPrimitive<T>
>

export const Skeleton = <T extends ValidComponent = "div">(
  props: SkeletonProps<T>,
) => {
  const [local, rest] = splitProps(props as SkeletonProps, ["class"])

  return (
    <SkeletonPrimitive
      data-slot="skeleton"
      class={cx("bg-accent animate-pulse rounded-md", local.class)}
      {...rest}
    />
  )
}

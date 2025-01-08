import { splitProps, type ValidComponent } from "solid-js"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import {
  Separator as SeparatorPrimitive,
  type SeparatorRootProps,
} from "@kobalte/core/separator"

import { cn } from "@/libs/cn"

export type separatorProps<T extends ValidComponent = "hr"> =
  SeparatorRootProps<T> & {
    class?: string
  }

export const Separator = <T extends ValidComponent = "hr">(
  props: PolymorphicProps<T, separatorProps<T>>
) => {
  const [local, rest] = splitProps(props as separatorProps, ["class"])

  return (
    <SeparatorPrimitive
      class={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-[1px] data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]",
        local.class
      )}
      {...rest}
    />
  )
}

import { splitProps, type ParentProps, type ValidComponent } from "solid-js"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import {
  Progress as ProgressPrimitive,
  type ProgressRootProps,
} from "@kobalte/core/progress"

import { cn } from "@/registry/tailwindcss/libs/cn"

export const ProgressLabel = ProgressPrimitive.Label
export const ProgressValueLabel = ProgressPrimitive.ValueLabel

type progressProps<T extends ValidComponent = "div"> = ParentProps<
  ProgressRootProps<T> & {
    class?: string
  }
>

export const Progress = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, progressProps<T>>
) => {
  const [local, rest] = splitProps(props as progressProps, [
    "class",
    "children",
  ])

  return (
    <ProgressPrimitive
      class={cn("flex w-full flex-col gap-2", local.class)}
      {...rest}
    >
      {local.children}
      <ProgressPrimitive.Track class="bg-primary/20 h-2 overflow-hidden rounded-full">
        <ProgressPrimitive.Fill class="bg-primary data-[progress=complete]:bg-primary h-full w-[--kb-progress-fill-width] transition-all duration-500 ease-linear" />
      </ProgressPrimitive.Track>
    </ProgressPrimitive>
  )
}

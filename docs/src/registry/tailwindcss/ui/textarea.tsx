import { splitProps, type ValidComponent, type VoidProps } from "solid-js"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import {
  TextArea as TextFieldPrimitive,
  type TextFieldTextAreaProps,
} from "@kobalte/core/text-field"

import { cn } from "@/registry/tailwindcss/libs/cn"

type textAreaProps<T extends ValidComponent = "textarea"> = VoidProps<
  TextFieldTextAreaProps<T> & {
    class?: string
  }
>

export const TextArea = <T extends ValidComponent = "textarea">(
  props: PolymorphicProps<T, textAreaProps<T>>
) => {
  const [local, rest] = splitProps(props as textAreaProps, ["class"])

  return (
    <TextFieldPrimitive
      class={cn(
        "border-input placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm transition-shadow focus-visible:outline-none focus-visible:ring-[1.5px] disabled:cursor-not-allowed disabled:opacity-50",
        local.class
      )}
      {...rest}
    />
  )
}

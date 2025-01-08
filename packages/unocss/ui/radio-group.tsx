import { splitProps, type ValidComponent, type VoidProps } from "solid-js"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import {
  RadioGroup as RadioGroupPrimitive,
  type RadioGroupItemControlProps,
} from "@kobalte/core/radio-group"

import { cn } from "@/libs/cn"

export const RadioGroupDescription = RadioGroupPrimitive.Description
export const RadioGroupErrorMessage = RadioGroupPrimitive.ErrorMessage
export const RadioGroupItemDescription = RadioGroupPrimitive.ItemDescription
export const RadioGroupItemInput = RadioGroupPrimitive.ItemInput
export const RadioGroupItemLabel = RadioGroupPrimitive.ItemLabel
export const RadioGroupLabel = RadioGroupPrimitive.Label
export const RadioGroup = RadioGroupPrimitive
export const RadioGroupItem = RadioGroupPrimitive.Item

type radioGroupItemControlProps<T extends ValidComponent = "div"> = VoidProps<
  RadioGroupItemControlProps<T> & { class?: string }
>

export const RadioGroupItemControl = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, radioGroupItemControlProps<T>>
) => {
  const [local, rest] = splitProps(props as radioGroupItemControlProps, [
    "class",
  ])

  return (
    <RadioGroupPrimitive.ItemControl
      class={cn(
        "border-primary text-primary focus-visible:(ring-1.5 ring-ring) disabled:(cursor-not-allowed opacity-50) data-[checked]:bg-foreground flex aspect-square h-4 w-4 items-center justify-center rounded-full border bg-inherit shadow transition-shadow focus:outline-none",
        local.class
      )}
      {...rest}
    >
      <RadioGroupPrimitive.ItemIndicator class="data-[checked]:bg-background h-2 w-2 rounded-full" />
    </RadioGroupPrimitive.ItemControl>
  )
}

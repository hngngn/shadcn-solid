import {
  splitProps,
  type ParentProps,
  type ValidComponent,
  type VoidProps,
} from "solid-js"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import {
  Switch as SwitchPrimitive,
  type SwitchControlProps,
  type SwitchThumbProps,
} from "@kobalte/core/switch"

import { cn } from "@/libs/cn"

export const SwitchLabel = SwitchPrimitive.Label
export const Switch = SwitchPrimitive
export const SwitchErrorMessage = SwitchPrimitive.ErrorMessage
export const SwitchDescription = SwitchPrimitive.Description

type switchControlProps<T extends ValidComponent = "input"> = ParentProps<
  SwitchControlProps<T> & { class?: string }
>

export const SwitchControl = <T extends ValidComponent = "input">(
  props: PolymorphicProps<T, switchControlProps<T>>
) => {
  const [local, rest] = splitProps(props as switchControlProps, [
    "class",
    "children",
  ])

  return (
    <>
      <SwitchPrimitive.Input class="[&:focus-visible+div]:(outline-none ring-1.5 ring-ring ring-offset-background) ring-offset-2" />
      <SwitchPrimitive.Control
        class={cn(
          "bg-input data-[disabled]:(cursor-not-allowed opacity-50) data-[checked]:bg-primary transition-property-[box-shadow,color,background-color] inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-shadow",
          local.class
        )}
        {...rest}
      >
        {local.children}
      </SwitchPrimitive.Control>
    </>
  )
}

type switchThumbProps<T extends ValidComponent = "div"> = VoidProps<
  SwitchThumbProps<T> & { class?: string }
>

export const SwitchThumb = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, switchThumbProps<T>>
) => {
  const [local, rest] = splitProps(props as switchThumbProps, ["class"])

  return (
    <SwitchPrimitive.Thumb
      class={cn(
        "bg-background pointer-events-none block h-4 w-4 translate-x-0 rounded-full shadow-lg transition-transform data-[checked]:translate-x-4",
        local.class
      )}
      {...rest}
    />
  )
}

import { splitProps, type ComponentProps, type ValidComponent } from "solid-js"
import { Switch as SwitchPrimitive } from "@kobalte/core/switch"

import { cx } from "@/registry/lib/cva"

export type SwitchProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof SwitchPrimitive<T>
>

export const Switch = <T extends ValidComponent = "div">(
  props: SwitchProps<T>,
) => {
  return <SwitchPrimitive data-slot="switch" {...props} />
}

export type SwitchControlProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof SwitchPrimitive.Control<T>>

export const SwitchControl = <T extends ValidComponent = "div">(
  props: SwitchControlProps<T>,
) => {
  const [, rest] = splitProps(props as SwitchControlProps, ["class"])

  return (
    <SwitchPrimitive.Control
      data-slot="switch-control"
      class={cx(
        "bg-input inline-flex h-4.5 w-8 items-center rounded-full border border-transparent shadow-xs transition-all",
        "data-[checked]:bg-primary",
        "peer-focus-visible/switch-input:border-ring peer-focus-visible/switch-input:ring-ring/50 peer-focus-visible/switch-input:ring-[3px]",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        props.class,
      )}
      {...rest}
    />
  )
}

export type SwitchThumbProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof SwitchPrimitive.Thumb<T>
>

export const SwitchThumb = <T extends ValidComponent = "div">(
  props: SwitchThumbProps<T>,
) => {
  const [, rest] = splitProps(props as SwitchThumbProps, ["class"])

  return (
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      class={cx(
        "bg-background dark:bg-foreground pointer-events-none size-4 rounded-full transition-transform data-[checked]:translate-x-[calc(100%-2px)]",
        "dark:data-[checked]:bg-primary-foreground dark:bg-foreground",
        props.class,
      )}
      {...rest}
    />
  )
}

export type SwitchInputProps<T extends ValidComponent = "input"> =
  ComponentProps<typeof SwitchPrimitive.Input<T>>

export const SwitchInput = <T extends ValidComponent = "input">(
  props: SwitchInputProps<T>,
) => {
  const [, rest] = splitProps(props as SwitchInputProps, ["class"])

  return (
    <SwitchPrimitive.Input
      data-slot="switch-input"
      class={cx("peer/switch-input", props.class)}
      {...rest}
    />
  )
}

export type SwitchLabelProps<T extends ValidComponent = "label"> =
  ComponentProps<typeof SwitchPrimitive.Label<T>>

export const SwitchLabel = <T extends ValidComponent = "label">(
  props: SwitchLabelProps<T>,
) => {
  const [, rest] = splitProps(props as SwitchLabelProps, ["class"])

  return (
    <SwitchPrimitive.Label
      data-slot="switch-label"
      class={cx(
        "text-sm font-medium select-none",
        "data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "data-[invalid]:text-destructive",
        props.class,
      )}
      {...rest}
    />
  )
}

export type SwitchErrorMessageProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof SwitchPrimitive.ErrorMessage<T>>

export const SwitchErrorMessage = <T extends ValidComponent = "div">(
  props: SwitchErrorMessageProps<T>,
) => {
  const [, rest] = splitProps(props as SwitchErrorMessageProps, ["class"])

  return (
    <SwitchPrimitive.ErrorMessage
      data-slot="switch-error-message"
      class={cx("text-destructive text-sm", props.class)}
      {...rest}
    />
  )
}

export type SwitchDescriptionProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof SwitchPrimitive.Description<T>>

export const SwitchDescription = <T extends ValidComponent = "div">(
  props: SwitchDescriptionProps<T>,
) => {
  const [, rest] = splitProps(props as SwitchDescriptionProps, ["class"])

  return (
    <SwitchPrimitive.Description
      data-slot="switch-description"
      class={cx("text-muted-foreground text-sm", props.class)}
      {...rest}
    />
  )
}

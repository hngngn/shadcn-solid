import type { ComponentProps, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"
import { Checkbox as CheckboxPrimitive } from "@kobalte/core/checkbox"

import { cx } from "@/registry/lib/cva"

export type CheckboxProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof CheckboxPrimitive<T>
>

export const Checkbox = <T extends ValidComponent = "div">(
  props: CheckboxProps<T>,
) => {
  return <CheckboxPrimitive data-slot="checkbox" {...props} />
}

export type CheckboxLabelProps<T extends ValidComponent = "label"> =
  ComponentProps<typeof CheckboxPrimitive.Label<T>>

export const CheckboxLabel = <T extends ValidComponent = "label">(
  props: CheckboxLabelProps<T>,
) => {
  const [, rest] = splitProps(props as CheckboxLabelProps, ["class"])

  return (
    <CheckboxPrimitive.Label
      data-slot="checkbox-label"
      class={cx(
        "flex items-center gap-2 text-sm leading-none font-medium select-none data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "data-[invalid]:text-destructive",
        props.class,
      )}
      {...rest}
    />
  )
}

export type CheckboxDescriptionProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof CheckboxPrimitive.Description<T>>

export const CheckboxDescription = <T extends ValidComponent = "div">(
  props: CheckboxDescriptionProps<T>,
) => {
  const [, rest] = splitProps(props as CheckboxDescriptionProps, ["class"])

  return (
    <CheckboxPrimitive.Description
      data-slot="checkbox-description"
      class={cx(
        "text-muted-foreground text-sm data-[disabled]:opacity-50",
        props.class,
      )}
      {...rest}
    />
  )
}

export type CheckboxInputProps<T extends ValidComponent = "input"> =
  ComponentProps<typeof CheckboxPrimitive.Input<T>>

export const CheckboxInput = <T extends ValidComponent = "input">(
  props: CheckboxInputProps<T>,
) => {
  const [, rest] = splitProps(props as CheckboxInputProps, ["class"])

  return (
    <CheckboxPrimitive.Input
      data-slot="checkbox-input"
      class={cx(
        "[&:focus-visible+div]:ring-ring/50 peer [&:focus-visible+div]:ring-[3px]",
        props.class,
      )}
      {...rest}
    />
  )
}

export type CheckboxControlProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof CheckboxPrimitive.Control<T>>

export const CheckboxControl = <T extends ValidComponent = "div">(
  props: CheckboxControlProps<T>,
) => {
  const [, rest] = splitProps(props as CheckboxControlProps, ["class"])

  return (
    <CheckboxPrimitive.Control
      data-slot="checkbox-control"
      class={cx(
        "peer-focus-visible:border-ring border-input dark:bg-input/30 data-[checked]:bg-primary data-[checked]:text-primary-foreground dark:data-[checked]:bg-primary data-[checked]:border-primary data-invalid:ring-destructive/20 dark:data-invalid:ring-destructive/40 data-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
        props.class,
      )}
      {...rest}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        class="flex items-center justify-center text-current transition-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-3.5"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 6L9 17l-5-5"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Control>
  )
}

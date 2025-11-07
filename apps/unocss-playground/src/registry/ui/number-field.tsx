import type { ValidComponent, VoidProps } from "solid-js"
import { splitProps, type ComponentProps } from "solid-js"
import { NumberField as NumberFieldPrimitive } from "@kobalte/core/number-field"

import { cx } from "@/registry/lib/cva"

export type NumberFieldProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof NumberFieldPrimitive<T>
>

export const NumberField = <T extends ValidComponent = "div">(
  props: NumberFieldProps<T>,
) => {
  const [, rest] = splitProps(props as NumberFieldProps, ["class"])

  return (
    <NumberFieldPrimitive
      data-slot="number-field"
      class={cx("grid gap-2", props.class)}
      {...rest}
    />
  )
}

export type NumberFieldGroupProps = ComponentProps<"div">

export const NumberFieldGroup = (props: NumberFieldGroupProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="number-field-group"
      class={cx(
        "border-input relative rounded-md border transition-shadow",
        "focus-within:(border-ring ring-ring/50 ring-[3px])",
        "has-aria-[invalid]:(ring-destructive/20 dark:ring-destructive/40 border-destructive)",
        props.class,
      )}
      {...rest}
    />
  )
}

export type NumberFieldLabelProps<T extends ValidComponent = "label"> =
  ComponentProps<typeof NumberFieldPrimitive.Label<T>>

export const NumberFieldLabel = <T extends ValidComponent = "label">(
  props: NumberFieldLabelProps<T>,
) => {
  const [, rest] = splitProps(props as NumberFieldLabelProps, ["class"])

  return (
    <NumberFieldPrimitive.Label
      data-slot="number-field-label"
      class={cx(
        "aria-[invalid]:text-destructive flex select-none items-center gap-2 text-sm font-medium leading-none",
        "peer-disabled:(cursor-not-allowed opacity-50)",
        "group-data-[disabled=true]:(pointer-events-none opacity-50)",
        props.class,
      )}
      {...rest}
    />
  )
}

export type NumberFieldInputProps<T extends ValidComponent = "input"> =
  VoidProps<ComponentProps<typeof NumberFieldPrimitive.Input<T>>>

export const NumberFieldInput = <T extends ValidComponent = "input">(
  props: NumberFieldInputProps<T>,
) => {
  const [, rest] = splitProps(props as NumberFieldInputProps, ["class"])

  return (
    <NumberFieldPrimitive.Input
      data-slot="number-field-input"
      class={cx(
        "placeholder:text-muted-foreground dark:bg-input/30 shadow-xs flex h-9 w-full min-w-0 rounded-md bg-transparent px-3 py-1 text-center text-base outline-none transition-colors md:text-sm",
        "selection:(bg-primary text-primary-foreground)",
        "disabled:(pointer-events-none cursor-not-allowed opacity-50)",
        props.class,
      )}
      {...rest}
    />
  )
}

export type NumberFieldDecrementTriggerProps<
  T extends ValidComponent = "button",
> = VoidProps<ComponentProps<typeof NumberFieldPrimitive.DecrementTrigger<T>>>

export const NumberFieldDecrementTrigger = <
  T extends ValidComponent = "button",
>(
  props: NumberFieldDecrementTriggerProps<T>,
) => {
  const [, rest] = splitProps(props as NumberFieldDecrementTriggerProps, [
    "class",
  ])

  return (
    <NumberFieldPrimitive.DecrementTrigger
      data-slot="number-field-decrement-trigger"
      class={cx(
        "absolute left-0 top-1/2 -translate-y-1/2 p-3 disabled:(pointer-events-none cursor-not-allowed opacity-50)",
        props.class,
      )}
      {...rest}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="size-4"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 12h14"
        />
      </svg>
    </NumberFieldPrimitive.DecrementTrigger>
  )
}

export type NumberFieldIncrementTriggerProps<
  T extends ValidComponent = "button",
> = VoidProps<ComponentProps<typeof NumberFieldPrimitive.IncrementTrigger<T>>>

export const NumberFieldIncrementTrigger = <
  T extends ValidComponent = "button",
>(
  props: NumberFieldIncrementTriggerProps<T>,
) => {
  const [, rest] = splitProps(props as NumberFieldIncrementTriggerProps, [
    "class",
  ])

  return (
    <NumberFieldPrimitive.IncrementTrigger
      data-slot="number-field-increment-trigger"
      class={cx(
        "absolute right-0 top-1/2 -translate-y-1/2 p-3 disabled:(pointer-events-none cursor-not-allowed opacity-50)",
        props.class,
      )}
      {...rest}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="size-4"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 5v14m-7-7h14"
        />
      </svg>
    </NumberFieldPrimitive.IncrementTrigger>
  )
}

export type NumberFieldErrorMessageProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof NumberFieldPrimitive.ErrorMessage<T>>

export const NumberFieldErrorMessage = <T extends ValidComponent = "div">(
  props: NumberFieldErrorMessageProps<T>,
) => {
  const [, rest] = splitProps(props as NumberFieldErrorMessageProps, ["class"])

  return (
    <NumberFieldPrimitive.ErrorMessage
      data-slot="number-field-error-message"
      class={cx("text-destructive text-sm", props.class)}
      {...rest}
    />
  )
}

export type NumberFieldDescriptionProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof NumberFieldPrimitive.Description<T>>

export const NumberFieldDescription = <T extends ValidComponent = "div">(
  props: NumberFieldDescriptionProps<T>,
) => {
  const [, rest] = splitProps(props as NumberFieldDescriptionProps, ["class"])

  return (
    <NumberFieldPrimitive.Description
      data-slot="number-field-description"
      class={cx("text-muted-foreground text-sm", props.class)}
      {...rest}
    />
  )
}

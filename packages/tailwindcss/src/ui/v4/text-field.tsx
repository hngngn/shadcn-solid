import type { ComponentProps, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"
import { TextField as TextFieldPrimitive } from "@kobalte/core/text-field"

import { cx } from "@repo/tailwindcss/utils/cva"

export type TextFieldProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof TextFieldPrimitive<T>
>

export const TextField = <T extends ValidComponent = "div">(
  props: TextFieldProps<T>,
) => {
  const [, rest] = splitProps(props as TextFieldProps, ["class"])

  return (
    <TextFieldPrimitive
      data-slot="text-field"
      class={cx("grid w-full gap-2", props.class)}
      {...rest}
    />
  )
}

export type TextFieldInputProps<T extends ValidComponent = "input"> =
  ComponentProps<typeof TextFieldPrimitive.Input<T>>

export const TextFieldInput = <T extends ValidComponent = "input">(
  props: TextFieldInputProps<T>,
) => {
  const [, rest] = splitProps(props as TextFieldInputProps, ["class"])

  return (
    <TextFieldPrimitive.Input
      data-slot="text-field-input"
      class={cx(
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input shadow-xs flex h-9 rounded-md border bg-transparent px-3 py-1 text-base outline-none transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        props.class,
      )}
      {...rest}
    />
  )
}

export type TextFieldTextAreaProps<T extends ValidComponent = "textarea"> =
  ComponentProps<typeof TextFieldPrimitive.TextArea<T>>

export const TextFieldTextArea = <T extends ValidComponent = "textarea">(
  props: TextFieldTextAreaProps<T>,
) => {
  const [, rest] = splitProps(props as TextFieldTextAreaProps, ["class"])

  return (
    <TextFieldPrimitive.TextArea
      data-slot="text-field-textarea"
      class={cx(
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input shadow-xs flex min-h-16 rounded-md border bg-transparent px-3 py-1 text-base outline-none transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        props.class,
      )}
      {...rest}
    />
  )
}

export type TextFieldLabelProps<T extends ValidComponent = "label"> =
  ComponentProps<typeof TextFieldPrimitive.Label<T>>

export const TextFieldLabel = <T extends ValidComponent = "label">(
  props: TextFieldLabelProps<T>,
) => {
  const [, rest] = splitProps(props as TextFieldLabelProps, ["class"])

  return (
    <TextFieldPrimitive.Label
      data-slot="text-field-label"
      class={cx(
        "select-none text-sm font-medium",
        "data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        "data-[invalid]:text-destructive",
        props.class,
      )}
      {...rest}
    />
  )
}

export type TextFieldErrorMessageProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof TextFieldPrimitive.ErrorMessage<T>>

export const TextFieldErrorMessage = <T extends ValidComponent = "div">(
  props: TextFieldErrorMessageProps<T>,
) => {
  const [, rest] = splitProps(props as TextFieldErrorMessageProps, ["class"])

  return (
    <TextFieldPrimitive.ErrorMessage
      data-slot="text-field-error-message"
      class={cx("text-destructive text-sm", props.class)}
      {...rest}
    />
  )
}

export type TextFieldDescriptionProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof TextFieldPrimitive.Description<T>>

export const TextFieldDescription = <T extends ValidComponent = "div">(
  props: TextFieldDescriptionProps<T>,
) => {
  const [, rest] = splitProps(props as TextFieldDescriptionProps, ["class"])

  return (
    <TextFieldPrimitive.Description
      data-slot="text-field-description"
      class={cx("text-muted-foreground text-sm", props.class)}
      {...rest}
    />
  )
}

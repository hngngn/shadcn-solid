import type { ComponentProps, ValidComponent } from "solid-js"
import { For, Match, Switch, splitProps } from "solid-js"
import { TextField as TextFieldPrimitive } from "@kobalte/core/text-field"

import { cx } from "@/registry/lib/cva"

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
        "placeholder:text-muted-foreground dark:bg-input/30 border-input shadow-xs flex h-9 rounded-md border bg-transparent px-3 py-1 text-base outline-none transition-[color,box-shadow] md:text-sm",
        "focus-visible:(border-ring ring-ring/50 ring-[3px])",
        "aria-[invalid]:(ring-destructive/20 dark:ring-destructive/40 border-destructive)",
        "file:(text-foreground inline-flex h-7 border-0 bg-transparent text-sm font-medium)",
        "selection:(bg-primary text-primary-foreground)",
        "disabled:(pointer-events-none cursor-not-allowed opacity-50)",
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
        "placeholder:text-muted-foreground dark:bg-input/30 border-input shadow-xs flex min-h-16 rounded-md border bg-transparent px-3 py-1 text-base outline-none transition-[color,box-shadow] md:text-sm",
        "focus-visible:(border-ring ring-ring/50 ring-[3px])",
        "aria-[invalid]:(ring-destructive/20 dark:ring-destructive/40 border-destructive)",
        "selection:(bg-primary text-primary-foreground)",
        "disabled:(pointer-events-none cursor-not-allowed opacity-50)",
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
        "data-[disabled]:(pointer-events-none cursor-not-allowed opacity-50)",
        "data-[invalid]:text-destructive",
        props.class,
      )}
      {...rest}
    />
  )
}

export type TextFieldErrorMessageProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof TextFieldPrimitive.ErrorMessage<T>> & {
    errors?: ({ message?: string } | undefined)[]
  }

export const TextFieldErrorMessage = <T extends ValidComponent = "div">(
  props: TextFieldErrorMessageProps<T>,
) => {
  const [, rest] = splitProps(props as TextFieldErrorMessageProps, [
    "class",
    "errors",
    "children",
  ])

  const uniqueErrors = () => [
    ...new Map(props.errors?.map((error) => [error?.message, error])).values(),
  ]

  return (
    <TextFieldPrimitive.ErrorMessage
      data-slot="text-field-error-message"
      class={cx("text-destructive text-sm", props.class)}
      {...rest}
    >
      <Switch
        fallback={
          <ul class="ml-4 flex list-disc flex-col gap-1">
            <For each={uniqueErrors()}>
              {(error) => <li>{error?.message}</li>}
            </For>
          </ul>
        }
      >
        <Match when={props.children}>{props.children}</Match>
        <Match when={!props.errors?.length}>{null}</Match>
        <Match when={uniqueErrors().length == 1}>
          {uniqueErrors()[0]?.message}
        </Match>
      </Switch>
    </TextFieldPrimitive.ErrorMessage>
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

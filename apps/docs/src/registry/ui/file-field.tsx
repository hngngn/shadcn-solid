import type { ComponentProps, ValidComponent } from "solid-js"
import { Show, splitProps } from "solid-js"
import { FileField as FileFieldPrimitive } from "@kobalte/core/file-field"
import type { VariantProps } from "cva"

import { cx } from "@/registry/lib/cva"

import { buttonVariants } from "./button"

export const FileFieldHiddenInput = FileFieldPrimitive.HiddenInput

export type FileFieldProps<T extends ValidComponent = "div"> = ComponentProps<
  typeof FileFieldPrimitive<T>
>

export const FileField = <T extends ValidComponent = "div">(
  props: FileFieldProps<T>,
) => {
  const [, rest] = splitProps(props as FileFieldProps, ["class"])

  return (
    <FileFieldPrimitive
      data-slot="file-field"
      class={cx(
        "group/file-field flex size-full flex-col items-center justify-center gap-2",
        props.class,
      )}
      {...rest}
    />
  )
}

export type FileFieldDropzoneProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof FileFieldPrimitive.Dropzone<T>>

export const FileFieldDropzone = <T extends ValidComponent = "div">(
  props: FileFieldDropzoneProps<T>,
) => {
  const [, rest] = splitProps(props as FileFieldDropzoneProps, ["class"])

  return (
    <FileFieldPrimitive.Dropzone
      data-slot="file-field-dropzone"
      class={cx(
        "text-muted-foreground flex size-full min-h-[200px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed outline-none",
        "focus-visible:border-ring focus-visible:ring-ring/50 transition-[color,box-shadow] focus-visible:ring-[3px]",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "group-[[data-invalid]]/file-field:ring-destructive/20 dark:group-[[data-invalid]]/file-field:ring-destructive/40 group-[[data-invalid]]/file-field:border-destructive",
        props.class,
      )}
      {...rest}
    />
  )
}

export type FileFieldTriggerProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof FileFieldPrimitive.Trigger<T>> &
    VariantProps<typeof buttonVariants>

export const FileFieldTrigger = <T extends ValidComponent = "button">(
  props: FileFieldTriggerProps<T>,
) => {
  const [, rest] = splitProps(props as FileFieldTriggerProps, [
    "class",
    "variant",
    "size",
  ])

  return (
    <FileFieldPrimitive.Trigger
      data-slot="file-field-trigger"
      class={buttonVariants({
        variant: props.variant,
        size: props.size,
        class: ["cursor-pointer", props.class],
      })}
      {...rest}
    />
  )
}

export type FileFieldItemListProps<T extends ValidComponent = "ul"> =
  ComponentProps<typeof FileFieldPrimitive.ItemList<T>>

export const FileFieldItemList = <T extends ValidComponent = "ul">(
  props: FileFieldItemListProps<T>,
) => {
  const [, rest] = splitProps(props as FileFieldItemListProps, ["class"])

  return (
    <FileFieldPrimitive.ItemList
      data-slot="file-field-item-list"
      class={cx("flex w-full flex-col gap-2", props.class)}
      {...rest}
    />
  )
}

export type FileFieldItemProps<T extends ValidComponent = "li"> =
  ComponentProps<typeof FileFieldPrimitive.Item<T>>

export const FileFieldItem = <T extends ValidComponent = "li">(
  props: FileFieldItemProps<T>,
) => {
  const [, rest] = splitProps(props as FileFieldItemProps, ["class"])

  return (
    <FileFieldPrimitive.Item
      data-slot="file-field-item"
      class={cx(
        "bg-secondary/30 text-secondary-foreground grid grid-cols-[auto_1fr_auto] rounded-lg border p-2 text-sm transition-colors [grid-template-areas:'preview_name_delete''preview_size_delete']",
        "gap-2 [&>div:has([data-slot=file-field-item-preview-image])]:[grid-area:preview]",
        props.class,
      )}
      {...rest}
    />
  )
}

export type FileFieldItemPreviewImageProps<T extends ValidComponent = "img"> =
  ComponentProps<typeof FileFieldPrimitive.ItemPreviewImage<T>>

export const FileFieldItemPreviewImage = <T extends ValidComponent = "img">(
  props: FileFieldItemPreviewImageProps<T>,
) => {
  const [, rest] = splitProps(props as FileFieldItemPreviewImageProps, [
    "class",
  ])

  return (
    <FileFieldPrimitive.ItemPreviewImage
      data-slot="file-field-item-preview-image"
      class={cx(
        "aspect-[1] h-auto w-14 self-center rounded-md object-cover",
        props.class,
      )}
      {...rest}
    />
  )
}

export type FileFieldItemSizeProps<T extends ValidComponent = "span"> =
  ComponentProps<typeof FileFieldPrimitive.ItemSize<T>>

export const FileFieldItemSize = <T extends ValidComponent = "span">(
  props: FileFieldItemSizeProps<T>,
) => {
  const [, rest] = splitProps(props as FileFieldItemSizeProps, ["class"])

  return (
    <FileFieldPrimitive.ItemSize
      data-slot="file-field-item-size"
      class={cx("text-muted-foreground [grid-area:size]", props.class)}
      {...rest}
    />
  )
}

export type FileFieldItemNameProps<T extends ValidComponent = "span"> =
  ComponentProps<typeof FileFieldPrimitive.ItemName<T>>

export const FileFieldItemName = <T extends ValidComponent = "span">(
  props: FileFieldItemNameProps<T>,
) => {
  const [, rest] = splitProps(props as FileFieldItemNameProps, ["class"])

  return (
    <FileFieldPrimitive.ItemName
      data-slot="file-field-item-name"
      class={cx("[grid-area:name]", props.class)}
      {...rest}
    />
  )
}

export type FileFieldItemDeleteTriggerProps<
  T extends ValidComponent = "button",
> = ComponentProps<typeof FileFieldPrimitive.ItemDeleteTrigger<T>>

export const FileFieldItemDeleteTrigger = <T extends ValidComponent = "button">(
  props: FileFieldItemDeleteTriggerProps<T>,
) => {
  const [, rest] = splitProps(props as FileFieldItemDeleteTriggerProps, [
    "class",
    "children",
  ])

  return (
    <FileFieldPrimitive.ItemDeleteTrigger
      data-slot="file-field-item-delete-trigger"
      class={cx(
        "focus-visible:ring-destructive/50 cursor-pointer self-center rounded-sm p-0.5 transition-[color,box-shadow] outline-none [grid-area:delete] focus-visible:ring-[1.5px] [&_svg:not([class*='size-'])]:size-4",
        props.class,
      )}
      {...rest}
    >
      <Show when={!props.children} fallback={props.children}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="text-destructive"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 7h16M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m-5 5l4 4m0-4l-4 4"
          />
        </svg>
      </Show>
    </FileFieldPrimitive.ItemDeleteTrigger>
  )
}

export type FileFieldLabelProps<T extends ValidComponent = "label"> =
  ComponentProps<typeof FileFieldPrimitive.Label<T>>

export const FileFieldLabel = <T extends ValidComponent = "label">(
  props: FileFieldLabelProps<T>,
) => {
  const [, rest] = splitProps(props as FileFieldLabelProps, ["class"])

  return (
    <FileFieldPrimitive.Label
      data-slot="file-field-label"
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

export type FileFieldDescriptionProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof FileFieldPrimitive.Description<T>>

export const FileFieldDescription = <T extends ValidComponent = "div">(
  props: FileFieldDescriptionProps<T>,
) => {
  const [, rest] = splitProps(props as FileFieldDescriptionProps, ["class"])

  return (
    <FileFieldPrimitive.Description
      data-slot="file-field-description"
      class={cx("text-muted-foreground text-sm", props.class)}
      {...rest}
    />
  )
}

export type FileFieldErrorMessageProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof FileFieldPrimitive.ErrorMessage<T>>

export const FileFieldErrorMessage = <T extends ValidComponent = "div">(
  props: FileFieldErrorMessageProps<T>,
) => {
  const [, rest] = splitProps(props as FileFieldErrorMessageProps, ["class"])

  return (
    <FileFieldPrimitive.ErrorMessage
      data-slot="file-field-error-message"
      class={cx("text-destructive text-sm", props.class)}
      {...rest}
    />
  )
}

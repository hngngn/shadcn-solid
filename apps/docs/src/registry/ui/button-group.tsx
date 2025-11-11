import type { ValidComponent } from "solid-js"
import { mergeProps, splitProps, type ComponentProps } from "solid-js"
import {
  Polymorphic,
  type ElementOf,
  type PolymorphicProps,
} from "@kobalte/core"
import type { VariantProps } from "cva"

import { cva, cx } from "@/registry/lib/cva"

import { Separator, type SeparatorProps } from "./separator"

export const buttonGroupVariants = cva({
  base: [
    "flex w-fit items-stretch [&>*]:focus-visible:z-10 [&>*]:focus-visible:relative [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md has-[>[data-slot=button-group]]:gap-2",
  ],
  variants: {
    orientation: {
      horizontal:
        "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
      vertical:
        "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
})

export type ButtonGroupProps = ComponentProps<"div"> &
  VariantProps<typeof buttonGroupVariants>

export const ButtonGroup = (props: ButtonGroupProps) => {
  const [, rest] = splitProps(props, ["class", "orientation"])

  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={props.orientation}
      class={buttonGroupVariants({
        orientation: props.orientation,
        class: props.class,
      })}
      {...rest}
    />
  )
}

export type ButtonTextProps<T extends ValidComponent = "div"> = Partial<
  ElementOf<T>
>

export const ButtonText = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ButtonTextProps<T>>,
) => {
  const merge = mergeProps({ as: "div" }, props)
  const [, rest] = splitProps(merge, ["as", "class"])

  return (
    <Polymorphic
      as={merge.as}
      class={cx(
        "bg-muted flex items-center gap-2 rounded-md border px-4 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        merge.class,
      )}
      {...rest}
    />
  )
}

export type ButtonSeparatorProps<T extends ValidComponent = "hr"> =
  SeparatorProps<T>

export const ButtonSeparator = <T extends ValidComponent = "hr">(
  props: ButtonSeparatorProps<T>,
) => {
  const [, rest] = splitProps(props as ButtonSeparatorProps, ["class"])

  return (
    <Separator
      data-slot="button-group-separator"
      class={cx(
        "bg-input relative !m-0 self-stretch data-[orientation=vertical]:h-auto",
        props.class,
      )}
      {...rest}
    />
  )
}

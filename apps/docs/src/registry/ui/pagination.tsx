import type { VoidProps } from "solid-js"
import {
  mergeProps,
  splitProps,
  type ComponentProps,
  type ValidComponent,
} from "solid-js"
import {
  Pagination as PaginationPrimitive,
  usePaginationContext,
} from "@kobalte/core/pagination"

import { cx } from "@/registry/lib/cva"

import type { ButtonProps } from "./button"
import { buttonVariants } from "./button"

export const PaginationItems = PaginationPrimitive.Items

export type PaginationProps<T extends ValidComponent = "nav"> = ComponentProps<
  typeof PaginationPrimitive<T>
>

export const Pagination = <T extends ValidComponent = "nav">(
  props: PaginationProps<T>,
) => {
  const [, rest] = splitProps(props as PaginationProps, ["class"])

  return (
    <PaginationPrimitive
      data-slot="pagination"
      class={cx(
        "mx-auto flex w-full justify-center [&>ul]:flex [&>ul]:flex-row [&>ul]:items-center [&>ul]:gap-1",
        props.class,
      )}
      {...rest}
    />
  )
}

export type PaginationEllipsisProps<T extends ValidComponent = "div"> =
  VoidProps<ComponentProps<typeof PaginationPrimitive.Ellipsis<T>>>

export const PaginationEllipsis = <T extends ValidComponent = "div">(
  props: PaginationEllipsisProps<T>,
) => {
  const [, rest] = splitProps(props as PaginationEllipsisProps, ["class"])

  return (
    <PaginationPrimitive.Ellipsis
      data-slot="pagination-ellipsis"
      class={cx("flex size-9 items-center justify-center", props.class)}
      {...rest}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="size-4"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </g>
      </svg>
    </PaginationPrimitive.Ellipsis>
  )
}

export type PaginationItemProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof PaginationPrimitive.Item<T>> & Pick<ButtonProps, "size">

export const PaginationItem = <T extends ValidComponent = "button">(
  props: PaginationItemProps<T>,
) => {
  const merge = mergeProps({ size: "icon" } as PaginationItemProps, props)
  const [, rest] = splitProps(merge, ["class", "page", "size"])

  const context = usePaginationContext()

  const isCurrent = () => context.page() === props.page

  return (
    <PaginationPrimitive.Item
      data-slot="pagination-item"
      class={buttonVariants({
        variant: isCurrent() ? "outline" : "ghost",
        size: props.size,
        class: props.class,
      })}
      page={props.page}
      {...rest}
    />
  )
}

export type PaginationNextProps<T extends ValidComponent = "button"> =
  VoidProps<ComponentProps<typeof PaginationPrimitive.Next<T>>>

export const PaginationNext = <T extends ValidComponent = "button">(
  props: PaginationNextProps<T>,
) => {
  const [, rest] = splitProps(props as PaginationNextProps, ["class"])

  return (
    <PaginationPrimitive.Next
      data-slot="pagination-next"
      class={cx(
        buttonVariants({
          variant: "ghost",
          class: props.class,
        }),
        "gap-1 px-2.5 sm:pr-2.5",
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
          d="m9 18l6-6l-6-6"
        />
      </svg>
    </PaginationPrimitive.Next>
  )
}

export type PaginationPreviousProps<T extends ValidComponent = "button"> =
  VoidProps<ComponentProps<typeof PaginationPrimitive.Previous<T>>>

export const PaginationPrevious = <T extends ValidComponent = "button">(
  props: PaginationPreviousProps<T>,
) => {
  const [, rest] = splitProps(props as PaginationPreviousProps, ["class"])

  return (
    <PaginationPrimitive.Previous
      data-slot="pagination-previous"
      class={cx(
        buttonVariants({
          variant: "ghost",
          class: props.class,
        }),
        "gap-1 px-2.5 sm:pl-2.5",
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
          d="m15 18l-6-6l6-6"
        />
      </svg>
    </PaginationPrimitive.Previous>
  )
}

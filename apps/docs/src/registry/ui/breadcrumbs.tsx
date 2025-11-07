import type { VoidProps } from "solid-js"
import { splitProps, type ComponentProps, type ValidComponent } from "solid-js"
import { Breadcrumbs as BreadcrumbsPrimitive } from "@kobalte/core/breadcrumbs"

import { cx } from "@/registry/lib/cva"

export type BreadcrumbsProps<T extends ValidComponent = "nav"> = ComponentProps<
  typeof BreadcrumbsPrimitive<T>
>

export const Breadcrumbs = <T extends ValidComponent = "nav">(
  props: BreadcrumbsProps<T>,
) => {
  return (
    <BreadcrumbsPrimitive
      data-slot="breadcrumbs"
      separator={
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
      }
      {...props}
    />
  )
}

export type BreadcrumbListProps = ComponentProps<"ol">

export const BreadcrumbList = (props: BreadcrumbListProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <ol
      data-slot="breadcrumb-list"
      class={cx(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        props.class,
      )}
      {...rest}
    />
  )
}

export type BreadcrumbsItemProps = ComponentProps<"li">

export const BreadcrumbsItem = (props: BreadcrumbsItemProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <li
      data-slot="breadcrumb-item"
      class={cx("inline-flex items-center gap-1.5", props.class)}
      {...rest}
    />
  )
}

export type BreadcrumbsLinkProps<T extends ValidComponent = "a"> =
  ComponentProps<typeof BreadcrumbsPrimitive.Link<T>>

export const BreadcrumbsLink = <T extends ValidComponent = "a">(
  props: BreadcrumbsLinkProps<T>,
) => {
  const [, rest] = splitProps(props as BreadcrumbsLinkProps, ["class"])

  return (
    <BreadcrumbsPrimitive.Link
      data-slot="breadcrumb-link"
      class={cx(
        "hover:text-foreground data-[current]:text-foreground transition-colors data-[current]:font-normal",
        props.class,
      )}
      {...rest}
    />
  )
}

export type BreadcrumbsSeparatorProps<T extends ValidComponent = "span"> =
  ComponentProps<typeof BreadcrumbsPrimitive.Separator<T>>

export const BreadcrumbsSeparator = <T extends ValidComponent = "span">(
  props: BreadcrumbsSeparatorProps<T>,
) => {
  const [, rest] = splitProps(props as BreadcrumbsSeparatorProps, ["class"])

  return (
    <BreadcrumbsPrimitive.Separator
      data-slot="breadcrumb-separator"
      class={cx("[&>svg]:size-3.5", props.class)}
      {...rest}
    />
  )
}

export type BreadcrumbsEllipsisProps = VoidProps<ComponentProps<"span">>

export const BreadcrumbsEllipsis = (props: BreadcrumbsEllipsisProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
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
      <span class="sr-only">More</span>
    </span>
  )
}

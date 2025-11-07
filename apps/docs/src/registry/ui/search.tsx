import type { Accessor, JSX } from "solid-js"
import {
  Show,
  splitProps,
  type ComponentProps,
  type ValidComponent,
} from "solid-js"
import {
  Search as SearchPrimitive,
  useSearchContext,
} from "@kobalte/core/search"

import { cx } from "@/registry/lib/cva"

export const SearchPortal = SearchPrimitive.Portal

export type SearchProps<
  Option,
  OptGroup = never,
  T extends ValidComponent = "div",
> = ComponentProps<typeof SearchPrimitive<Option, OptGroup, T>>

export const Search = <
  Option,
  OtpGroup = never,
  T extends ValidComponent = "div",
>(
  props: SearchProps<Option, OtpGroup, T>,
) => {
  return (
    <SearchPrimitive
      data-slot="search"
      class="flex flex-col gap-2"
      {...props}
    />
  )
}

export type SearchIconProps<T extends ValidComponent = "span"> = ComponentProps<
  typeof SearchPrimitive.Icon<T>
>

export const SearchIcon = <T extends ValidComponent = "span">(
  props: SearchIconProps<T>,
) => {
  const [, rest] = splitProps(props as SearchIconProps, ["class"])

  return (
    <SearchPrimitive.Icon
      data-slot="search-icon"
      class={cx(
        "[&_svg:not([class*='text-'])]:text-muted-foreground [&_svg:not([class*='size-'])]:size-3.5",
        props.class,
      )}
      {...rest}
    />
  )
}

export type SearchIndicatorProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof SearchPrimitive.Indicator<T>>

export const SearchIndicator = <T extends ValidComponent = "div">(
  props: SearchIndicatorProps<T>,
) => {
  const [, rest] = splitProps(props as SearchIndicatorProps, ["class"])

  return (
    <SearchPrimitive.Indicator
      data-slot="search-indicator"
      class={cx("flex items-center justify-center", props.class)}
      {...rest}
    />
  )
}

export type SearchControlProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof SearchPrimitive.Control<T>> & {
    leftIndicator?: Accessor<JSX.Element>
    rightIndicator?: Accessor<JSX.Element>
  }

export const SearchControl = <T extends ValidComponent = "div">(
  props: SearchControlProps<T>,
) => {
  const [, rest] = splitProps(props as SearchControlProps, [
    "class",
    "leftIndicator",
    "rightIndicator",
  ])

  return (
    <SearchPrimitive.Control
      data-slot="search-control"
      class={cx(
        "dark:bg-input/30 border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 md:text-sm",
        "data-[invalid]:ring-destructive/20 dark:data-[invalid]:ring-destructive/40 data-[invalid]:border-destructive",
        props.class,
      )}
      {...rest}
    >
      {props.leftIndicator?.()}
      <SearchPrimitive.Input
        data-slot="search-input"
        class={cx(
          "w-full focus-visible:outline-none",
          props.leftIndicator?.() && "pl-3",
          (!props.rightIndicator?.() && !props.leftIndicator?.()) ||
            props.rightIndicator?.()
            ? "pr-3"
            : null,
        )}
      />
      <Show
        when={!props.rightIndicator?.() && !props.leftIndicator?.()}
        fallback={props.rightIndicator?.()}
      >
        <SearchIndicator
          loadingComponent={
            <SearchIcon class="animate-spin">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 2v4m4.2 1.8l2.9-2.9M18 12h4m-5.8 4.2l2.9 2.9M12 18v4m-7.1-2.9l2.9-2.9M2 12h4M4.9 4.9l2.9 2.9"
                />
              </svg>
            </SearchIcon>
          }
        >
          <SearchIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="m21 21l-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
              </g>
            </svg>
          </SearchIcon>
        </SearchIndicator>
      </Show>
    </SearchPrimitive.Control>
  )
}

export type SearchContentProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof SearchPrimitive.Content<T>>

export const SearchContent = <T extends ValidComponent = "div">(
  props: SearchContentProps<T>,
) => {
  const [, rest] = splitProps(props as SearchContentProps, ["class"])

  return (
    <SearchPrimitive.Content
      data-slot="search-content"
      class={cx(
        "bg-popover text-popover-foreground data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 relative z-50 min-w-[8rem] origin-(--kb-search-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        "[[data-popper-positioner][style*='--kb-popper-content-transform-origin:_top']>[data-slot=search-content]]:slide-in-from-top-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_bottom']>[data-slot=search-content]]:slide-in-from-bottom-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_left']>[data-slot=search-content]]:slide-in-from-left-2 [[data-popper-positioner][style*='--kb-popper-content-transform-origin:_right']>[data-slot=search-content]]:slide-in-from-right-2",
        // TODO: remove when maintainer found a fix
        "data-[closed]:hidden",
        props.class,
      )}
      onCloseAutoFocus={(e) => {
        e.preventDefault()
      }}
      {...rest}
    />
  )
}

export type SearchNoResultProps<T extends ValidComponent = "span"> =
  ComponentProps<typeof SearchPrimitive.NoResult<T>>

export const SearchNoResult = <T extends ValidComponent = "span">(
  props: SearchNoResultProps<T>,
) => {
  const [, rest] = splitProps(props as SearchContentProps, ["class"])

  return (
    <SearchPrimitive.NoResult
      data-slot="search-no-result"
      class={cx("py-6 text-center text-sm", props.class)}
      {...rest}
    />
  )
}

export type SearchItemProps<T extends ValidComponent = "li"> = ComponentProps<
  typeof SearchPrimitive.Item<T>
>

export const SearchItem = <T extends ValidComponent = "li">(
  props: SearchItemProps<T>,
) => {
  const [, rest] = splitProps(props as SearchItemProps, ["class"])

  return (
    <SearchPrimitive.Item
      data-slot="search-item"
      class={cx(
        "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center justify-between gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        props.class,
      )}
      {...rest}
    />
  )
}

export type SearchLabelProps<T extends ValidComponent = "label"> =
  ComponentProps<typeof SearchPrimitive.Label<T>>

export const SearchLabel = <T extends ValidComponent = "label">(
  props: SearchLabelProps<T>,
) => {
  const [, rest] = splitProps(props as SearchLabelProps, ["class"])

  return (
    <SearchPrimitive.Label
      data-slot="search-label"
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

export type SearchDescriptionProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof SearchPrimitive.Description<T>>

export const SearchDescription = <T extends ValidComponent = "div">(
  props: SearchDescriptionProps<T>,
) => {
  const [, rest] = splitProps(props as SearchDescriptionProps, ["class"])

  return (
    <SearchPrimitive.Description
      data-slot="search-description"
      class={cx("text-muted-foreground text-sm", props.class)}
      {...rest}
    />
  )
}

export type SearchItemDescriptionProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof SearchPrimitive.ItemDescription<T>>

export const SearchItemDescription = <T extends ValidComponent = "div">(
  props: SearchItemDescriptionProps<T>,
) => {
  const [, rest] = splitProps(props as SearchItemDescriptionProps, ["class"])

  return (
    <SearchPrimitive.ItemDescription
      data-slot="search-item-description"
      class={cx("text-muted-foreground text-sm", props.class)}
      {...rest}
    />
  )
}

export type SearchItemLabelProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof SearchPrimitive.ItemLabel<T>>

export const SearchItemLabel = <T extends ValidComponent = "div">(
  props: SearchItemLabelProps<T>,
) => {
  return <SearchPrimitive.ItemLabel data-slot="search-item-label" {...props} />
}

export type SearchListboxProps<
  Option,
  OptGroup = never,
  T extends ValidComponent = "ul",
> = ComponentProps<typeof SearchPrimitive.Listbox<Option, OptGroup, T>>

export const SearchListbox = <
  Option,
  OptGroup = never,
  T extends ValidComponent = "ul",
>(
  props: SearchListboxProps<Option, OptGroup, T>,
) => {
  const [, rest] = splitProps(props as SearchListboxProps<Option>, ["class"])
  const context = useSearchContext()

  return (
    <Show when={!context.noResult()}>
      <SearchPrimitive.Listbox
        data-slot="search-listbox"
        class={cx("p-1", props.class)}
        {...rest}
      />
    </Show>
  )
}

export type SearchSectionProps<T extends ValidComponent = "li"> =
  ComponentProps<typeof SearchPrimitive.Section<T>>

export const SearchSection = <T extends ValidComponent = "li">(
  props: SearchSectionProps<T>,
) => {
  return <SearchPrimitive.Section data-slot="search-section" {...props} />
}

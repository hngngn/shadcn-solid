import type { ComponentProps, ValidComponent } from "solid-js"
import { Match, Switch, splitProps } from "solid-js"
import CalendarPrimitive from "@corvu/calendar"

import { cx } from "@/registry/lib/cva"

import { buttonVariants } from "./button"

export type CalendarProps = ComponentProps<typeof CalendarPrimitive>

export const Calendar = (props: CalendarProps) => {
  return <CalendarPrimitive data-slot="calendar" {...props} />
}

export type CalendarNavProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof CalendarPrimitive.Nav<T>>

export const CalendarNav = <T extends ValidComponent = "button">(
  props: CalendarNavProps<T>,
) => {
  const [, rest] = splitProps(props as CalendarNavProps, ["action", "class"])

  return (
    <CalendarPrimitive.Nav
      data-slot="calendar-nav"
      action={props.action}
      class={buttonVariants({
        variant: "outline",
        class: [
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          props.class,
        ],
      })}
      {...rest}
    >
      <Switch>
        <Match
          when={props.action === "prev-year" || props.action === "prev-month"}
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
        </Match>
        <Match
          when={props.action === "next-year" || props.action === "next-month"}
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
        </Match>
      </Switch>
    </CalendarPrimitive.Nav>
  )
}

export type CalendarLabelProps<T extends ValidComponent = "h2"> =
  ComponentProps<typeof CalendarPrimitive.Label<T>>

export const CalendarLabel = <T extends ValidComponent = "h2">(
  props: CalendarLabelProps<T>,
) => {
  const [, rest] = splitProps(props as CalendarLabelProps, ["class"])

  return (
    <CalendarPrimitive.Label
      data-slot="calendar-label"
      class={cx("text-sm font-medium", props.class)}
      {...rest}
    />
  )
}

export type CalendarTableProps<T extends ValidComponent = "table"> =
  ComponentProps<typeof CalendarPrimitive.Table<T>>

export const CalendarTable = <T extends ValidComponent = "table">(
  props: CalendarTableProps<T>,
) => {
  return <CalendarPrimitive.Table data-slot="calendar-table" {...props} />
}

export type CalendarHeadCellProps<T extends ValidComponent = "th"> =
  ComponentProps<typeof CalendarPrimitive.HeadCell<T>>

export const CalendarHeadCell = <T extends ValidComponent = "th">(
  props: CalendarHeadCellProps<T>,
) => {
  const [, rest] = splitProps(props as CalendarHeadCellProps, ["class"])

  return (
    <CalendarPrimitive.HeadCell
      data-slot="calendar-head-cell"
      class={cx(
        "text-muted-foreground w-8 rounded-md text-[0.8rem] font-normal",
        props.class,
      )}
      {...rest}
    />
  )
}

export type CalendarCellProps<T extends ValidComponent = "td"> = ComponentProps<
  typeof CalendarPrimitive.Cell<T>
>

export const CalendarCell = <T extends ValidComponent = "td">(
  props: CalendarCellProps<T>,
) => {
  const [, rest] = splitProps(props as CalendarCellProps, ["class"])

  return (
    <CalendarPrimitive.Cell
      data-slot="calendar-cell"
      class={cx(
        "has-[[data-in-range]]:bg-accent relative p-0 text-center text-sm focus-within:relative focus-within:z-20 has-[[data-disabled][data-selected]]:opacity-50 has-[[data-in-range]]:first:rounded-l-md has-[[data-in-range]]:last:rounded-r-md has-[[data-range-end]]:rounded-r-md has-[[data-range-start]]:rounded-l-md",
        props.class,
      )}
      {...rest}
    />
  )
}

export type CalendarCellTriggerProps<T extends ValidComponent = "button"> =
  ComponentProps<typeof CalendarPrimitive.CellTrigger<T>>

export const CalendarCellTrigger = <T extends ValidComponent = "button">(
  props: CalendarCellTriggerProps<T>,
) => {
  const [, rest] = splitProps(props as CalendarCellTriggerProps, ["class"])

  return (
    <CalendarPrimitive.CellTrigger
      data-slot="calendar-cell-trigger"
      class={buttonVariants({
        variant: "ghost",
        class: [
          "size-8 p-0 font-normal aria-selected:opacity-100",
          "data-[today]:bg-accent data-[today]:text-accent-foreground dark:data-[today]:focus-visible:ring-secondary",
          "aria-selected:not-[[data-in-range]]:bg-primary aria-selected:not-[[data-in-range]]:text-primary-foreground aria-selected:not-[[data-in-range]]:hover:bg-primary aria-selected:not-[[data-in-range]]:hover:text-primary-foreground",
          "data-[range-start]:aria-selected:bg-primary data-[range-start]:aria-selected:text-primary-foreground data-[range-start]:aria-selected:hover:bg-primary! data-[range-start]:aria-selected:hover:text-primary-foreground!",
          "data-[range-end]:aria-selected:bg-primary data-[range-end]:aria-selected:text-primary-foreground data-[range-end]:aria-selected:hover:bg-primary! data-[range-end]:aria-selected:hover:text-primary-foreground!",
          props.class,
        ],
      })}
      {...rest}
    />
  )
}

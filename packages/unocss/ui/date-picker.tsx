import { splitProps, type VoidProps } from "solid-js"
import {
  DatePicker as DatePickerPrimitive,
  type DatePickerContentProps,
  type DatePickerControlProps,
  type DatePickerInputProps,
  type DatePickerRangeTextProps,
  type DatePickerRootProps,
  type DatePickerTableCellProps,
  type DatePickerTableCellTriggerProps,
  type DatePickerTableHeaderProps,
  type DatePickerTableProps,
  type DatePickerTableRowProps,
  type DatePickerTriggerProps,
  type DatePickerViewControlProps,
  type DatePickerViewProps,
  type DatePickerViewTriggerProps,
} from "@ark-ui/solid/date-picker"

import { cn } from "@/libs/cn"

import { buttonVariants } from "./button"

export const DatePickerLabel = DatePickerPrimitive.Label
export const DatePickerTableHead = DatePickerPrimitive.TableHead
export const DatePickerTableBody = DatePickerPrimitive.TableBody
export const DatePickerClearTrigger = DatePickerPrimitive.ClearTrigger
export const DatePickerYearSelect = DatePickerPrimitive.YearSelect
export const DatePickerMonthSelect = DatePickerPrimitive.MonthSelect
export const DatePickerContext = DatePickerPrimitive.Context
export const DatePickerRootProvider = DatePickerPrimitive.RootProvider
export const DatePickerPositioner = DatePickerPrimitive.Positioner

export const DatePicker = (props: DatePickerRootProps) => {
  return (
    <DatePickerPrimitive.Root
      format={(e) => {
        const parsedDate = new Date(Date.parse(e.toString()))

        const normalizedDate = new Date(
          parsedDate.getUTCFullYear(),
          parsedDate.getUTCMonth(),
          parsedDate.getUTCDate()
        )

        return new Intl.DateTimeFormat("en-US", {
          dateStyle: "long",
        }).format(normalizedDate)
      }}
      {...props}
    />
  )
}

export const DatePickerView = (props: DatePickerViewProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <DatePickerPrimitive.View
      class={cn(
        "min-w-[calc(var(--reference-width)-(0.75rem*2))] space-y-4",
        local.class
      )}
      {...rest}
    />
  )
}

export const DatePickerViewControl = (props: DatePickerViewControlProps) => {
  const [local, rest] = splitProps(props, ["class", "children"])

  return (
    <DatePickerPrimitive.ViewControl
      class={cn("flex items-center justify-between", local.class)}
      {...rest}
    >
      <DatePickerPrimitive.PrevTrigger
        class={cn(
          buttonVariants({
            variant: "outline",
          }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m15 6l-6 6l6 6"
          />
          <title>Previous</title>
        </svg>
      </DatePickerPrimitive.PrevTrigger>
      {local.children}
      <DatePickerPrimitive.NextTrigger
        class={cn(
          buttonVariants({
            variant: "outline",
          }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m9 6l6 6l-6 6"
          />
          <title>Next</title>
        </svg>
      </DatePickerPrimitive.NextTrigger>
    </DatePickerPrimitive.ViewControl>
  )
}

export const DatePickerRangeText = (
  props: VoidProps<DatePickerRangeTextProps>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <DatePickerPrimitive.RangeText
      class={cn("text-sm font-medium", local.class)}
      {...rest}
    />
  )
}

export const DatePickerTable = (props: DatePickerTableProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <DatePickerPrimitive.Table
      class={cn("w-full border-collapse space-y-1", local.class)}
      {...rest}
    />
  )
}

export const DatePickerTableRow = (props: DatePickerTableRowProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <DatePickerPrimitive.TableRow
      class={cn("mt-2 flex w-full", local.class)}
      {...rest}
    />
  )
}

export const DatePickerTableHeader = (props: DatePickerTableHeaderProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <DatePickerPrimitive.TableHeader
      class={cn(
        "text-muted-foreground w-8 flex-1 text-[0.8rem] font-normal",
        local.class
      )}
      {...rest}
    />
  )
}

export const DatePickerTableCell = (props: DatePickerTableCellProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <DatePickerPrimitive.TableCell
      class={cn(
        "flex-1 p-0 text-center text-sm",
        "has-[[data-in-range]]:(bg-accent last-of-type:rounded-r-md) first-of-type:rounded-l-md",
        "has-[[data-range-end]]:rounded-r-md has-[[data-range-start]]:rounded-l-md",
        "has-[[data-outside-range][data-in-range]]:bg-accent/50",
        local.class
      )}
      {...rest}
    />
  )
}

export const DatePickerTableCellTrigger = (
  props: DatePickerTableCellTriggerProps
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <DatePickerPrimitive.TableCellTrigger
      class={cn(
        buttonVariants({ variant: "ghost" }),
        "size-8 w-full p-0 font-normal data-[selected]:opacity-100",
        "data-[today]:(bg-accent text-accent-foreground)",
        "[&:is([data-today][data-selected])]:(bg-primary text-primary-foreground)",
        "data-[selected]:(bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground) opacity-100",
        "data-[disabled]:(text-muted-foreground opacity-50)",
        "data-[outside-range]:(text-muted-foreground opacity-50)",
        "[&:is([data-outside-range][data-in-range])]:(bg-accent/50 text-muted-foreground opacity-30)",
        local.class
      )}
      {...rest}
    />
  )
}

export const DatePickerViewTrigger = (props: DatePickerViewTriggerProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <DatePickerPrimitive.ViewTrigger
      class={cn(buttonVariants({ variant: "ghost" }), "h-7", local.class)}
      {...rest}
    />
  )
}

export const DatePickerContent = (props: DatePickerContentProps) => {
  const [local, rest] = splitProps(props, ["class", "children"])

  return (
    <DatePickerPrimitive.Content
      class={cn(
        "bg-popover text-popover-foreground data-[state=open]:(animate-in fade-in-0 zoom-in-95) data-[state=closed]:(animate-out fade-out-0 zoom-out-95) z-50 rounded-md border p-3 shadow-md outline-none",
        local.class
      )}
      {...rest}
    >
      {local.children}
    </DatePickerPrimitive.Content>
  )
}

export const DatePickerControl = (props: DatePickerControlProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <DatePickerPrimitive.Control
      class={cn(
        "inline-flex items-center gap-x-1 [&>input:first-of-type]:rounded-s-md",
        local.class
      )}
      {...rest}
    />
  )
}

export const DatePickerInput = (props: DatePickerInputProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <DatePickerPrimitive.Input
      class={cn(
        "border-border bg-background placeholder:text-muted-foreground focus-visible:(outline-none ring-ring) disabled:(cursor-not-allowed opacity-50) h-9 w-full border px-3 py-1 text-sm shadow-sm ring-[1.5px] transition-shadow",
        local.class
      )}
      {...rest}
    />
  )
}

export const DatePickerTrigger = (props: DatePickerTriggerProps) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <DatePickerPrimitive.Trigger
      class={cn(
        "transition-property-[box-shadow,background-color] focus-visible:(outline-none ring-ring) border-border bg-background hover:bg-accent/50 disabled:(cursor-not-allowed opacity-50) flex min-h-9 min-w-9 items-center justify-center rounded-e-md border ring-[1.5px] transition [&>svg]:size-4",
        local.class
      )}
      {...rest}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <path d="M8 2v4m8-4v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
        </g>
        <title>Calendar</title>
      </svg>
    </DatePickerPrimitive.Trigger>
  )
}

import type { ComponentProps } from "solid-js"
import { splitProps } from "solid-js"

import { cx } from "@/registry/lib/cva"

export type TableProps = ComponentProps<"table">

export const Table = (props: TableProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <div data-slot="table-container" class="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        class={cx("w-full caption-bottom text-sm", props.class)}
        {...rest}
      />
    </div>
  )
}

export type TableHeaderProps = ComponentProps<"thead">

export const TableHeader = (props: TableHeaderProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <thead
      data-slot="table-header"
      class={cx("[&_tr]:border-b", props.class)}
      {...rest}
    />
  )
}

export type TableBodyProps = ComponentProps<"tbody">

export const TableBody = (props: TableBodyProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <tbody
      data-slot="table-body"
      class={cx("[&_tr:last-child]:border-0", props.class)}
      {...rest}
    />
  )
}

export type TableFooterProps = ComponentProps<"tfoot">

export const TableFooter = (props: TableFooterProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <tfoot
      data-slot="table-footer"
      class={cx(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        props.class,
      )}
      {...rest}
    />
  )
}

export type TableRowProps = ComponentProps<"tr">

export const TableRow = (props: TableRowProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <tr
      data-slot="table-row"
      class={cx(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        props.class,
      )}
      {...rest}
    />
  )
}

export type TableHeadProps = ComponentProps<"th">

export const TableHead = (props: TableHeadProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <th
      data-slot="table-head"
      class={cx(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        props.class,
      )}
      {...rest}
    />
  )
}

export type TableCellProps = ComponentProps<"td">

export const TableCell = (props: TableCellProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <td
      data-slot="table-cell"
      class={cx(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        props.class,
      )}
      {...rest}
    />
  )
}

export type TableCaptionProps = ComponentProps<"caption">

export const TableCaption = (props: TableCaptionProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <caption
      data-slot="table-caption"
      class={cx("text-muted-foreground mt-4 text-sm", props.class)}
      {...rest}
    />
  )
}

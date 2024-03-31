import { cn } from "@/libs/cn";
import type {
  DatePickerContentProps,
  DatePickerInputProps,
  DatePickerRangeTextProps,
  DatePickerRootProps,
  DatePickerTableCellProps,
  DatePickerTableCellTriggerProps,
  DatePickerTableHeaderProps,
  DatePickerTableProps,
  DatePickerTableRowProps,
  DatePickerViewControlProps,
  DatePickerViewProps,
  DatePickerViewTriggerProps
} from "@ark-ui/solid";
import { DatePicker as DatePickerPrimitive } from "@ark-ui/solid";
import type { VoidProps } from "solid-js";
import { splitProps } from "solid-js";
import { Portal } from "solid-js/web";
import { Button } from "./button";

export const DatePickerLabel = DatePickerPrimitive.Label;
export const DatePickerTableHead = DatePickerPrimitive.TableHead;
export const DatePickerTableBody = DatePickerPrimitive.TableBody;
export const DatePickerClearTrigger = DatePickerPrimitive.ClearTrigger;

export const DatePicker = (props: DatePickerRootProps) => {
  return (
    <DatePickerPrimitive.Root
      format={e =>
        new Intl.DateTimeFormat("en-US", {
          dateStyle: "long"
        }).format(new Date(e.toString()))
      }
      {...props}
    />
  );
};

export const DatePickerView = (props: DatePickerViewProps) => {
  const [local, rest] = splitProps(props, ["class"]);

  return <DatePickerPrimitive.View class={cn("space-y-4", local.class)} {...rest} />;
};

export const DatePickerViewControl = (props: DatePickerViewControlProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <DatePickerPrimitive.ViewControl
      class={cn("flex items-center justify-between", local.class)}
      {...rest}
    >
      <DatePickerPrimitive.PrevTrigger
        as={Button}
        variant="outline"
        class="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m15 6l-6 6l6 6"
          />
        </svg>
      </DatePickerPrimitive.PrevTrigger>
      {local.children}
      <DatePickerPrimitive.NextTrigger
        as={Button}
        variant="outline"
        class="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m9 6l6 6l-6 6"
          />
        </svg>
      </DatePickerPrimitive.NextTrigger>
    </DatePickerPrimitive.ViewControl>
  );
};

export const DatePickerRangeText = (props: VoidProps<DatePickerRangeTextProps>) => {
  const [local, rest] = splitProps(props, ["class"]);

  return <DatePickerPrimitive.RangeText class={cn("text-sm font-medium", local.class)} {...rest} />;
};

export const DatePickerTable = (props: DatePickerTableProps) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <DatePickerPrimitive.Table
      class={cn("w-full border-collapse space-y-1", local.class)}
      {...rest}
    />
  );
};

export const DatePickerTableRow = (props: DatePickerTableRowProps) => {
  const [local, rest] = splitProps(props, ["class"]);

  return <DatePickerPrimitive.TableRow class={cn("mt-2 flex w-full", local.class)} {...rest} />;
};

export const DatePickerTableHeader = (props: DatePickerTableHeaderProps) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <DatePickerPrimitive.TableHeader
      class={cn("w-8 flex-1 text-[0.8rem] font-normal text-muted-foreground", local.class)}
      {...rest}
    />
  );
};

export const DatePickerTableCell = (props: DatePickerTableCellProps) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <DatePickerPrimitive.TableCell
      class={cn(
        "group flex-1 p-0 text-center text-sm aria-selected:(bg-accent text-accent-foreground first-of-type:rounded-l-md last-of-type:rounded-r-md has-[[data-outside-range]]:bg-accent/50)",
        local.class
      )}
      {...rest}
    />
  );
};

export const DatePickerTableCellTrigger = (props: DatePickerTableCellTriggerProps) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <DatePickerPrimitive.TableCellTrigger
      as={Button}
      variant="ghost"
      class={cn(
        "h-8 w-full p-0 font-normal aria-disabled:(cursor-not-allowed text-muted-foreground opacity-30 hover:bg-accent/50 hover:text-muted-foreground) data-[selected]:(bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground) [&[data-today]:not([data-selected])]:(bg-accent text-accent-foreground) [&[aria-disabled=true]:not([data-in-range][data-outside-range])]:(opacity-50 bg-inherit)",
        local.class
      )}
      {...rest}
    />
  );
};

export const DatePickerViewTrigger = (props: DatePickerViewTriggerProps) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <DatePickerPrimitive.ViewTrigger
      as={Button}
      variant="ghost"
      class={cn("h-7", local.class)}
      {...rest}
    />
  );
};

export const DatePickerContent = (props: DatePickerContentProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <Portal>
      <DatePickerPrimitive.Positioner>
        <DatePickerPrimitive.Content
          class={cn(
            "rounded-md border bg-popover p-3 text-popover-foreground shadow-md outline-none data-[state=open]:(animate-in fade-in-0 zoom-in-95) data-[state=closed]:(animate-out fade-out-0 zoom-out-95)",
            local.class
          )}
          {...rest}
        >
          {local.children}
        </DatePickerPrimitive.Content>
      </DatePickerPrimitive.Positioner>
    </Portal>
  );
};

export const DatePickerInput = (props: DatePickerInputProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <DatePickerPrimitive.Control class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:(outline-none ring-1 ring-ring) disabled:(cursor-not-allowed opacity-50)">
      <DatePickerPrimitive.Input
        class={cn("w-full appearance-none bg-transparent outline-none", local.class)}
        {...rest}
      />
      <DatePickerPrimitive.Trigger class="bg-inherit">
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-1 h-4 w-4" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm12-4v4M8 3v4m-4 4h16m-9 4h1m0 0v3"
          />
        </svg>
      </DatePickerPrimitive.Trigger>
    </DatePickerPrimitive.Control>
  );
};

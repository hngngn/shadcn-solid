import type { ComponentProps } from "solid-js"
import { mergeProps, splitProps } from "solid-js"
import { Command as CommandPrimitive } from "cmdk-solid"

import { cx } from "@/registry/lib/cva"

import type { DialogProps } from "./dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "./dialog"

export type CommandProps = ComponentProps<typeof CommandPrimitive>

export const Command = (props: CommandProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <CommandPrimitive
      data-slot="command"
      class={cx(
        "bg-popover text-popover-foreground flex size-full flex-col overflow-hidden rounded-md",
        props.class,
      )}
      {...rest}
    />
  )
}

export type CommandDialogProps = DialogProps & {
  title?: string
  description?: string
  showCloseButton?: boolean
  class?: string
}

export const CommandDialog = (props: CommandDialogProps) => {
  const merge = mergeProps(
    {
      title: "Command Palette",
      description: "Search for a command to run...",
      showCloseButton: true,
    } as CommandDialogProps,
    props,
  )
  const [, rest] = splitProps(props, [
    "title",
    "description",
    "children",
    "class",
  ])

  return (
    <Dialog {...rest}>
      <DialogHeader class="sr-only">
        <DialogTitle>{merge.title}</DialogTitle>
        <DialogDescription>{merge.description}</DialogDescription>
      </DialogHeader>
      <DialogPortal>
        <DialogContent
          class={cx("overflow-hidden p-0", merge.class)}
          showCloseButton={merge.showCloseButton}
        >
          <Command class="**:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]_svg]:size-5 [&_[cmdk-group-heading]]:(text-muted-foreground px-2 font-medium) [&_[cmdk-item]]:(px-2 py-3)">
            {merge.children}
          </Command>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export type CommandInputProps = ComponentProps<typeof CommandPrimitive.Input>

export const CommandInput = (props: CommandInputProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <div
      data-slot="command-input-wrapper"
      class="flex h-9 items-center gap-2 border-b px-3"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="size-4 shrink-0 opacity-50"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21l-4.3-4.3" />
        </g>
      </svg>
      <CommandPrimitive.Input
        data-slot="command-input"
        class={cx(
          "placeholder:text-muted-foreground outline-hidden flex h-10 w-full rounded-md bg-transparent py-3 text-sm disabled:(cursor-not-allowed opacity-50)",
          props.class,
        )}
        {...rest}
      />
    </div>
  )
}

export type CommandListProps = ComponentProps<typeof CommandPrimitive.List>

export const CommandList = (props: CommandListProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <CommandPrimitive.List
      data-slot="command-list"
      tabIndex={-1}
      class={cx(
        "max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden",
        props.class,
      )}
      {...rest}
    />
  )
}

export type CommandEmptyProps = ComponentProps<typeof CommandPrimitive.Empty>

export const CommandEmpty = (props: CommandEmptyProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      class={cx("py-6 text-center text-sm", props.class)}
      {...rest}
    />
  )
}

export type CommandGroupProps = ComponentProps<typeof CommandPrimitive.Group>

export const CommandGroup = (props: CommandGroupProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      class={cx(
        "text-foreground overflow-hidden p-1",
        "[&_[cmdk-group-heading]]:(text-muted-foreground px-2 py-1.5 text-xs font-medium)",
        props.class,
      )}
      {...rest}
    />
  )
}

export type CommandSeparatorProps = ComponentProps<
  typeof CommandPrimitive.Separator
>

export const CommandSeparator = (props: CommandSeparatorProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      class={cx("bg-border -mx-1 h-px", props.class)}
      {...rest}
    />
  )
}

export type CommandItemProps = ComponentProps<typeof CommandPrimitive.Item>

export const CommandItem = (props: CommandItemProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      class={cx(
        "[&_svg:not([class*=text-])]:text-muted-foreground outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm [&_svg:not([class*=size-])]:size-4",
        "data-[selected=true]:(bg-accent text-accent-foreground)",
        "data-[disabled=true]:(pointer-events-none opacity-50)",
        "[&_svg]:(pointer-events-none shrink-0)",
        props.class,
      )}
      {...rest}
    />
  )
}

export type CommandShortcutProps = ComponentProps<"span">

export const CommandShortcut = (props: CommandShortcutProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <span
      data-slot="command-shortcut"
      class={cx(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        props.class,
      )}
      {...rest}
    />
  )
}

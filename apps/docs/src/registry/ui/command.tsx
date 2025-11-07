import type { ComponentProps } from "solid-js"
import { splitProps } from "solid-js"
import { Command as CommandPrimitive } from "cmdk-solid"

import { cx } from "@/registry/lib/cva"

export type CommandProps = ComponentProps<typeof CommandPrimitive>

export const Command = (props: CommandProps) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <CommandPrimitive
      data-slot="command"
      class={cx(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        props.class,
      )}
      {...rest}
    />
  )
}

export type CommandDialogProps = ComponentProps<
  typeof CommandPrimitive.Dialog
> & {
  title?: string
  description?: string
}

export const CommandDialog = (props: CommandDialogProps) => {
  const [, rest] = splitProps(props, [
    "contentClassName",
    "overlayClassName",
    "class",
  ])

  return (
    <CommandPrimitive.Dialog
      data-slot="command-dialog"
      contentClassName={cx(
        "bg-popover data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 fixed left-[50%] top-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg shadow-lg duration-200 sm:max-w-lg overflow-hidden",
        props.contentClassName,
      )}
      overlayClassName={cx(
        "data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        props.overlayClassName,
      )}
      class={cx(
        "bg-popover text-popover-foreground [&_[cmdk-group-heading]]:text-muted-foreground flex h-full w-full flex-col overflow-hidden rounded-md **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",
        props.class,
      )}
      {...rest}
    />
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
          "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
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
      class={cx(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
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
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
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
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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

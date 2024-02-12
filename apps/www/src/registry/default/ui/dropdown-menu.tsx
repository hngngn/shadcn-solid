import { cn } from "@/lib/cn"
import { DropdownMenu as DropdownMenuPrimitive } from "@kobalte/core"
import type { ComponentProps, ParentProps, VoidComponent } from "solid-js"
import { mergeProps, splitProps, type ParentComponent } from "solid-js"

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuGroup = DropdownMenuPrimitive.Group
export const DropdownMenuSub = DropdownMenuPrimitive.Sub
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

export const DropdownMenu: ParentComponent<
  DropdownMenuPrimitive.DropdownMenuRootProps
> = (props) => {
  const merge = mergeProps<
    ParentProps<DropdownMenuPrimitive.DropdownMenuRootProps[]>
  >({ gutter: 4 }, props)
  return <DropdownMenuPrimitive.Root {...merge} />
}

export const DropdownMenuContent: ParentComponent<
  DropdownMenuPrimitive.DropdownMenuContentProps
> = (props) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        class={cn(
          "min-w-8rem bg-popover text-popover-foreground data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 z-50 overflow-hidden rounded-md border p-1 shadow-md",
          local.class
        )}
        {...rest}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

export const DropdownMenuItem: ParentComponent<
  DropdownMenuPrimitive.DropdownMenuItemProps & {
    inset?: boolean
  }
> = (props) => {
  const [local, rest] = splitProps(props, ["class", "inset"])
  return (
    <DropdownMenuPrimitive.Item
      class={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.inset && "pl-8",
        local.class
      )}
      {...rest}
    />
  )
}

export const DropdownMenuGroupLabel: ParentComponent<
  DropdownMenuPrimitive.DropdownMenuGroupLabelProps
> = (props) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <DropdownMenuPrimitive.GroupLabel
      as="div"
      class={cn("px-2 py-1.5 text-sm font-semibold", local.class)}
      {...rest}
    />
  )
}

export const DropdownMenuItemLabel: ParentComponent<
  DropdownMenuPrimitive.DropdownMenuItemLabelProps
> = (props) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <DropdownMenuPrimitive.ItemLabel
      as="div"
      class={cn("px-2 py-1.5 text-sm font-semibold", local.class)}
      {...rest}
    />
  )
}

export const DropdownMenuSeparator: VoidComponent<
  DropdownMenuPrimitive.DropdownMenuSeparatorProps
> = (props) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <DropdownMenuPrimitive.Separator
      class={cn("bg-muted -mx-1 my-1 h-px", local.class)}
      {...rest}
    />
  )
}

export const DropdownMenuShortcut: ParentComponent<ComponentProps<"span">> = (
  props
) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <span
      class={cn("ml-auto text-xs tracking-widest opacity-60", local.class)}
      {...rest}
    />
  )
}

export const DropdownMenuSubTrigger: ParentComponent<
  DropdownMenuPrimitive.DropdownMenuSubTriggerProps
> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <DropdownMenuPrimitive.SubTrigger
      class={cn(
        "focus:bg-accent data-[expanded]:bg-accent flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        local.class
      )}
      {...rest}
    >
      {local.children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        class="ml-auto h-4 w-4"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m9 6l6 6l-6 6"
        />
      </svg>
    </DropdownMenuPrimitive.SubTrigger>
  )
}

export const DropdownMenuSubContent: ParentComponent<
  DropdownMenuPrimitive.DropdownMenuSubContentProps
> = (props) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent
        class={cn(
          "min-w-8rem bg-popover text-popover-foreground data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 z-50 overflow-hidden rounded-md border p-1 shadow-md",
          local.class
        )}
        {...rest}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

export const DropdownMenuCheckboxItem: ParentComponent<
  DropdownMenuPrimitive.DropdownMenuCheckboxItemProps
> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children", "classList"])
  return (
    <DropdownMenuPrimitive.CheckboxItem
      class={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class
      )}
      {...rest}
    >
      <DropdownMenuPrimitive.ItemIndicator class="absolute left-2 inline-flex h-4 w-4 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="h-4 w-4"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m5 12l5 5L20 7"
          />
        </svg>
      </DropdownMenuPrimitive.ItemIndicator>
      {props.children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

export const DropdownMenuRadioItem: ParentComponent<
  DropdownMenuPrimitive.DropdownMenuRadioItemProps
> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <DropdownMenuPrimitive.RadioItem
      class={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class
      )}
      {...rest}
    >
      <DropdownMenuPrimitive.ItemIndicator class="absolute left-2 inline-flex h-4 w-4 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="h-2 w-2"
        >
          <g
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M0 0h24v24H0z" />
            <path
              fill="currentColor"
              d="M7 3.34a10 10 0 1 1-4.995 8.984L2 12l.005-.324A10 10 0 0 1 7 3.34"
            />
          </g>
        </svg>
      </DropdownMenuPrimitive.ItemIndicator>
      {props.children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

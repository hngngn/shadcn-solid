import { cn } from "@/lib/cn"
import { ContextMenu as ContextMenuPrimitive } from "@kobalte/core"
import { TbCheck, TbChevronRight, TbCircleFilled } from "solid-icons/tb"
import type { ComponentProps, VoidComponent } from "solid-js"
import { splitProps, type ParentComponent } from "solid-js"

export const ContextMenu = ContextMenuPrimitive.Root
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger
export const ContextMenuGroup = ContextMenuPrimitive.Group
export const ContextMenuSub = ContextMenuPrimitive.Sub
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

export const ContextMenuSubTrigger: ParentComponent<
    ContextMenuPrimitive.ContextMenuSubTriggerProps & {
        inset?: boolean
    }
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "children", "inset"])

    return (
        <ContextMenuPrimitive.SubTrigger
            class={cn(
                "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[expanded]:bg-accent data-[expanded]:text-accent-foreground",
                local.inset && "pl-8",
                local.class
            )}
            {...rest}
        >
            {local.children}
            <TbChevronRight class="h-4 w-4 ml-auto" />
        </ContextMenuPrimitive.SubTrigger>
    )
}

export const ContextMenuSubContent: ParentComponent<
    ContextMenuPrimitive.ContextMenuSubContentProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class"])

    return (
        <ContextMenuPrimitive.Portal>
            <ContextMenuPrimitive.SubContent
                class={cn(
                    "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95",
                    local.class
                )}
                {...rest}
            />
        </ContextMenuPrimitive.Portal>
    )
}

export const ContextMenuContent: ParentComponent<
    ContextMenuPrimitive.ContextMenuContentProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class"])

    return (
        <ContextMenuPrimitive.Portal>
            <ContextMenuPrimitive.Content
                class={cn(
                    "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95",
                    local.class
                )}
                {...rest}
            />
        </ContextMenuPrimitive.Portal>
    )
}

export const ContextMenuItem: ParentComponent<
    ContextMenuPrimitive.ContextMenuItemProps & {
        inset?: boolean
    }
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "inset"])

    return (
        <ContextMenuPrimitive.Item
            class={cn(
                "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:(bg-accent text-accent-foreground) data-[disabled]:(pointer-events-none opacity-50)",
                local.inset && "pl-8",
                local.class
            )}
            {...rest}
        />
    )
}

export const ContextMenuCheckboxItem: ParentComponent<
    ContextMenuPrimitive.ContextMenuCheckboxItemProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "children"])

    return (
        <ContextMenuPrimitive.CheckboxItem
            class={cn(
                "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                local.class
            )}
            {...rest}
        >
            <ContextMenuPrimitive.ItemIndicator class="absolute left-2 h-3.5 w-3.5 inline-flex items-center justify-center">
                <TbCheck class="h-4 w-4" />
            </ContextMenuPrimitive.ItemIndicator>
            {local.children}
        </ContextMenuPrimitive.CheckboxItem>
    )
}

export const ContextMenuRadioItem: ParentComponent<
    ContextMenuPrimitive.ContextMenuRadioItemProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "children"])

    return (
        <ContextMenuPrimitive.RadioItem
            class={cn(
                "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                local.class
            )}
            {...rest}
        >
            <ContextMenuPrimitive.ItemIndicator class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                <TbCircleFilled class="h-4 w-4" />
            </ContextMenuPrimitive.ItemIndicator>
            {local.children}
        </ContextMenuPrimitive.RadioItem>
    )
}

export const ContextMenuItemLabel: ParentComponent<
    ContextMenuPrimitive.ContextMenuItemLabelProps & {
        inset?: boolean
    }
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "inset"])

    return (
        <ContextMenuPrimitive.ItemLabel
            class={cn(
                "px-2 py-1.5 text-sm font-semibold text-foreground",
                local.inset && "pl-8",
                local.class
            )}
            {...rest}
        />
    )
}

export const ContextMenuGroupLabel: ParentComponent<
    ContextMenuPrimitive.ContextMenuGroupLabelProps & {
        inset?: boolean
    }
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "inset"])

    return (
        <ContextMenuPrimitive.GroupLabel
            as="div"
            class={cn(
                "px-2 py-1.5 text-sm font-semibold text-foreground",
                local.inset && "pl-8",
                local.class
            )}
            {...rest}
        />
    )
}

export const ContextMenuSeparator: VoidComponent<
    ContextMenuPrimitive.ContextMenuSeparatorProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class"])

    return (
        <ContextMenuPrimitive.Separator
            class={cn("-mx-1 my-1 h-px bg-border", local.class)}
            {...rest}
        />
    )
}

export const ContextMenuShortcut: ParentComponent<ComponentProps<"span">> = (
    props
) => {
    const [local, rest] = splitProps(props, ["class"])

    return (
        <span
            class={cn(
                "ml-auto text-xs tracking-widest text-muted-foreground",
                local.class
            )}
            {...rest}
        />
    )
}

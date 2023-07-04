import { cn } from "@/lib/cn"
import { DropdownMenu as DropdownMenuPrimitive } from "@kobalte/core"
import { IconCheck, IconCircleFilled } from "@tabler/icons-solidjs"
import type { ComponentProps, VoidComponent } from "solid-js"
import { mergeProps, splitProps, type ParentComponent } from "solid-js"

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuGroup = DropdownMenuPrimitive.Group
export const DropdownMenuSub = DropdownMenuPrimitive.Sub
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

export const DropdownMenu: ParentComponent<
    DropdownMenuPrimitive.DropdownMenuRootProps
> = (props) => {
    const merge = mergeProps(
        { gutter: 4 } as DropdownMenuPrimitive.DropdownMenuRootProps,
        props
    )
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
                    "z-50 min-w-8rem overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95",
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
                "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
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
            class={cn("-mx-1 my-1 h-px bg-muted", local.class)}
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
            class={cn(
                "ml-auto text-xs tracking-widest opacity-60",
                local.class
            )}
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
                "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[expanded]:bg-accent",
                local.class
            )}
            {...rest}
        >
            {local.children}
            <i class="i-lucide:chevron-right ml-auto" />
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
                    "z-50 min-w-8rem overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95",
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
                "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                local.class
            )}
            {...rest}
        >
            <DropdownMenuPrimitive.ItemIndicator class="absolute left-2 h-4 w-4 inline-flex items-center justify-center">
                <IconCheck class="h-4 w-4" />
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
                "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                local.class
            )}
            {...rest}
        >
            <DropdownMenuPrimitive.ItemIndicator class="absolute left-2 h-4 w-4 inline-flex items-center justify-center">
                <IconCircleFilled class="w-4 h-4" />
            </DropdownMenuPrimitive.ItemIndicator>
            {props.children}
        </DropdownMenuPrimitive.RadioItem>
    )
}

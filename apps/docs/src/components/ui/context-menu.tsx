import { ContextMenu as ContextMenuPrimitive } from "@kobalte/core"
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
    const [local, rest] = splitProps(props, [
        "class",
        "children",
        "classList",
        "inset",
    ])

    return (
        <ContextMenuPrimitive.SubTrigger
            class="flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
            classList={{
                "pl-8": local.inset,
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        >
            {local.children}
            <i class="i-lucide:chevron-right ml-auto" />
        </ContextMenuPrimitive.SubTrigger>
    )
}

export const ContextMenuSubContent: ParentComponent<
    ContextMenuPrimitive.ContextMenuSubContentProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])

    return (
        <ContextMenuPrimitive.Portal>
            <ContextMenuPrimitive.SubContent
                class="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg origin-[--kb-menu-content-transform-origin] animate-content-hide data-[expanded]:animate-content-show"
                classList={{
                    [local.class!]: Boolean(local.class),
                    ...local.classList,
                }}
                {...rest}
            />
        </ContextMenuPrimitive.Portal>
    )
}

export const ContextMenuContent: ParentComponent<
    ContextMenuPrimitive.ContextMenuContentProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])

    return (
        <ContextMenuPrimitive.Portal>
            <ContextMenuPrimitive.Content
                class="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md origin-[--kb-menu-content-transform-origin] animate-content-hide data-[expanded]:animate-content-show"
                classList={{
                    [local.class!]: Boolean(local.class),
                    ...local.classList,
                }}
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
    const [local, rest] = splitProps(props, ["class", "classList", "inset"])

    return (
        <ContextMenuPrimitive.Item
            class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:(pointer-events-none opacity-50)"
            classList={{
                "pl-8": local.inset,
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const ContextMenuCheckboxItem: ParentComponent<
    ContextMenuPrimitive.ContextMenuCheckboxItemProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList", "children"])

    return (
        <ContextMenuPrimitive.CheckboxItem
            class="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        >
            <ContextMenuPrimitive.ItemIndicator class="absolute left-2 flex h-3.5 w-3.5 inline-flex items-center justify-center">
                <i class="i-lucide:check" />
            </ContextMenuPrimitive.ItemIndicator>
            {local.children}
        </ContextMenuPrimitive.CheckboxItem>
    )
}

export const ContextMenuRadioItem: ParentComponent<
    ContextMenuPrimitive.ContextMenuRadioItemProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList", "children"])

    return (
        <ContextMenuPrimitive.RadioItem
            class="relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        >
            <ContextMenuPrimitive.ItemIndicator class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-1.5 w-1.5 fill-current"
                >
                    <circle cx="12" cy="12" r="10" />
                </svg>
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
    const [local, rest] = splitProps(props, ["class", "classList", "inset"])

    return (
        <ContextMenuPrimitive.ItemLabel
            class="px-2 py-1.5 text-sm font-semibold text-foreground"
            classList={{
                "pl-8": local.inset,
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const ContextMenuGroupLabel: ParentComponent<
    ContextMenuPrimitive.ContextMenuGroupLabelProps & {
        inset?: boolean
    }
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList", "inset"])

    return (
        <ContextMenuPrimitive.GroupLabel
            as="div"
            class="px-2 py-1.5 text-sm font-semibold text-foreground"
            classList={{
                "pl-8": local.inset,
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const ContextMenuSeparator: VoidComponent<
    ContextMenuPrimitive.ContextMenuSeparatorProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])

    return (
        <ContextMenuPrimitive.Separator
            class="-mx-1 my-1 h-px bg-border"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const ContextMenuShortcut: ParentComponent<ComponentProps<"span">> = (
    props
) => {
    const [local, rest] = splitProps(props, ["class", "classList"])

    return (
        <span
            class="ml-auto text-xs tracking-widest text-muted-foreground"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

import { Select as SelectPrimitive } from "@kobalte/core"
import type { VoidComponent } from "solid-js"
import { splitProps, type ParentComponent } from "solid-js"

export const Select = SelectPrimitive.Root
export const SelectValue = SelectPrimitive.Value
export const SelectDescription = SelectPrimitive.Description
export const SelectErrorMessage = SelectPrimitive.ErrorMessage
export const SelectItemDescription = SelectPrimitive.ItemDescription
export const SelectHiddenSelect = SelectPrimitive.HiddenSelect

export const SelectTrigger: ParentComponent<
    SelectPrimitive.SelectTriggerProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList", "children"])
    return (
        <SelectPrimitive.Trigger
            class="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus-visible:(ring ring-ring) disabled:(cursor-not-allowed opacity-50)"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        >
            {local.children}
            <SelectPrimitive.Icon class="flex h-3.5 w-3.5 items-center justify-center">
                <i class="i-lucide:chevrons-up-down opacity-50" />
            </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
    )
}

export const SelectContent: VoidComponent<
    SelectPrimitive.SelectContentProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])
    return (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Content
                class="relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md origin-[--kb-select-content-transform-origin] animate-content-hide data-[expanded]:animate-content-show"
                classList={{
                    [local.class!]: Boolean(local.class),
                    ...local.classList,
                }}
                {...rest}
            >
                <SelectPrimitive.Listbox class="p-1" />
            </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
    )
}

export const SelectItem: ParentComponent<SelectPrimitive.SelectItemProps> = (
    props
) => {
    const [local, rest] = splitProps(props, ["class", "classList", "children"])
    return (
        <SelectPrimitive.Item
            class="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:(bg-accent text-accent-foreground) data-[disabled]:(pointer-events-none opacity-50)"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        >
            <SelectPrimitive.ItemIndicator class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                <i class="i-lucide:check" />
            </SelectPrimitive.ItemIndicator>
            <SelectPrimitive.ItemLabel>
                {local.children}
            </SelectPrimitive.ItemLabel>
        </SelectPrimitive.Item>
    )
}

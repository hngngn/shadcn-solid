import { Combobox as ComboboxPrimitive } from "@kobalte/core"
import type { VoidComponent } from "solid-js"
import { splitProps, type ParentComponent } from "solid-js"

export const Combobox = ComboboxPrimitive.Root
export const ComboboxDescription = ComboboxPrimitive.Description
export const ComboboxErrorMessage = ComboboxPrimitive.ErrorMessage
export const ComboboxItemDescription = ComboboxPrimitive.ItemDescription
export const ComboboxHiddenSelect = ComboboxPrimitive.HiddenSelect
export type ComboboxTriggerMode = ComboboxPrimitive.ComboboxTriggerMode

export const ComboboxInput: VoidComponent<
    ComboboxPrimitive.ComboboxInputProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList", "children"])
    return (
        <ComboboxPrimitive.Input
            class="h-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none disabled:(cursor-not-allowed opacity-50)"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const ComboboxTrigger: ParentComponent<
    ComboboxPrimitive.ComboboxTriggerProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList", "children"])
    return (
        <ComboboxPrimitive.Control>
            <ComboboxPrimitive.Trigger
                class="flex h-9 w-full items-center justify-between rounded-md border border-input shadow-sm px-3"
                classList={{
                    [local.class!]: Boolean(local.class),
                    ...local.classList,
                }}
                {...rest}
            >
                {local.children}
                <ComboboxPrimitive.Icon class="flex h-3.5 w-3.5 items-center justify-center">
                    <i class="i-lucide:chevrons-up-down opacity-50" />
                </ComboboxPrimitive.Icon>
            </ComboboxPrimitive.Trigger>
        </ComboboxPrimitive.Control>
    )
}

export const ComboboxContent: VoidComponent<
    ComboboxPrimitive.ComboboxContentProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])
    return (
        <ComboboxPrimitive.Portal>
            <ComboboxPrimitive.Content
                class="relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md origin-[--kb-combobox-content-transform-origin] animate-content-hide data-[expanded]:animate-content-show"
                classList={{
                    [local.class!]: Boolean(local.class),
                    ...local.classList,
                }}
                {...rest}
            >
                <ComboboxPrimitive.Listbox class="p-1" />
            </ComboboxPrimitive.Content>
        </ComboboxPrimitive.Portal>
    )
}

export const ComboboxItem: ParentComponent<
    ComboboxPrimitive.ComboboxItemProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList", "children"])
    return (
        <ComboboxPrimitive.Item
            class="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none data-[highlighted]:(bg-accent text-accent-foreground) data-[disabled]:(pointer-events-none opacity-50)"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        >
            <ComboboxPrimitive.ItemIndicator class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                <i class="i-lucide:check" />
            </ComboboxPrimitive.ItemIndicator>
            <ComboboxPrimitive.ItemLabel>
                {local.children}
            </ComboboxPrimitive.ItemLabel>
        </ComboboxPrimitive.Item>
    )
}

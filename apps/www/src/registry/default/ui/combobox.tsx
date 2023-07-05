import { cn } from "@/lib/cn"
import { Combobox as ComboboxPrimitive } from "@kobalte/core"
import { IconCheck, IconSelector } from "@tabler/icons-solidjs"
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
    const [local, rest] = splitProps(props, ["class", "children"])
    return (
        <ComboboxPrimitive.Input
            class={cn(
                "h-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                local.class
            )}
            {...rest}
        />
    )
}

export const ComboboxTrigger: ParentComponent<
    ComboboxPrimitive.ComboboxTriggerProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "children"])
    return (
        <ComboboxPrimitive.Control>
            <ComboboxPrimitive.Trigger
                class={cn(
                    "flex h-9 w-full items-center justify-between rounded-md border border-input shadow-sm px-3",
                    local.class
                )}
                {...rest}
            >
                {local.children}
                <ComboboxPrimitive.Icon class="flex h-3.5 w-3.5 items-center justify-center">
                    <IconSelector class="h-4 w-4 opacity-50" />
                </ComboboxPrimitive.Icon>
            </ComboboxPrimitive.Trigger>
        </ComboboxPrimitive.Control>
    )
}

export const ComboboxContent: VoidComponent<
    ComboboxPrimitive.ComboboxContentProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class"])
    return (
        <ComboboxPrimitive.Portal>
            <ComboboxPrimitive.Content
                class={cn(
                    "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95",
                    local.class
                )}
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
            class={cn(
                "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                local.class
            )}
            {...rest}
        >
            <ComboboxPrimitive.ItemIndicator class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                <IconCheck class="w-4 h-4" />
            </ComboboxPrimitive.ItemIndicator>
            <ComboboxPrimitive.ItemLabel>
                {local.children}
            </ComboboxPrimitive.ItemLabel>
        </ComboboxPrimitive.Item>
    )
}

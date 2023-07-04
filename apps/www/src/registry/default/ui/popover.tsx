import { Popover as PopoverPrimitive } from "@kobalte/core"
import { IconX } from "@tabler/icons-solidjs"
import { mergeProps, splitProps, type ParentComponent } from "solid-js"

export const PopoverTrigger = PopoverPrimitive.Trigger
export const PopoverTitle = PopoverPrimitive.Title
export const PopoverDescription = PopoverPrimitive.Description

export const Popover: ParentComponent<PopoverPrimitive.PopoverRootProps> = (
    props
) => {
    const merge = mergeProps(
        { gutter: 4 } as PopoverPrimitive.PopoverRootProps,
        props
    )
    return <PopoverPrimitive.Root {...merge} />
}

export const PopoverContent: ParentComponent<
    PopoverPrimitive.PopoverContentProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList", "children"])
    return (
        <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
                class="z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none origin-[--kb-popover-content-transform-origin] animate-content-hide data-[expanded]:animate-content-show"
                classList={{
                    [local.class!]: Boolean(local.class),
                    ...local.classList,
                }}
                {...rest}
            >
                {local.children}
                <PopoverPrimitive.CloseButton class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:(outline-none ring-2 ring-ring ring-offset-2) disabled:pointer-events-none">
                    <IconX class="h-4 w-4" />
                    <span class="sr-only">Close</span>
                </PopoverPrimitive.CloseButton>
            </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
    )
}

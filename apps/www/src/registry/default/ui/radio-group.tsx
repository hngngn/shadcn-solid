import { cn } from "@/lib/cn"
import { RadioGroup as RadioGroupPrimitive } from "@kobalte/core"
import type { VoidComponent } from "solid-js"
import { splitProps } from "solid-js"

export const RadioGroupDescription = RadioGroupPrimitive.Description
export const RadioGroupErrorMessage = RadioGroupPrimitive.ErrorMessage
export const RadioGroupItemDescription = RadioGroupPrimitive.ItemDescription
export const RadioGroupItemInput = RadioGroupPrimitive.ItemInput
export const RadioGroupItemLabel = RadioGroupPrimitive.ItemLabel
export const RadioGroupLabel = RadioGroupPrimitive.Label
export const RadioGroup = RadioGroupPrimitive.Root
export const RadioGroupItem = RadioGroupPrimitive.Item

export const RadioGroupItemControl: VoidComponent<
    RadioGroupPrimitive.RadioGroupItemControlProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class"])

    return (
        <RadioGroupPrimitive.ItemControl
            as="button"
            role="radio"
            class={cn(
                "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 flex justify-center items-center data-[checked]:bg-foreground",
                local.class
            )}
            {...rest}
        >
            <RadioGroupPrimitive.ItemIndicator class="rounded-full h-2 w-2 data-[checked]:bg-background" />
        </RadioGroupPrimitive.ItemControl>
    )
}

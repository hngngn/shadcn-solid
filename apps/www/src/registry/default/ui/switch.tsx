import { Switch as SwitchPrimitive } from "@kobalte/core"
import { splitProps, type ParentComponent } from "solid-js"

export const SwitchLabel = SwitchPrimitive.Label
export const SwitchInput = SwitchPrimitive.Input
export const Switch = SwitchPrimitive.Root
export const SwitchErrorMessage = SwitchPrimitive.ErrorMessage
export const SwitchDescription = SwitchPrimitive.Description

export const SwitchControl: ParentComponent<
    SwitchPrimitive.SwitchControlProps
> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])

    return (
        <SwitchPrimitive.Control
            class="inline-flex h-20px w-36px shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:(outline-none ring-2 ring-ring ring-offset-2 ring-offset-background) data-[disabled]:(cursor-not-allowed opacity-50) data-[checked]:bg-primary bg-input"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const SwitchThumb: ParentComponent<SwitchPrimitive.SwitchThumbProps> = (
    props
) => {
    const [local, rest] = splitProps(props, ["class", "classList"])

    return (
        <SwitchPrimitive.Thumb
            class="pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[checked]:translate-x-4 translate-x-0"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

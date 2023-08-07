import { cn } from "@/lib/cn"
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
	const [local, rest] = splitProps(props, ["class"])

	return (
		<SwitchPrimitive.Control
			class={cn(
				"inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[checked]:bg-primary bg-input",
				local.class
			)}
			{...rest}
		/>
	)
}

export const SwitchThumb: ParentComponent<SwitchPrimitive.SwitchThumbProps> = (
	props
) => {
	const [local, rest] = splitProps(props, ["class"])

	return (
		<SwitchPrimitive.Thumb
			class={cn(
				"pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[checked]:translate-x-4 translate-x-0",
				local.class
			)}
			{...rest}
		/>
	)
}

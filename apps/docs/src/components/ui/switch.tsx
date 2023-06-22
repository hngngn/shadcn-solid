import { Switch as SwitchPrimitive } from "@kobalte/core"
import { splitProps, type ParentComponent } from "solid-js"

export const SwitchLabel = SwitchPrimitive.Label
export const SwitchInput = SwitchPrimitive.Input
export const Switch = SwitchPrimitive.Root

export const SwitchControl: ParentComponent<
	SwitchPrimitive.SwitchControlProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class"])

	return (
		<SwitchPrimitive.Control
			class="inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-primary bg-input"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
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
			class="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[checked]:translate-x-5 translate-x-0"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

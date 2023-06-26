import { Checkbox as CheckboxPrimitive } from "@kobalte/core"
import { splitProps, type ParentComponent } from "solid-js"

export const CheckboxLabel = CheckboxPrimitive.Label
export const CheckboxInput = CheckboxPrimitive.Input
export const Checkbox = CheckboxPrimitive.Root
export const CheckboxErrorMessage = CheckboxPrimitive.ErrorMessage
export const CheckboxDescription = CheckboxPrimitive.Description

export const CheckboxControl: ParentComponent<
	CheckboxPrimitive.CheckboxControlProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class", "children"])

	return (
		<CheckboxPrimitive.Control
			class="h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:(outline-none ring ring-ring) data-[disabled]:(opacity-50 cursor-not-allowed) data-[checked]:(text-primary-foreground bg-primary)"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		>
			<CheckboxPrimitive.Indicator class="flex items-center justify-center text-current">
				<i class="i-lucide:check" />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Control>
	)
}

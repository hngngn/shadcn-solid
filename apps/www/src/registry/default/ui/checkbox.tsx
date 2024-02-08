import { cn } from "@/lib/cn"
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
			class={cn(
				"h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring focus-visible:ring-ring data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed data-[checked]:text-primary-foreground data-[checked]:bg-primary",
				local.class
			)}
			{...rest}
		>
			<CheckboxPrimitive.Indicator class="flex items-center justify-center text-current">
				<span class="icon-[tabler--check] w-4 h-4" />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Control>
	)
}

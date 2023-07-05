import { Checkbox, CheckboxControl, CheckboxLabel } from "~/components"

export const CheckboxDisabledDemo = () => {
	return (
		<Checkbox class="flex items-center space-x-2" disabled>
			<CheckboxControl />
			<CheckboxLabel class="text-sm font-medium leading-none data-[disabled]:(cursor-not-allowed opacity-70)">
				Accept terms and conditions
			</CheckboxLabel>
		</Checkbox>
	)
}

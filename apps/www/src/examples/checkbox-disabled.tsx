import {
	Checkbox,
	CheckboxControl,
	CheckboxLabel,
} from "@repo/tailwindcss/ui/checkbox";

const CheckboxDisabledDemo = () => {
	return (
		<Checkbox class="flex items-center space-x-2" disabled>
			<CheckboxControl />
			<CheckboxLabel class="data-[disabled]:(cursor-not-allowed opacity-70) text-sm font-medium leading-none">
				Accept terms and conditions
			</CheckboxLabel>
		</Checkbox>
	);
};

export default CheckboxDisabledDemo;

import {
	Checkbox,
	CheckboxControl,
	CheckboxLabel,
} from "@/registry/tailwindcss/ui/checkbox";

const CheckboxDemo = () => {
	return (
		<Checkbox class="flex items-center space-x-2">
			<CheckboxControl />
			<CheckboxLabel class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
				Accept terms and conditions
			</CheckboxLabel>
		</Checkbox>
	);
};

export default CheckboxDemo;

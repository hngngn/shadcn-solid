import type { ComponentProps } from "solid-js";
import {
	Checkbox,
	CheckboxControl,
	type checkboxProps,
} from "../solid/ui/checkbox";
import type { Meta, StoryObj } from "../types";

type Story = StoryObj<checkboxProps & { icon: 1 | 2 }>;

export const Default: Story = {
	args: {
		title: "Subscribe",
		description: "You will receive our weekly newsletter.",
		error: "You must agree to our Terms and Conditions.",
		validationState: "valid",
		icon: 1,
	},
};

export default {
	title: "UnoCSS/Solid/Checkbox",
	render: (props) => (
		<Checkbox {...props}>
			<CheckboxControl
				icon={
					props.icon === 1 ? (
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m5 12l5 5L20 7"
							/>
							<title>Checked</title>
						</svg>
					) : (
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037.033l.034-.03a6 6 0 0 1 4.733-1.44l.246.036a6 6 0 0 1 3.364 10.008l-.18.185l-.048.041l-7.45 7.379a1 1 0 0 1-1.313.082l-.094-.082l-7.493-7.422A6 6 0 0 1 6.979 3.074"
							/>
							<title>Checked</title>
						</svg>
					)
				}
			/>
		</Checkbox>
	),
	argTypes: {
		validationState: {
			control: {
				type: "radio",
			},
			options: ["valid", "invalid"],
		},
		icon: {
			control: {
				type: "radio",
			},
			options: [1, 2],
		},
	},
} satisfies Meta<ComponentProps<typeof Checkbox>>;

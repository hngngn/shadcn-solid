import type { ComponentProps } from "solid-js";
import { Button } from "../solid/ui/button";
import type { Meta, StoryObj } from "../types";

type Story = StoryObj<Parameters<typeof Button>[0]>;

export const Default: Story = {
	args: {
		children: "Button",
		disabled: false,
		appearance: "bezel",
		variant: "default",
	},
};

export default {
	title: "UnoCSS/Solid/Button",
	render: (props) => <Button {...props} />,
	argTypes: {
		variant: {
			options: ["default", "destructive"],
			control: {
				type: "radio",
			},
		},
		appearance: {
			options: ["bezel", "flat", "outline", "plain"],
			control: {
				type: "radio",
			},
		},
		disabled: {
			control: {
				type: "boolean",
			},
		},
	},
} satisfies Meta<ComponentProps<typeof Button>>;

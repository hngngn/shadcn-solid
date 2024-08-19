import type { ComponentProps, ParentProps } from "solid-js";
import { Badge, type badgeProps } from "../solid/ui/badge";
import type { Meta, StoryObj } from "../types";

type Story = StoryObj<ParentProps<badgeProps>>;

export const Default: Story = {
	args: {
		variant: "default",
	},
};

export default {
	title: "TailwindCSS/Solid/Badge",
	render: (props) => <Badge {...props}>Badge</Badge>,
	argTypes: {
		variant: {
			options: ["default", "destructive"],
			control: {
				type: "radio",
			},
		},
	},
} satisfies Meta<ComponentProps<typeof Badge>>;

import type { ComponentProps, ParentProps } from "solid-js";
import {
	Alert,
	AlertDescription,
	AlertTitle,
	type alertProps,
} from "../solid/ui/alert";
import type { Meta, StoryObj } from "../types";

type Story = StoryObj<ParentProps<alertProps>>;

export const Default: Story = {
	args: {
		variant: "default",
	},
};

export default {
	title: "TailwindCSS/Solid/Alert",
	render: (props) => (
		<Alert
			{...props}
			icon={
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m5 7l5 5l-5 5m7 2h7"
					/>
					<title>{}</title>
				</svg>
			}
		>
			<AlertTitle>Heads up!</AlertTitle>
			<AlertDescription>
				You can now add components and dependencies to your app using the cli.
			</AlertDescription>
		</Alert>
	),
	argTypes: {
		variant: {
			options: ["default", "destructive"],
			control: {
				type: "radio",
			},
		},
	},
} satisfies Meta<ComponentProps<typeof Alert>>;

import type { ComponentProps } from "solid-js";
import { Button } from "../solid/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../solid/ui/card";
import type { Meta, StoryObj } from "../types";

type Story = StoryObj<Parameters<typeof Card>[0]>;

export const Default: Story = {};

const notifications = [
	{
		title: "Your call has been confirmed.",
		description: "1 hour ago",
	},
	{
		title: "You have a new message!",
		description: "1 hour ago",
	},
	{
		title: "Your subscription is expiring soon!",
		description: "2 hours ago",
	},
];

export default {
	title: "TailwindCSS/Solid/Card",
	render: (props) => (
		<Card {...props}>
			<CardHeader>
				<CardTitle>Monthly Report</CardTitle>
				<CardDescription>Financial summary for June</CardDescription>
			</CardHeader>
			<CardContent>
				The monthly financial report shows a 15% increase in revenue compared to
				last month.
			</CardContent>
			<CardFooter>
				<Button>View Details</Button>
			</CardFooter>
		</Card>
	),
	argTypes: {},
} satisfies Meta<ComponentProps<typeof Card>>;

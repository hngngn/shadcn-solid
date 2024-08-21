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

export default {
	title: "UnoCSS/Solid/Card",
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

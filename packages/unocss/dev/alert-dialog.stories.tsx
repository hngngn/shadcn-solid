import type { AlertDialogRootProps } from "@kobalte/core/alert-dialog";
import type { ComponentProps, ParentProps } from "solid-js";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogClose,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../solid/ui/alert-dialog";
import type { Meta, StoryObj } from "../types";

type Story = StoryObj<ParentProps<AlertDialogRootProps>>;

export const Default: Story = {};

export default {
	title: "UnoCSS/Solid/Alert Dialog",
	render: (props) => (
		<AlertDialog {...props}>
			<AlertDialogTrigger>Open</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogClose>Cancel</AlertDialogClose>
					<AlertDialogAction>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	),
	argTypes: {},
} satisfies Meta<ComponentProps<typeof AlertDialog>>;

import type {
	CollapsibleRootProps,
	CollapsibleTriggerProps,
} from "@kobalte/core/collapsible";
import type { ComponentProps } from "solid-js";
import { Button } from "../solid/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../solid/ui/collapsible";
import type { Meta, StoryObj } from "../types";

type Story = StoryObj<CollapsibleRootProps>;

export const Default: Story = {
	args: {
		open: false,
	},
};

export default {
	title: "TailwindCSS/Solid/Collapsible",
	render: (props) => (
		<Collapsible class="w-[350px] space-y-2" {...props}>
			<div class="flex items-center justify-between space-x-4 px-4">
				<h4 class="text-sm font-semibold">
					@RyanCarniato starred 2 repositories
				</h4>
				<CollapsibleTrigger
					as={(props: CollapsibleTriggerProps) => (
						<Button {...props} appearance="plain" class="w-9 p-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="size-4"
								viewBox="0 0 24 24"
							>
								<path
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m8 9l4-4l4 4m0 6l-4 4l-4-4"
								/>
								<title>Toggle</title>
							</svg>
						</Button>
					)}
				/>
			</div>
			<CollapsibleContent class="space-y-2">
				<div class="rounded-md border px-4 py-3 font-mono text-sm">
					solid-js
				</div>
				<div class="rounded-md border px-4 py-3 font-mono text-sm">
					solid-start
				</div>
			</CollapsibleContent>
		</Collapsible>
	),
	argTypes: {},
} satisfies Meta<ComponentProps<typeof Collapsible>>;

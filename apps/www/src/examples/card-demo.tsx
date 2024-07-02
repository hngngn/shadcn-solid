import { Button } from "@repo/tailwindcss/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/tailwindcss/ui/card";
import {
	Switch,
	SwitchControl,
	SwitchThumb,
} from "@repo/tailwindcss/ui/switch";
import { For } from "solid-js";

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

const CardDemo = () => {
	return (
		<Card class="w-[380px]">
			<CardHeader>
				<CardTitle>Notifications</CardTitle>
				<CardDescription>You have 3 unread messages.</CardDescription>
			</CardHeader>
			<CardContent class="grid gap-4">
				<div class=" flex items-center space-x-4 rounded-md border p-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						viewBox="0 0 24 24"
					>
						<path
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3H4a4 4 0 0 0 2-3v-3a7 7 0 0 1 4-6M9 17v1a3 3 0 0 0 6 0v-1"
						/>
					</svg>
					<div class="flex-1 space-y-1">
						<p class="text-sm font-medium leading-none">Push Notifications</p>
						<p class="text-sm text-muted-foreground">
							Send notifications to device.
						</p>
					</div>
					<Switch>
						<SwitchControl>
							<SwitchThumb />
						</SwitchControl>
					</Switch>
				</div>
				<div>
					<For each={notifications}>
						{(notification) => (
							<div class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
								<span class="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
								<div class="space-y-1">
									<p class="text-sm font-medium leading-none">
										{notification.title}
									</p>
									<p class="text-sm text-muted-foreground">
										{notification.description}
									</p>
								</div>
							</div>
						)}
					</For>
				</div>
			</CardContent>
			<CardFooter>
				<Button class="w-full">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-2 h-4 w-4"
						viewBox="0 0 24 24"
					>
						<path
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m5 12l5 5L20 7"
						/>
					</svg>
					Mark all as read
				</Button>
			</CardFooter>
		</Card>
	);
};

export default CardDemo;

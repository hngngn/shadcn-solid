import { Button } from "@/registry/tailwindcss/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerLabel,
	DrawerTrigger,
} from "@/registry/tailwindcss/ui/drawer";
import { createSignal } from "solid-js";

const DrawerDemo = () => {
	const [goal, setGoal] = createSignal(350);

	const onClick = (adjustment: number) => {
		setGoal(Math.max(200, Math.min(400, goal() + adjustment)));
	};

	return (
		<Drawer>
			<DrawerTrigger as={Button} variant="outline">
				Open Drawer
			</DrawerTrigger>
			<DrawerContent>
				<div class="mx-auto w-full max-w-sm">
					<DrawerHeader>
						<DrawerLabel>Move Goal</DrawerLabel>
						<DrawerDescription>Set your daily activity goal.</DrawerDescription>
					</DrawerHeader>
					<div class="p-4 pb-0">
						<div class="flex items-center justify-center space-x-2">
							<Button
								variant="outline"
								size="icon"
								class="h-8 w-8 shrink-0 rounded-full"
								onClick={() => onClick(-10)}
								disabled={goal() <= 200}
							>
								<svg
									class="h-4 w-4"
									stroke-width="1.5"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M6 12H18"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
								<span class="sr-only">Decrease</span>
							</Button>
							<div class="flex-1 text-center">
								<div class="text-7xl font-bold tracking-tighter">{goal()}</div>
								<div class="text-[0.70rem] uppercase text-muted-foreground">
									Calories/day
								</div>
							</div>
							<Button
								variant="outline"
								size="icon"
								class="h-8 w-8 shrink-0 rounded-full"
								onClick={() => onClick(10)}
								disabled={goal() >= 400}
							>
								<svg
									class="h-4 w-4"
									stroke-width="1.5"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M6 12H12M18 12H12M12 12V6M12 12V18"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
								<span class="sr-only">Increase</span>
							</Button>
						</div>
					</div>
					<DrawerFooter>
						<Button>Submit</Button>
						<DrawerClose as={Button} variant="outline">
							Cancel
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default DrawerDemo;

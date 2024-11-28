import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/libs/cn";
import { For } from "solid-js";

const SIDES = ["top", "right", "bottom", "left"] as const;

const DrawerSideDemo = () => {
	return (
		<div class="grid grid-cols-2 gap-2">
			<For each={SIDES}>
				{(side) => (
					<Drawer side={side}>
						<DrawerTrigger as={Button} variant="outline">
							{side}
						</DrawerTrigger>
						<DrawerContent
							class={cn(
								(side === "bottom" || side === "top") && "h-64",
								(side === "right" || side === "left") && "w-64",
							)}
						/>
					</Drawer>
				)}
			</For>
		</div>
	);
};

export default DrawerSideDemo;

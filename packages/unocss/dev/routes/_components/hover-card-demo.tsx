import { Button } from "@/components/ui/button";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import type { HoverCardTriggerProps } from "@kobalte/core/hover-card";
import { Image } from "@kobalte/core/image";

const HoverCardDemo = () => {
	return (
		<HoverCard>
			<HoverCardTrigger
				as={(props: HoverCardTriggerProps) => (
					<Button variant="link" {...props}>
						@solid_js
					</Button>
				)}
			/>
			<HoverCardContent class="w-80">
				<div class="flex justify-between space-x-4">
					<Image
						fallbackDelay={400}
						class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
					>
						<Image.Img
							src="https://github.com/solidjs.png"
							class="size-full aspect-square"
						/>
						<Image.Fallback class="flex h-full w-full items-center justify-center rounded-full bg-muted">
							SJ
						</Image.Fallback>
					</Image>
					<div class="space-y-1">
						<h4 class="text-sm font-semibold">@solid_js</h4>
						<p class="text-sm">
							Simple and performant reactivity for building user interfaces.
						</p>
						<div class="flex items-center pt-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="mr-2 h-4 w-4 opacity-70"
								viewBox="0 0 24 24"
							>
								<path
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm12-4v4M8 3v4m-4 4h16m-9 4h1m0 0v3"
								/>
							</svg>
							<span class="text-xs text-muted-foreground">
								Joined March 2021
							</span>
						</div>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	);
};

export default HoverCardDemo;

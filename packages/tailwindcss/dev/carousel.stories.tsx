import { type ComponentProps, Index, Show } from "solid-js";
import { Card, CardContent } from "../solid/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type carouselProps,
} from "../solid/ui/carousel";
import type { Meta, StoryObj } from "../types";

type Story = StoryObj<carouselProps>;

export const Default: Story = {
	args: {
		orientation: "horizontal",
		opts: { align: "start" },
	},
};

export default {
	title: "TailwindCSS/Solid/Carousel",
	render: (props) => (
		<Carousel class="w-full max-w-sm" {...props}>
			<Show
				when={props.orientation === "horizontal"}
				fallback={
					<CarouselContent class="-mt-1 h-[200px]">
						<Index each={Array.from({ length: 5 })}>
							{(_, index) => (
								<CarouselItem class="pt-1 md:basis-1/2">
									<div class="p-1">
										<Card class="w-full">
											<CardContent class="flex items-center justify-center p-6">
												<span class="text-3xl font-semibold">{index + 1}</span>
											</CardContent>
										</Card>
									</div>
								</CarouselItem>
							)}
						</Index>
					</CarouselContent>
				}
			>
				<CarouselContent>
					<Index each={Array.from({ length: 5 })}>
						{(_, index) => (
							<CarouselItem class="md:basis-1/2 lg:basis-1/3">
								<div class="p-1">
									<Card class="w-full">
										<CardContent class="flex aspect-square items-center justify-center p-6">
											<span class="text-3xl font-semibold">{index + 1}</span>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						)}
					</Index>
				</CarouselContent>
			</Show>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	),
	argTypes: {
		orientation: {
			control: {
				type: "radio",
			},
			options: ["horizontal", "vertical"],
		},
	},
	parameters: {
		layout: "centered",
	},
} satisfies Meta<ComponentProps<typeof Carousel>>;

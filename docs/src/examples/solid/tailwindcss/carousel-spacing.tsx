import { Card, CardContent } from "@repo/tailwindcss/solid/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@repo/tailwindcss/solid/carousel";
import { Index } from "solid-js";
const CarouselSpacing = () => {
	return (
		<Carousel class="w-full max-w-sm">
			<CarouselContent class="-ml-1">
				<Index each={Array.from({ length: 5 })}>
					{(_, index) => (
						<CarouselItem class="pl-1 md:basis-1/2 lg:basis-1/3">
							<div class="p-1">
								<Card>
									<CardContent class="flex aspect-square items-center justify-center p-6">
										<span class="text-2xl font-semibold">{index + 1}</span>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					)}
				</Index>
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
};

export default CarouselSpacing;

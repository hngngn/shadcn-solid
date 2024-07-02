import { Card, CardContent } from "@repo/tailwindcss/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@repo/tailwindcss/ui/carousel";
import { Index } from "solid-js";

const CarouselOrientation = () => {
	return (
		<Carousel
			opts={{
				align: "start",
			}}
			orientation="vertical"
			class="w-full max-w-xs"
		>
			<CarouselContent class="-mt-1 h-[200px]">
				<Index each={Array.from({ length: 5 })}>
					{(_, index) => (
						<CarouselItem class="pt-1 md:basis-1/2">
							<div class="p-1">
								<Card>
									<CardContent class="flex items-center justify-center p-6">
										<span class="text-3xl font-semibold">{index + 1}</span>
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

export default CarouselOrientation;

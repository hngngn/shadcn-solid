import { Card, CardContent } from "@/registry/tailwindcss/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/registry/tailwindcss/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Index } from "solid-js";

const CarouselPlugin = () => {
	const autoPlayPlugin = Autoplay({ delay: 2000, stopOnInteraction: true });

	return (
		<Carousel
			plugins={[autoPlayPlugin]}
			class="w-full max-w-xs"
			onMouseEnter={autoPlayPlugin.stop}
			onMouseLeave={() => autoPlayPlugin.play(false)}
		>
			<CarouselContent>
				<Index each={Array.from({ length: 5 })}>
					{(_, index) => (
						<CarouselItem>
							<div class="p-1">
								<Card>
									<CardContent class="flex aspect-square items-center justify-center p-6">
										<span class="text-4xl font-semibold">{index + 1}</span>
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

export default CarouselPlugin;

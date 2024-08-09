import { Card, CardContent } from "@repo/tailwindcss/solid/card";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@repo/tailwindcss/solid/carousel";
import { Index, createEffect, createSignal } from "solid-js";

const CarouselApiDemo = () => {
	const [api, setApi] = createSignal<ReturnType<CarouselApi>>();
	const [current, setCurrent] = createSignal(0);
	const [count, setCount] = createSignal(0);

	const onSelect = () => {
		const _api = api();
		if (_api === undefined) {
			return;
		}

		setCurrent(_api.selectedScrollSnap() + 1);
	};

	createEffect(() => {
		const _api = api();
		if (_api === undefined) {
			return;
		}

		setCount(_api.scrollSnapList().length);
		setCurrent(_api.selectedScrollSnap() + 1);

		_api.on("select", onSelect);
	});

	return (
		<div>
			<Carousel setApi={setApi} class="w-full max-w-xs">
				<CarouselContent>
					<Index each={Array.from({ length: 5 })}>
						{(_, index) => (
							<CarouselItem>
								<Card>
									<CardContent class="flex aspect-square items-center justify-center p-6">
										<span class="text-4xl font-semibold">{index + 1}</span>
									</CardContent>
								</Card>
							</CarouselItem>
						)}
					</Index>
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
			<div class="py-2 text-center text-sm text-muted-foreground">
				Slide {current()} of {count()}
			</div>
		</div>
	);
};

export default CarouselApiDemo;

import Autoplay from "embla-carousel-autoplay";
import { Index } from "solid-js";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "../ui/carousel";

const CarouselPlugin = () => {
  const plugin = Autoplay({ delay: 2000, stopOnInteraction: true });

  return (
    <Carousel
      plugins={[plugin]}
      class="w-full max-w-xs"
      onMouseEnter={plugin.stop}
      onMouseLeave={() => plugin.play(false)}
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

import { Index, createMemo } from "solid-js"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@repo/tailwindcss/ui/v4/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/tailwindcss/ui/v4/carousel"

const CarousePluginDemo = () => {
  const autoPlayPlugin = createMemo(() =>
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  )

  return (
    <Carousel
      plugins={() => [autoPlayPlugin()]}
      class="w-full max-w-xs"
      onMouseEnter={autoPlayPlugin().stop}
      onMouseLeave={() => {
        autoPlayPlugin().play(false)
      }}
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
  )
}

export default CarousePluginDemo

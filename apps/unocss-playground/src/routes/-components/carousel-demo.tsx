import { Index } from "solid-js"

import { Card, CardContent } from "@/registry/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/ui/carousel"

const CarouselDefault = () => {
  return (
    <Carousel class="w-full max-w-xs">
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

const CarouselVertical = () => {
  return (
    <Carousel
      orientation="vertical"
      options={() => ({
        align: "start",
      })}
      class="w-full max-w-xs mb-12"
    >
      <CarouselContent class="-mt-1 h-[150px] md:h-[300px]">
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
  )
}

const CarouselDemo = () => {
  return (
    <div class="size-full flex flex-col items-center justify-center gap-20">
      <CarouselDefault />
      <CarouselVertical />
    </div>
  )
}

export default CarouselDemo

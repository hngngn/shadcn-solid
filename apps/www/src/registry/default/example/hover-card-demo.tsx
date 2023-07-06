import { As } from "@kobalte/core"
import { TbCalendar } from "solid-icons/tb"
import { Button } from "../ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import { Image, ImageFallback, ImageRoot } from "../ui/image"

const HoverCardDemo = () => {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <As component={Button} variant="link">
                    @solid_js
                </As>
            </HoverCardTrigger>
            <HoverCardContent class="w-80">
                <div class="flex justify-between space-x-4">
                    <ImageRoot fallbackDelay={400}>
                        <Image src="https://github.com/solidjs.png" />
                        <ImageFallback>SJ</ImageFallback>
                    </ImageRoot>
                    <div class="space-y-1">
                        <h4 class="text-sm font-semibold">@solid_js</h4>
                        <p class="text-sm">
                            Simple and performant reactivity for building user
                            interfaces.
                        </p>
                        <div class="flex items-center pt-2">
                            <TbCalendar class="h-4 w-4 mr-2 opacity-70" />{" "}
                            <span class="text-xs text-muted-foreground">
                                Joined March 2021
                            </span>
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}

export default HoverCardDemo

import { Button } from "@/registry/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardPortal,
  HoverCardTrigger,
} from "@/registry/ui/hover-card"

const HoverCardDemo = () => {
  return (
    <HoverCard>
      <HoverCardTrigger<typeof Button>
        as={(props) => (
          <Button variant="link" {...props}>
            @solid_js
          </Button>
        )}
      />
      <HoverCardPortal>
        <HoverCardContent class="w-80">
          <div class="flex justify-between gap-4">
            <div class="flex flex-col gap-1">
              <h4 class="text-sm font-semibold">@solid_js</h4>
              <p class="text-sm">
                Simple and performant reactivity for building user interfaces.
              </p>
              <div class="mt-1 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 opacity-70"
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
                <span class="text-muted-foreground text-xs">
                  Joined March 2021
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  )
}

export default HoverCardDemo

import { For } from "solid-js"

import { Button } from "@/registry/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from "@/registry/ui/tooltip"

const TooltipDemo = () => {
  return (
    <div class="flex flex-wrap items-start gap-4">
      <Tooltip>
        <TooltipTrigger as={Button} variant="outline">
          Hover
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
      <div class="flex gap-2">
        <For each={["top", "right", "bottom", "left"]}>
          {(side) => (
            <Tooltip
              placement={side as "top" | "right" | "bottom" | "left"}
              flip={false}
            >
              <TooltipTrigger as={Button} variant="outline" class="capitalize">
                {side}
              </TooltipTrigger>
              <TooltipPortal>
                <TooltipContent>
                  <p>Add to library</p>
                </TooltipContent>
              </TooltipPortal>
            </Tooltip>
          )}
        </For>
      </div>
      <Tooltip>
        <TooltipTrigger as={Button} variant="ghost" size="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0m9-3h.01" />
              <path d="M11 12h1v4h1" />
            </g>
          </svg>
          <span class="sr-only">Info</span>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent>
            To learn more about how this works, check out the docs. If you have
            any questions, please reach out to us.
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </div>
  )
}

export default TooltipDemo

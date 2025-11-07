import { createSignal } from "solid-js"

import { Button } from "@/registry/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/ui/collapsible"

const CollapsibleDemo = () => {
  const [open, setOpen] = createSignal(false)

  return (
    <Collapsible
      open={open()}
      onOpenChange={setOpen}
      class="flex w-full flex-col gap-2 md:w-[350px]"
    >
      <div class="flex items-center justify-between gap-4 px-4">
        <h4 class="line-clamp-1 text-sm font-semibold">
          @RyanCarniato starred 2 repositories
        </h4>
        <CollapsibleTrigger as={Button} variant="ghost" size="sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m7 15l5 5l5-5M7 9l5-5l5 5"
            />
          </svg>
        </CollapsibleTrigger>
      </div>
      <div class="shadow-xs rounded-md border px-4 py-2 font-mono text-sm">
        solid-js
      </div>
      <CollapsibleContent class="flex flex-col gap-2">
        <div class="shadow-xs rounded-md border px-4 py-2 font-mono text-sm">
          solid-start
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default CollapsibleDemo

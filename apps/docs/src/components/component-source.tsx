import type { ComponentProps } from "solid-js"
import { Show, createSignal } from "solid-js"

import { Button } from "@repo/tailwindcss/ui/v4/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/tailwindcss/ui/v4/collapsible"
import { Separator } from "@repo/tailwindcss/ui/v4/separator"

const ComponentSource = (props: ComponentProps<typeof CollapsibleContent>) => {
  const [isOpened, setIsOpened] = createSignal(false)

  return (
    <Collapsible
      class="relative md:-mx-4"
      forceMount
      open={isOpened()}
      onOpenChange={setIsOpened}
    >
      <CollapsibleTrigger<typeof Button>
        as={(props) => (
          <div class="absolute top-1.5 right-9 z-10 flex items-center">
            <Button
              variant="ghost"
              size="sm"
              class="text-muted-foreground h-7 rounded-md px-2"
              {...props}
            >
              <Show when={isOpened()} fallback="Expand">
                Collapse
              </Show>
            </Button>
            <Separator orientation="vertical" class="mx-1.5 !h-4" />
          </div>
        )}
      />
      <CollapsibleContent
        class="data-[closed]:animate-out data-[expanded]:animate-in relative mt-6 overflow-hidden data-[closed]:max-h-64 [&>figure]:mt-0 [&>figure]:md:!mx-0"
        {...props}
      />
      <CollapsibleTrigger class="from-code/70 to-code text-muted-foreground absolute inset-x-0 -bottom-2 flex h-20 items-center justify-center rounded-b-lg bg-gradient-to-b text-sm data-[expanded]:hidden">
        <Show when={isOpened()} fallback="Expand">
          Collapse
        </Show>
      </CollapsibleTrigger>
    </Collapsible>
  )
}

export default ComponentSource

import {
  Show,
  createMemo,
  mergeProps,
  type JSX,
  type ParentProps,
} from "solid-js"
import { Index } from "@/__registry__"

import { cn } from "@/registry/tailwindcss/libs/cn"
import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/registry/tailwindcss/ui/tabs"

type Props = {
  name: string
  block?: boolean
  class?: string
  hideCode?: boolean
}

const ComponentPreview = (props: ParentProps<Props>) => {
  const merge = mergeProps<Partial<Props>[]>(
    { block: false, hideCode: false },
    props
  )
  const Component = createMemo(
    () => Index.tailwindcss[props.name]?.component as JSX.Element
  )

  return (
    <Show
      when={!merge.block}
      fallback={
        <div class="relative aspect-[4/2.5] w-full overflow-hidden rounded-md border">
          <img
            src={`/images/blocks/${props.name}.png`}
            alt={props.name}
            width={1440}
            height={900}
            class="bg-background absolute left-0 top-0 z-20 w-[970px] max-w-none sm:w-[1280px] md:hidden dark:hidden md:dark:hidden"
          />
          <img
            src={`/images/blocks/${props.name}-dark.png`}
            alt={props.name}
            width={1440}
            height={900}
            class="bg-background absolute left-0 top-0 z-20 hidden w-[970px] max-w-none sm:w-[1280px] md:hidden dark:block md:dark:hidden"
          />
          <div class="bg-background absolute inset-0 hidden w-[1600px] md:block">
            <iframe
              src={`/blocks/${props.name}`}
              class="size-full"
              title={props.name}
              loading="lazy"
            />
          </div>
        </div>
      }
    >
      <div
        class={cn(
          "group relative my-4 flex flex-col space-y-2 [&_.preview>div:not(:has(table))]:sm:max-w-[70%]",
          merge.class
        )}
      >
        <Tabs defaultValue="preview">
          <Show when={!merge.hideCode}>
            <div class="pb-3">
              <TabsList class="rounded-none border-b bg-transparent">
                <TabsTrigger value="preview" class="w-fit">
                  Preview
                </TabsTrigger>
                <TabsTrigger value="code" class="w-fit">
                  Code
                </TabsTrigger>
                <TabsIndicator variant="underline" />
              </TabsList>
            </div>
          </Show>
          <TabsContent
            value="preview"
            class="preview relative flex min-h-[350px] w-full items-center justify-center rounded-md border p-10 has-[table:not([data-scope=date-picker])]:border-none has-[table:not([data-scope=date-picker])]:p-0"
          >
            <Show
              when={Component()}
              fallback={
                <p class="text-muted-foreground text-sm">
                  Component{" "}
                  <code class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                    {props.name}
                  </code>{" "}
                  not found in registry.
                </p>
              }
            >
              {Component()}
            </Show>
          </TabsContent>
          <TabsContent value="code">
            <div class="flex flex-col space-y-4">
              <div class="relative w-full rounded-md [&>[data-raw-code]]:mt-0 [&_pre]:!my-0 [&_pre]:!max-h-[350px] [&_pre]:overflow-auto">
                {props.children}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Show>
  )
}

export default ComponentPreview

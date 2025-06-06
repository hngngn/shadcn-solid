import { For, createMemo } from "solid-js"

import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@repo/tailwindcss/ui/v4/tabs"

import CopyButton from "@/components/copy-button"
import useConfig from "@/hooks/use-config"

const CodeBlockCommand = (props: {
  __npm__?: string
  __yarn__?: string
  __pnpm__?: string
  __bun__?: string
}) => {
  const tabs = createMemo(() => ({
    pnpm: props.__pnpm__,
    npm: props.__npm__,
    yarn: props.__yarn__,
    bun: props.__bun__,
  }))

  const { config, setConfig } = useConfig

  return (
    <div class="overflow-x-auto">
      <Tabs
        class="gap-0"
        value={config.packageManager}
        onChange={(value) => {
          // @ts-expect-error
          setConfig("packageManager", value)
        }}
      >
        <div class="border-border/50 flex items-center gap-2 border-b px-3 py-1">
          <div class="bg-foreground flex size-4 items-center justify-center rounded-[1px] opacity-70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="text-code size-3"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 19h8M4 17l6-6l-6-6"
              />
            </svg>
          </div>
          <TabsList class="rounded-none bg-transparent p-0">
            <For each={Object.entries(tabs())}>
              {([key]) => (
                <TabsTrigger
                  value={key}
                  class="h-7 border border-transparent pt-0.5"
                >
                  {key}
                </TabsTrigger>
              )}
            </For>
            <TabsIndicator class="bg-accent border-input shadow-none" />
          </TabsList>
        </div>
        <div class="no-scrollbar overflow-x-auto">
          <For each={Object.entries(tabs())}>
            {([key, value]) => (
              <TabsContent value={key} class="mt-0 px-4 py-3.5">
                <pre>
                  <code
                    class="relative font-mono text-sm leading-none"
                    data-language="bash"
                  >
                    {value}
                  </code>
                </pre>
              </TabsContent>
            )}
          </For>
        </div>
      </Tabs>
      <CopyButton
        class="top-1.5"
        value={
          // @ts-expect-error
          tabs()[currentTab()]
        }
      />
    </div>
  )
}

export default CodeBlockCommand

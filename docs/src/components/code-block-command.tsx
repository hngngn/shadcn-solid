import { ComponentProps, For, Show, createSignal } from "solid-js"

import { Button } from "@/registry/tailwindcss/ui/button"
import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/registry/tailwindcss/ui/tabs"

const CodeBlockCommand = (
  props: {
    npmCommand: string
    yarnCommand: string
    pnpmCommand: string
    bunCommand: string
  } & ComponentProps<"pre">
) => {
  const tabs = [
    {
      title: "pnpm",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="h-3 w-3 fill-current"
        >
          <path d="M0 0v7.5h7.5V0zm8.25 0v7.5h7.498V0zm8.25 0v7.5H24V0zM8.25 8.25v7.5h7.498v-7.5zm8.25 0v7.5H24v-7.5zM0 16.5V24h7.5v-7.5zm8.25 0V24h7.498v-7.5zm8.25 0V24H24v-7.5z" />
          <title>Pnpm command</title>
        </svg>
      ),
      value: () => props.pnpmCommand,
    },
    {
      title: "npm",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="430"
          height="512"
          viewBox="0 0 430 512"
          class="h-3 w-3 fill-current"
        >
          <path d="M71.609 112.569v286.649h143.432v-215.04h71.608v215.04h71.608V112.569H71.608zM430.08 40.96v430.08H0V40.96h430.08z" />
          <title>Npm command</title>
        </svg>
      ),
      value: () => props.npmCommand,
    },
    {
      title: "yarn",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="477"
          height="512"
          viewBox="0 0 477 512"
          class="h-3 w-3 fill-current"
        >
          <path d="M201.875 54.078S223.312-11.056 243.1 1.641c6.101 3.958 28.032 52.767 28.032 52.767s23.416-13.686 26.054-8.575c30.535 93.073 2.41 158.697-37.926 211.067c53.649 50.098 62.982 101.431 52.602 166.38c50.47.108 76.45-49.081 140.82-52.107c28.857-.495 30.341 33.309 8.575 38.585c-44.75 6.317-88.88 56.237-179.077 81.624c-11.635 17.708-81.148 15.728-135.874 20.612c-57.902.615-42.944-44.48-22.096-52.107c-13.596-7.408-14.15-14.796-16.819-14.016c-14.48 77.126-53.98 53.626-78.16 46.995c-18.634-9.894 1.319-33.144 1.319-33.144c-18.14 7.776-32.457-26.504-30.341-60.187c1.979-26.878 31.99-52.932 31.99-52.932c-1.789-67.104 17.813-110.758 69.915-147.417C83.91 177.75 62.91 143.25 90.606 103.06C126.66 93 133.66 50.25 201.876 54.078z" />
          <title>Yarn command</title>
        </svg>
      ),
      value: () => props.yarnCommand,
    },

    {
      title: "bun",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="h-3 w-3 fill-current"
        >
          <path
            fill="currentColor"
            d="M12 22.596c6.628 0 12-4.338 12-9.688c0-3.318-2.057-6.248-5.219-7.986c-1.286-.715-2.297-1.357-3.139-1.89C14.058 2.025 13.08 1.404 12 1.404c-1.097 0-2.334.785-3.966 1.821a49.92 49.92 0 0 1-2.816 1.697C2.057 6.66 0 9.59 0 12.908c0 5.35 5.372 9.687 12 9.687zM10.599 4.715c.334-.759.503-1.58.498-2.409c0-.145.202-.187.23-.029c.658 2.783-.902 4.162-2.057 4.624c-.124.048-.199-.121-.103-.209a5.763 5.763 0 0 0 1.432-1.977m2.058-.102a5.82 5.82 0 0 0-.782-2.306v-.016c-.069-.123.086-.263.185-.172c1.962 2.111 1.307 4.067.556 5.051c-.082.103-.23-.003-.189-.126a5.85 5.85 0 0 0 .23-2.431m1.776-.561a5.727 5.727 0 0 0-1.612-1.806v-.014c-.112-.085-.024-.274.114-.218c2.595 1.087 2.774 3.18 2.459 4.407a.116.116 0 0 1-.049.071a.11.11 0 0 1-.153-.026a.122.122 0 0 1-.022-.083a5.891 5.891 0 0 0-.737-2.331m-5.087.561c-.617.546-1.282.76-2.063 1c-.117 0-.195-.078-.156-.181c1.752-.909 2.376-1.649 2.999-2.778c0 0 .155-.118.188.085c0 .304-.349 1.329-.968 1.874m4.945 11.237a2.957 2.957 0 0 1-.937 1.553c-.346.346-.8.565-1.286.62a2.178 2.178 0 0 1-1.327-.62a2.955 2.955 0 0 1-.925-1.553a.244.244 0 0 1 .064-.198a.234.234 0 0 1 .193-.069h3.965a.226.226 0 0 1 .19.07c.05.053.073.125.063.197m-5.458-2.176a1.862 1.862 0 0 1-2.384-.245a1.98 1.98 0 0 1-.233-2.447c.207-.319.503-.566.848-.713a1.84 1.84 0 0 1 1.092-.11c.366.075.703.261.967.531a1.98 1.98 0 0 1 .408 2.114a1.931 1.931 0 0 1-.698.869zm8.495.005a1.86 1.86 0 0 1-2.381-.253a1.964 1.964 0 0 1-.547-1.366c0-.384.11-.76.32-1.079c.207-.319.503-.567.849-.713a1.844 1.844 0 0 1 1.093-.108c.367.076.704.262.968.534a1.98 1.98 0 0 1 .4 2.117a1.932 1.932 0 0 1-.702.868"
          />
          <title>Bun command</title>
        </svg>
      ),
      value: () => props.bunCommand,
    },
  ]

  const [isCopied, setIsCopied] = createSignal(false)
  const [packageManager, setPackageManager] = createSignal("pnpm")

  const copyToClipboard = async () => {
    const index = tabs.findIndex((d) => d.title === packageManager())

    setIsCopied(true)
    await navigator.clipboard.writeText(tabs[index].value())
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div class="relative mt-6 max-h-[650px] overflow-auto rounded-lg border bg-zinc-950 dark:bg-zinc-900">
      <Tabs
        defaultValue={tabs[2].title}
        value={packageManager()}
        onChange={setPackageManager}
      >
        <div class="dark:border-border flex items-center justify-between border-b border-zinc-700 bg-[#101010] px-3 pt-2.5">
          <TabsList class="h-7 translate-y-[2px] gap-4 bg-transparent p-0 pl-1">
            <For each={tabs}>
              {(item) => {
                return (
                  <TabsTrigger
                    value={item.title}
                    class="w-fit gap-1.5 p-0 pb-1.5 font-mono text-zinc-400 data-[selected]:text-zinc-50"
                  >
                    {item.icon}
                    {item.title}
                  </TabsTrigger>
                )
              }}
            </For>
            <TabsIndicator variant="underline" class="bg-zinc-50" />
          </TabsList>
        </div>
        <For each={tabs}>
          {(item) => {
            return (
              <TabsContent
                value={item.title}
                class="flex w-full overflow-x-auto whitespace-nowrap bg-[#101010] px-4 py-5 data-[orientation=horizontal]:mt-0"
              >
                <pre>
                  <code
                    class="font-mono text-sm leading-none text-white"
                    data-language="bash"
                  >
                    {item.value()}
                  </code>
                </pre>
              </TabsContent>
            )
          }}
        </For>
      </Tabs>
      <Button
        size="icon"
        variant="ghost"
        class="absolute right-2.5 top-2 z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:size-3"
        onClick={copyToClipboard}
      >
        <span class="sr-only">Copy</span>
        <Show
          when={isCopied()}
          fallback={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-3.5"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z" />
                <path d="M4.012 16.737A2.005 2.005 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1" />
              </g>
              <title>Copy</title>
            </svg>
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-3.5"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z" />
              <path d="M4.012 16.737A2.005 2.005 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1M11 14l2 2l4-4" />
            </g>
            <title>Copied</title>
          </svg>
        </Show>
      </Button>
    </div>
  )
}

export default CodeBlockCommand

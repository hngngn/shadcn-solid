import { Match, Show, Switch, createSignal } from "solid-js"

import type { RegistryEntry } from "@/registry/schema"
import { Button } from "@/registry/tailwindcss/ui/button"

const ChartToolbar = (props: { item: RegistryEntry | undefined }) => {
  return (
    <div class="bg-card text-card-foreground relative z-20 flex items-center justify-end gap-2 border-b px-3 py-2.5">
      <div class="text-muted-foreground flex items-center gap-1.5 pl-1 text-[13px] [&>svg]:h-[0.9rem] [&>svg]:w-[0.9rem]">
        <ChartTitle item={props.item} />
      </div>
      <div class="ml-auto">
        <ChartCopyButton item={props.item} />
      </div>
    </div>
  )
}

export default ChartToolbar

const ChartTitle = (props: { item: RegistryEntry | undefined }) => {
  return (
    <Switch>
      <Match when={props.item?.name.includes("area")}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M3 3v16a2 2 0 0 0 2 2h16" />
            <path d="M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z" />
          </g>
        </svg>
        Chart
      </Match>
      <Match when={props.item?.name.includes("bar")}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M3 3v16a2 2 0 0 0 2 2h16" />
            <rect width="4" height="12" x="15" y="5" rx="1" />
            <rect width="4" height="9" x="7" y="8" rx="1" />
          </g>
        </svg>
        Chart
      </Match>
      <Match when={props.item?.name.includes("line")}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M3 3v16a2 2 0 0 0 2 2h16" />
            <path d="m19 9l-5 5l-4-4l-3 3" />
          </g>
        </svg>
        Chart
      </Match>
      <Match when={props.item?.name.includes("donut")}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z" />
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
          </g>
        </svg>
        Chart
      </Match>
      <Match when={props.item?.name.includes("tooltip")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"
          />
        </svg>
        Tooltip
      </Match>
    </Switch>
  )
}

const ChartCopyButton = (props: { item: RegistryEntry | undefined }) => {
  const [isCopied, setIsCopied] = createSignal(false)

  const copyToClipboard = async () => {
    setIsCopied(true)
    // @ts-expect-error
    await navigator.clipboard.writeText(props.item?.files[0].content)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={copyToClipboard}
      class="text-foreground hover:bg-muted dark:text-foreground size-6 rounded-[6px] bg-transparent shadow-none [&_svg]:size-3"
    >
      <Show
        when={isCopied()}
        fallback={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
  )
}

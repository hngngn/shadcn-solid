import type { ComponentProps } from "solid-js"
import { Match, Show, Switch, createSignal, splitProps } from "solid-js"

import { cx } from "@/registry/lib/cva"
import type { ButtonProps } from "@/registry/ui/button"
import { Button } from "@/registry/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from "@/registry/ui/tooltip"

export const ChartToolbar = (props: ComponentProps<"div"> & { item: any }) => {
  const [, rest] = splitProps(props, ["class", "item"])

  return (
    <div class={cx("flex items-center gap-2", props.class)} {...rest}>
      <div class="text-muted-foreground flex items-center gap-1.5 pl-1 text-[13px] [&>svg]:h-[0.9rem] [&>svg]:w-[0.9rem]">
        <ChartTitle item={props.item} />
      </div>
      <div class="ml-auto flex items-center gap-2 [&>form]:flex">
        <ChartCopyButton
          item={props.item}
          class="[&_svg]-h-3 text-foreground hover:bg-muted dark:text-foreground h-6 w-6 rounded-[6px] bg-transparent shadow-none [&_svg]:w-3"
        />
      </div>
    </div>
  )
}

const ChartTitle = (props: { item: any }) => {
  return (
    <Switch>
      <Match when={props.item?.name.startsWith("area")}>
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
      <Match when={props.item?.name.startsWith("bar")}>
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
      <Match when={props.item?.name.startsWith("line")}>
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
      <Match when={props.item?.name.startsWith("donut")}>
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

const ChartCopyButton = (props: ButtonProps & { item: any }) => {
  const [isCopied, setIsCopied] = createSignal(false)

  const copyToClipboard = async () => {
    setIsCopied(true)
    await navigator.clipboard.writeText(props.item?.files[0].content)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Tooltip>
      <TooltipTrigger<typeof Button>
        class={cx(
          "[&_svg]-h-3.5 h-7 w-7 rounded-[6px] [&_svg]:w-3.5",
          props.class,
        )}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={copyToClipboard}
        as={(props) => (
          <Button variant="ghost" size="icon" {...props}>
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
                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  </g>
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
                  <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <path d="m9 14l2 2l4-4" />
                </g>
              </svg>
            </Show>
          </Button>
        )}
      />
      <TooltipPortal>
        <TooltipContent>
          <Show when={isCopied()} fallback="Copy to Clipboard">
            Copied
          </Show>
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
  )
}

import { Show, createSignal, mergeProps, splitProps } from "solid-js"

import type { ButtonProps } from "@repo/tailwindcss/ui/v4/button"
import { Button } from "@repo/tailwindcss/ui/v4/button"
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from "@repo/tailwindcss/ui/v4/tooltip"
import { cx } from "@repo/tailwindcss/utils/cva"

type Props = ButtonProps & { value: string }

const CopyButton = (props: Props) => {
  const merge = mergeProps(
    {
      variant: "ghost",
    } as Props,
    props,
  )
  const [local, rest] = splitProps(merge, ["value", "variant", "class"])

  const [hasCopied, setHasCopied] = createSignal(false)

  const copyToClipboard = () => {
    setHasCopied(true)
    navigator.clipboard.writeText(local.value)
    setTimeout(() => setHasCopied(false), 2000)
  }

  return (
    <Tooltip>
      <TooltipTrigger<typeof Button>
        data-slot="copy-button"
        onClick={copyToClipboard}
        as={(props) => (
          <Button
            size="icon"
            variant={local.variant}
            class={cx(
              "bg-code absolute top-3 right-2 z-10 size-7 hover:opacity-100 focus-visible:opacity-100",
              local.class,
            )}
            {...rest}
            {...props}
          >
            <span class="sr-only">Copy</span>
            <Show
              when={hasCopied()}
              fallback={
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
                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  </g>
                </svg>
              }
            >
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
          <Show when={hasCopied()} fallback="Copy to Clipboard">
            Copied
          </Show>
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
  )
}

export default CopyButton

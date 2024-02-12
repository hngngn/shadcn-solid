import { cn } from "@/lib/cn"
import { Button } from "@/registry/default/ui/button"
import type { VoidComponent } from "solid-js"
import { Show, createSignal } from "solid-js"

type Props = {
  preRef: HTMLPreElement | undefined
  class?: string
}

export const CopyButton: VoidComponent<Props> = (props) => {
  const [isCopied, setIsCopied] = createSignal(false)

  const copyToClipboard = () => {
    const innerText = props.preRef?.querySelector("code")?.innerText ?? ""
    setIsCopied(true)
    void navigator.clipboard.writeText(innerText)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      class={cn(
        "absolute right-4 top-4 z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50",
        props.class
      )}
      onClick={copyToClipboard}
    >
      <span class="sr-only">Copy</span>
      <Show
        when={isCopied()}
        fallback={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
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
          </svg>
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
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
        </svg>
      </Show>
    </Button>
  )
}

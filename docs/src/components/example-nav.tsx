import { For } from "solid-js"
import { useLocation } from "@solidjs/router"

import { cn } from "@/registry/tailwindcss/libs/cn"

const examples = [
  {
    name: "Mail",
    href: "/examples/mail",
  },
  {
    name: "Cards",
    href: "/examples/cards",
  },
  {
    name: "Authentication",
    href: "/examples/authentication",
  },
]

const ExampleNav = () => {
  const location = useLocation()

  return (
    <div class="relative">
      <div class="flex items-center">
        <For each={examples}>
          {(item, index) => (
            <a
              href={item.href}
              class={cn(
                "hover:text-primary flex h-7 items-center justify-center rounded-full px-4 text-center text-sm font-medium transition-colors",
                location.pathname.startsWith(item.href) ||
                  (index() === 0 && location.pathname === "/")
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </a>
          )}
        </For>
      </div>
    </div>
  )
}

export default ExampleNav

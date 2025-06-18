import { For, Show } from "solid-js"
import { Link, useLocation } from "@tanstack/solid-router"

import { cx } from "@repo/tailwindcss/utils/cva"

import { docsConfig } from "@/config/docs"

const Sidebar = () => {
  const location = useLocation()

  return (
    <div class="w-full">
      <For each={docsConfig.sidebarNav}>
        {(item) => (
          <div class="pb-6">
            <h4 class="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
              {item.title}
            </h4>
            <div class="grid grid-flow-row auto-rows-max gap-0.5 text-sm">
              <For each={item.items}>
                {(item) => (
                  <Show
                    when={!item.disabled}
                    fallback={
                      <span
                        class={cx(
                          "text-muted-foreground flex w-full cursor-not-allowed items-center rounded-md p-2 hover:underline",
                          item.disabled && "cursor-not-allowed opacity-60",
                        )}
                      >
                        {item.title}
                        <Show when={item.indicator}>
                          <span
                            class={cx(
                              "ml-2 rounded-md bg-lime-600/10 px-2 py-1 text-xs leading-none text-lime-600 no-underline ring-1 ring-lime-600/20 ring-inset group-hover:no-underline dark:bg-lime-500/10 dark:text-lime-500 dark:ring-lime-500/20",
                              item.indicator === "Soon" &&
                                "bg-muted text-muted-foreground",
                              item.indicator === "Updated" &&
                                "bg-blue-600/10 text-blue-600 ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-500/20",
                            )}
                          >
                            {item.indicator}
                          </span>
                        </Show>
                      </span>
                    }
                  >
                    <Link
                      to={item.href}
                      class={cx(
                        "hover:bg-accent hover:text-accent-foreground flex h-8 w-full items-center rounded-md border border-transparent px-2",
                        item.disabled && "cursor-not-allowed opacity-60",
                        location().pathname === item.href ||
                          (location().pathname.includes("/docs/installation") &&
                            item.href === "/docs/installation")
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-muted-foreground",
                      )}
                    >
                      {item.title}
                      <Show when={item.indicator}>
                        <span
                          class={cx(
                            "ml-2 rounded-md bg-lime-600/10 px-2 py-1 text-xs leading-none text-lime-600 no-underline ring-1 ring-lime-600/20 ring-inset group-hover:no-underline dark:bg-lime-500/10 dark:text-lime-500 dark:ring-lime-500/20",
                            item.indicator === "Soon" &&
                              "bg-muted text-muted-foreground",
                            item.indicator === "Updated" &&
                              "bg-blue-600/10 text-blue-600 ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-500/20",
                          )}
                        >
                          {item.indicator}
                        </span>
                      </Show>
                    </Link>
                  </Show>
                )}
              </For>
            </div>
          </div>
        )}
      </For>
    </div>
  )
}

export default Sidebar

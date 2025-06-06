import type { ComponentProps } from "solid-js"
import { For, splitProps } from "solid-js"
import { Link, useLocation } from "@tanstack/solid-router"

import { Button } from "@repo/tailwindcss/ui/v4/button"
import { cx } from "@repo/tailwindcss/utils/cva"

import type { TNavItem } from "@/config/docs"

const MainNav = (
  props: ComponentProps<"nav"> & {
    items: TNavItem[]
  },
) => {
  const [local, rest] = splitProps(props, ["class", "items"])
  const location = useLocation()

  return (
    <nav class={cx("items-center gap-0.5", local.class)} {...rest}>
      <For each={local.items}>
        {(item) => (
          <Button<typeof Link>
            variant="ghost"
            size="sm"
            as={(props) => (
              <Link
                to={item.href}
                class={cx(location().pathname === item.href && "text-primary")}
                {...props}
              >
                {item.title}
              </Link>
            )}
          />
        )}
      </For>
    </nav>
  )
}

export default MainNav

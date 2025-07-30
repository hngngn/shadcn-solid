import { For, splitProps, type ComponentProps } from "solid-js"
import { Link } from "@tanstack/solid-router"

import { cx } from "@repo/tailwindcss/utils/cva"

const links = [
  {
    name: "Area Charts",
    href: "/charts/area",
  },
  {
    name: "Bar Charts",
    href: "/charts/bar",
  },
  {
    name: "Line Charts",
    href: "/charts/line",
  },
  {
    name: "Pie Charts",
    href: "/charts/pie",
  },
  {
    name: "Radar Charts",
    href: "/charts/radar",
  },
  {
    name: "Radial Charts",
    href: "/charts/radial",
  },
  {
    name: "Tooltips",
    href: "/charts/tooltip",
  },
]

const ChartNav = (props: ComponentProps<"div">) => {
  const [, rest] = splitProps(props, ["class"])

  return (
    <div class="relative overflow-hidden">
      <div class="max-w-[600px] overflow-auto lg:max-w-none">
        <div class={cx("flex items-center", props.class)} {...rest}>
          <For each={links}>
            {(link) => (
              <Link
                to={link.href}
                class={cx(
                  "text-muted-foreground hover:text-primary flex h-7 shrink-0 items-center justify-center px-4 text-center text-sm font-medium transition-colors",
                )}
                activeProps={{
                  class: "text-primary",
                }}
              >
                {link.name}
              </Link>
            )}
          </For>
        </div>
      </div>
    </div>
  )
}

export default ChartNav

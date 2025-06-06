import { For } from "solid-js"
import { Link, useLocation } from "@tanstack/solid-router"

import { cx } from "@repo/tailwindcss/utils/cva"

import { docsConfig } from "@/config/docs"
import { siteConfig } from "@/config/site"

import Logo from "./logo"

const Navbar = () => {
  const location = useLocation()

  return (
    <div class="mr-4 hidden md:flex">
      <Link to="/" class="mr-6 flex items-center space-x-2">
        <Logo class="h-6 w-6" />
        <span class="hidden font-bold sm:inline-block">{siteConfig.title}</span>
      </Link>
      <nav class="flex items-center space-x-6 text-sm font-medium">
        <For each={docsConfig.mainNav}>
          {(item) => (
            <Link
              to={item.href}
              class={cx(
                "hover:text-foreground/80 transition-colors",
                location().pathname === item.href ||
                  (item.href === "/docs/components/accordion" &&
                    location().pathname.startsWith("/docs/components")) ||
                  (item.href === "/examples/cards" &&
                    location().pathname.startsWith("/examples"))
                  ? "text-foreground"
                  : "opacity-60",
              )}
            >
              {item.title}
            </Link>
          )}
        </For>
      </nav>
    </div>
  )
}

export default Navbar

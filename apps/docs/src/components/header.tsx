import { splitProps } from "solid-js"
import { Link } from "@tanstack/solid-router"

import { docsConfig } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { cx } from "@/registry/lib/cva"
import { Button } from "@/registry/ui/button"
import { Separator } from "@/registry/ui/separator"

import CommandMenu from "./command-menu"
import Logo from "./logo"
import MainNav from "./main-nav"
import ModeToggle from "./mode-toggle"
import NavbarMobile from "./navbar-mobile"

interface Props {
  starCount?: number
}

const Header = (props: Props) => {
  return (
    <header class="bg-background sticky top-0 z-50 w-full">
      <div class="container-wrapper px-6">
        <div class="flex h-(--header-height) items-center gap-2 **:data-[slot=separator]:h-4!">
          <NavbarMobile />
          <Button<typeof Link>
            variant="ghost"
            size="icon"
            as={(buttonProps) => {
              const [local, rest] = splitProps(buttonProps, ["class"])

              return (
                <Link
                  {...rest}
                  to="/"
                  class={cx(local.class, "hidden size-8 lg:flex")}
                >
                  <Logo class="size-5" />
                  <span class="sr-only">{siteConfig.title}</span>
                </Link>
              )
            }}
          />
          <MainNav items={docsConfig.mainNav} class="hidden lg:flex" />
          <div class="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <div class="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
              <CommandMenu />
            </div>
            <Separator orientation="vertical" class="ml-2 hidden lg:block" />
            <Button<typeof Link>
              size="sm"
              variant="ghost"
              as={(buttonProps) => {
                const [, rest] = splitProps(buttonProps, ["class"])

                return (
                  <Link
                    to={siteConfig.links.github}
                    target="_blank"
                    rel="noreferrer"
                    class={cx(buttonProps.class, "h-8 shadow-none")}
                    {...rest}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 15 15"
                      class="size-4"
                    >
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M7.5.25a7.25 7.25 0 0 0-2.292 14.13c.363.066.495-.158.495-.35c0-.172-.006-.628-.01-1.233c-2.016.438-2.442-.972-2.442-.972c-.33-.838-.805-1.06-.805-1.06c-.658-.45.05-.441.05-.441c.728.051 1.11.747 1.11.747c.647 1.108 1.697.788 2.11.602c.066-.468.254-.788.46-.969c-1.61-.183-3.302-.805-3.302-3.583a2.8 2.8 0 0 1 .747-1.945c-.075-.184-.324-.92.07-1.92c0 0 .61-.194 1.994.744A7 7 0 0 1 7.5 3.756A7 7 0 0 1 9.315 4c1.384-.938 1.992-.743 1.992-.743c.396.998.147 1.735.072 1.919c.465.507.745 1.153.745 1.945c0 2.785-1.695 3.398-3.31 3.577c.26.224.492.667.492 1.343c0 .97-.009 1.751-.009 1.989c0 .194.131.42.499.349A7.25 7.25 0 0 0 7.499.25"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-muted-foreground w-fit text-xs tabular-nums">
                      {props.starCount}
                    </span>
                  </Link>
                )
              }}
            />
            <Separator orientation="vertical" />
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

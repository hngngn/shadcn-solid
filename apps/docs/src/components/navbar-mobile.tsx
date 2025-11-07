import type { ComponentProps } from "solid-js"
import { For, createSignal, splitProps } from "solid-js"
import { Link } from "@tanstack/solid-router"

import { docsConfig } from "@/config/docs"
import { cx } from "@/registry/lib/cva"
import { Button } from "@/registry/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

const MobileLink = (
  props: ComponentProps<typeof Link> & {
    onOpenChange?: (open: boolean) => void
  },
) => {
  const [local, rest] = splitProps(props, ["class", "onOpenChange"])

  return (
    <Link
      onClick={() => {
        local.onOpenChange?.(false)
      }}
      class={cx("text-2xl font-medium", local.class)}
      {...rest}
    />
  )
}

const NavbarMobile = () => {
  const [open, setOpen] = createSignal(false)

  return (
    <Popover
      open={open()}
      onOpenChange={setOpen}
      placement="bottom-start"
      gutter={14}
      overflowPadding={0}
    >
      <PopoverTrigger<typeof Button>
        as={(props) => (
          <Button
            variant="ghost"
            class="extend-touch-target flex h-8 touch-manipulation items-center justify-start gap-2.5 p-0! hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent lg:hidden dark:hover:bg-transparent"
            {...props}
          >
            <div class="relative flex h-8 w-4 items-center justify-center">
              <div class="relative size-4">
                <span
                  class={cx(
                    "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                    open() ? "top-[0.4rem] -rotate-45" : "top-1",
                  )}
                />
                <span
                  class={cx(
                    "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                    open() ? "top-[0.4rem] rotate-45" : "top-2.5",
                  )}
                />
              </div>
              <span class="sr-only">Toggle Menu</span>
            </div>
            <span class="flex h-8 items-center text-lg leading-none font-medium">
              Menu
            </span>
          </Button>
        )}
      />
      <PopoverContent class="bg-background/90 no-scrollbar h-(--kb-popper-content-available-height) w-(--kb-popper-content-available-width) overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur duration-100">
        <div class="flex flex-col gap-12 overflow-auto p-6">
          <div class="flex flex-col gap-4">
            <div class="text-muted-foreground text-sm font-medium">Menu</div>
            <div class="flex flex-col gap-3">
              <MobileLink to="/" onOpenChange={setOpen}>
                Home
              </MobileLink>
              <For each={docsConfig.mainNav}>
                {(item) => (
                  <MobileLink to={item.href} onOpenChange={setOpen}>
                    {item.title}
                  </MobileLink>
                )}
              </For>
            </div>
          </div>
          <div class="flex flex-col gap-8">
            <For each={docsConfig.sidebarNav}>
              {(item) => (
                <div class="flex flex-col gap-4">
                  <div class="text-muted-foreground text-sm font-medium">
                    {item.title}
                  </div>
                  <div class="flex flex-col gap-3">
                    <For each={item.items}>
                      {(item) => (
                        <MobileLink href={item.href} onOpenChange={setOpen}>
                          {item.title}
                        </MobileLink>
                      )}
                    </For>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default NavbarMobile

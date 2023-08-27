import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { Button } from "@/registry/default/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/registry/default/ui/sheet";
import { As, createDisclosureState } from "@kobalte/core";
import { TbLayoutSidebar } from "solid-icons/tb";
import { For, createComputed } from "solid-js";
import { A, useIsRouting } from "solid-start";
import { Logo } from "./logo";
import { Sidebar } from "./sidebar";

export const MobileNav = () => {
  const { isOpen, setIsOpen, close } = createDisclosureState();

  const isRouting = useIsRouting();

  createComputed(() => isRouting() && close());

  return (
    <Sheet open={isOpen()} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <As
          component={Button}
          variant="ghost"
          size="icon"
          class="mr-1 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <TbLayoutSidebar class="w-[18px] h-[18px]" />
          <span class="sr-only">Toggle Menu</span>
        </As>
      </SheetTrigger>
      <SheetContent side="left" class="pr-0">
        <A href="/" class="flex items-center">
          <Logo class="mr-2 h-4 w-4" />
          <span class="font-bold">{siteConfig.title}</span>
        </A>
        <div class="my-4 h-[calc(100vh-8rem)] pb-10 pl-6 overflow-y-auto">
          <div class="flex flex-col space-y-3">
            <div class="text-sm flex flex-col">
              <For each={docsConfig.mainNav}>
                {(item) => (
                  <A
                    href={item.href!}
                    class="transition-colors hover:text-foreground/80 px-2 py-1 text-foreground"
                  >
                    {item.title}
                  </A>
                )}
              </For>
            </div>
            <Sidebar />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

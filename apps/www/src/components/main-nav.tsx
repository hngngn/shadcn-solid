import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { For } from "solid-js";
import { A } from "solid-start";
import { Logo } from "./logo";

export const MainNav = () => {
  return (
    <div class="mr-4 hidden md:flex">
      <A href="/" class="mr-6 flex items-center space-x-2">
        <Logo class="h-6 w-6" />
        <span class="hidden font-bold sm:inline-block">{siteConfig.title}</span>
      </A>
      <nav class="flex items-center space-x-6 text-sm font-medium">
        <For each={docsConfig.mainNav}>
          {(item) => (
            <A
              href={item.href!}
              class="transition-colors hover:text-foreground/80 "
              activeClass="text-foreground"
              inactiveClass="opacity-60"
            >
              {item.title}
            </A>
          )}
        </For>
      </nav>
    </div>
  );
};

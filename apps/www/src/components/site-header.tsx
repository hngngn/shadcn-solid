import { siteConfig } from "@/config/site";
import ModeToggle from "@/registry/default/example/mode-toggle";
import { Button } from "@/registry/default/ui/button";
import { As } from "@kobalte/core";
import { TbBrandGithub } from "solid-icons/tb";
import { A } from "solid-start";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";

const SiteHeader = () => {
  return (
    <header class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div class="container flex h-14 items-center">
        <MainNav />
        <MobileNav />
        <div class="flex flex-1 items-center justify-end space-x-2">
          <nav class="flex items-center space-x-1">
            <Button asChild variant="ghost" size="icon">
              <As
                component={A}
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <TbBrandGithub class="w-[18px] h-[18px]" />
                <span class="sr-only">Github</span>
              </As>
            </Button>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;

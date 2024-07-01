import { siteConfig } from "@/config/site";
import ModeToggle from "@/registry/tailwindcss/example/mode-toggle";
import { Button } from "@/registry/tailwindcss/ui/button";
import { A } from "@solidjs/router";
import CommandMenu from "./command-menu";
import { MobileNavbar } from "./mobile-navbar";
import { Navbar } from "./navbar";

export const Header = () => {
  return (
    <header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container flex h-14 max-w-screen-2xl items-center">
        <Navbar />
        <MobileNavbar />
        <div class="flex flex-1 items-center justify-end space-x-2">
          <div class="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <div class="flex items-center">
            <Button
              as={A}
              variant="ghost"
              size="icon"
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2c2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2a4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6c-.6.6-.6 1.2-.5 2V21"
                />
              </svg>
              <span class="sr-only">Github</span>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

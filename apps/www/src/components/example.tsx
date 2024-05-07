import { cn } from "@/libs/cn";
import { A, useLocation } from "@solidjs/router";
import { Index } from "solid-js";

const examples = [
  {
    name: "Mail",
    href: "/examples/mail"
  },
  {
    name: "Cards",
    href: "/examples/cards"
  },
  {
    name: "Authentication",
    href: "/examples/authentication"
  }
];

export const Example = () => {
  const location = useLocation();

  return (
    <div class="relative">
      <div class="mb-4 flex items-center justify-center">
        <Index each={examples}>
          {(example, index) => (
            <A
              href={example().href}
              class={cn(
                "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm font-medium transition-colors hover:text-primary",
                location.pathname.startsWith(example().href) ||
                  (index === 0 && location.pathname === "/")
                  ? "bg-muted text-primary"
                  : "text-muted-foreground"
              )}
            >
              {example().name}
            </A>
          )}
        </Index>
      </div>
    </div>
  );
};

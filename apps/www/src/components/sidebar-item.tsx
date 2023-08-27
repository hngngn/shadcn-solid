import { TSidebarNavItem } from "@/config/docs";
import { cn } from "@/lib/cn";
import type { Component } from "solid-js";
import { For, Match, Switch } from "solid-js";
import { A, useLocation } from "solid-start";

type Props = {
  items: TSidebarNavItem[];
};

export const SidebarItem: Component<Props> = (props) => {
  const location = useLocation();

  return (
    <div class="grid grid-flow-row auto-rows-max text-sm">
      <For each={props.items}>
        {(item) => (
          <Switch
            fallback={
              <span class="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline">
                {item.title}
              </span>
            }
          >
            <Match when={item.href}>
              <A
                href={item.href!}
                class={cn(
                  "flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
                  item.disabled && "cursor-not-allowed opacity-60",
                  location.pathname === item.href
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                )}
                target={item.external ? "_blank" : ""}
                rel={item.external ? "noreferrer" : ""}
              >
                {item.title}
                {item.label ? (
                  <span
                    class={cn(
                      "ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline",
                      item.label === "Soon" && "bg-muted text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </span>
                ) : null}
              </A>
            </Match>
          </Switch>
        )}
      </For>
    </div>
  );
};

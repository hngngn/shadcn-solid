import type { TNavItem, TNavItemWithChildren } from "@/config/docs";
import { docsConfig } from "@/config/docs";
import { Button } from "@/registry/tailwindcss/ui/button";
import { As } from "@kobalte/core";
import { A } from "@solidjs/router";
import type { VoidComponent } from "solid-js";
import { Show } from "solid-js";

export const Pager: VoidComponent<{
  slug: string;
}> = props => {
  const getPagerForDoc = (slug: string) => {
    const flattenedLinks = [null, ...flatten(docsConfig.sidebarNav), null];
    let activeIndex: number;
    if (!slug) {
      activeIndex = 1;
    } else {
      activeIndex = flattenedLinks.findIndex(link => `${slug}` === link?.href);
    }

    const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null;
    const next = activeIndex !== flattenedLinks.length - 1 ? flattenedLinks[activeIndex + 1] : null;
    return {
      prev,
      next
    };
  };

  const flatten = (links: TNavItemWithChildren[]): TNavItem[] => {
    return links
      .reduce<TNavItem[]>((flat, link) => {
        return flat.concat(link.items?.length ? flatten(link.items) : link);
      }, [])
      .filter(link => !link?.disabled);
  };

  const pager = () => getPagerForDoc(props.slug);

  return (
    <div class="flex flex-row items-center justify-between">
      <Show when={pager()?.prev?.href}>
        <Button asChild variant="outline">
          <As component={A} href={pager().prev?.href!}>
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m15 6l-6 6l6 6"
              />
            </svg>
            {pager().prev?.title}
          </As>
        </Button>
      </Show>
      <Show when={pager()?.next?.href}>
        <Button asChild variant="outline" class="ml-auto">
          <As component={A} href={pager().next?.href!}>
            {pager().next?.title}
            <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m9 6l6 6l-6 6"
              />
            </svg>
          </As>
        </Button>
      </Show>
    </div>
  );
};

import { cn } from "@/lib/cn";
import { A, useLocation } from "@solidjs/router";
import type { Accessor, VoidComponent } from "solid-js";
import { For, createEffect, createSignal, onCleanup } from "solid-js";

type TableOfContent = {
  depth: number;
  text: string;
  slug: string;
};

const getHeadingsFromToc = (tableOfContents: TableOfContent[]) => {
  return tableOfContents.map(({ slug }) => {
    const el = document.getElementById(slug);

    if (!el) {
      return;
    }

    const style = window.getComputedStyle(el);
    const scrollMt = parseFloat(style.scrollMarginTop) * 2;

    const top = window.scrollY + el.getBoundingClientRect().top - scrollMt;

    return { slug, top };
  });
};

const useCurrentSection = (tableOfContents: Accessor<TableOfContent[] | undefined>) => {
  const [currentSection, setCurrentSection] = createSignal(tableOfContents()?.[0]?.slug);

  createEffect(() => {
    const toc = tableOfContents();

    if (toc == null || toc.length === 0) {
      return;
    }

    const headings = getHeadingsFromToc(toc);

    const onScroll = () => {
      const top = window.scrollY;
      let current = headings[0]?.slug;

      for (const heading of headings) {
        if (heading == null) {
          continue;
        }

        if (top >= heading.top) {
          current = heading.slug;
        } else {
          break;
        }
      }

      setCurrentSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    onScroll();

    onCleanup(() => {
      window.removeEventListener("scroll", onScroll);
    });
  });

  return currentSection;
};

type Props = {
  data: TableOfContent[] | undefined;
};

export const TableOfContents: VoidComponent<Props> = props => {
  const location = useLocation();

  const currentSection = useCurrentSection(() => props.data);

  return (
    <aside class="space-y-2">
      <p class="font-medium">On This Page</p>
      <ul class="m-0 list-none">
        <For each={props.data}>
          {h => (
            <li class={cn("mt-0 pt-2", h.depth === 3 && "pl-4")}>
              <A
                href={`${location.pathname}#${h.slug}`}
                class={cn(
                  "inline-block no-underline transition-colors hover:text-foreground",
                  h.slug === currentSection()
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {h.text}
              </A>
            </li>
          )}
        </For>
      </ul>
    </aside>
  );
};

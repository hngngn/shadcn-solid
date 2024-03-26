import { Separator } from "@/registry/default/ui/separator";
import { A } from "@solidjs/router";

export const Announcement = () => {
  return (
    <A
      href="/docs/changelog"
      class="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
    >
      ✨<Separator class="mx-2 data-[orientation=vertical]:h-4" orientation="vertical" />
      <span class="sm:hidden">New components and more.</span>
      <span class="hidden sm:inline">New components, Drawer and Splitter.</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-4 w-4" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 12h14m-4 4l4-4m-4-4l4 4"
        />
      </svg>
    </A>
  );
};

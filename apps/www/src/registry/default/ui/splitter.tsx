import type { SplitterResizeTriggerProps } from "@ark-ui/solid";
import { Splitter as SplitterPrimitive } from "@ark-ui/solid";
import type { VoidProps } from "solid-js";
import { Show, splitProps } from "solid-js";
import { cn } from "@/lib/cn";

export const Splitter = SplitterPrimitive.Root;
export const SplitterPanel = SplitterPrimitive.Panel;

export const SplitterResizeTrigger = (
  props: VoidProps<SplitterResizeTriggerProps & { withHandle?: boolean }>
) => {
  const [local, rest] = splitProps(props, ["class", "withHandle"]);

  return (
    <SplitterPrimitive.ResizeTrigger
      class={cn(
        "flex w-px items-center justify-center bg-border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full",
        local.class
      )}
      {...rest}
    >
      <Show when={local.withHandle}>
        <div class="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5" viewBox="0 0 15 15">
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M5.5 4.625a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25m4 0a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25M10.625 7.5a1.125 1.125 0 1 1-2.25 0a1.125 1.125 0 0 1 2.25 0M5.5 8.625a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25m5.125 2.875a1.125 1.125 0 1 1-2.25 0a1.125 1.125 0 0 1 2.25 0M5.5 12.625a1.125 1.125 0 1 0 0-2.25a1.125 1.125 0 0 0 0 2.25"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </Show>
    </SplitterPrimitive.ResizeTrigger>
  );
};

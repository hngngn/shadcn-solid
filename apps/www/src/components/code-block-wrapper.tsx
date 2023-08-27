import { cn } from "@/lib/cn";
import { Button } from "@/registry/default/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";
import { As } from "@kobalte/core";
import type { ParentComponent } from "solid-js";
import { createSignal, mergeProps } from "solid-js";

export const CodeBlockWrapper: ParentComponent<{
  expandButtonTitle?: string;
}> = (props) => {
  const merge = mergeProps({ expandButtonTitle: "View Code" }, props);

  const [isOpened, setIsOpened] = createSignal(false);

  return (
    <Collapsible open={isOpened()} onOpenChange={setIsOpened} forceMount>
      <div class={cn("relative overflow-hidden my-6 rounded-md")}>
        <CollapsibleContent
          class={cn("overflow-hidden", !isOpened() && "max-h-32")}
        >
          <div
            class={cn(
              "[&_pre]:my-0 [&_pre]:max-h-[650px] [&_pre]:pb-[100px]",
              !isOpened() ? "[&_pre]:overflow-hidden" : "[&_pre]:overflow-auto]"
            )}
          >
            {merge.children}
          </div>
        </CollapsibleContent>
        <div
          class={cn(
            "absolute flex items-center justify-center bg-gradient-to-b from-zinc-700/30 to-zinc-950/90 p-2",
            isOpened() ? "inset-x-0 bottom-0 h-36 from-zinc-700/0" : "inset-0"
          )}
        >
          <CollapsibleTrigger asChild>
            <As component={Button} variant="secondary" class="h-8 text-xs">
              {isOpened() ? "Collapse" : merge.expandButtonTitle}
            </As>
          </CollapsibleTrigger>
        </div>
      </div>
    </Collapsible>
  );
};

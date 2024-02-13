import { cn } from "@/lib/cn";
import { Progress as ProgressPrimitive } from "@kobalte/core";
import { splitProps, type ParentComponent } from "solid-js";

export const ProgressLabel = ProgressPrimitive.Label;
export const ProgressValueLabel = ProgressPrimitive.ValueLabel;

export const Progress: ParentComponent<ProgressPrimitive.ProgressRootProps> = props => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <ProgressPrimitive.Root class={cn("flex w-full flex-col gap-2", local.class)} {...rest}>
      {local.children}
      <ProgressPrimitive.Track class="h-2 overflow-hidden rounded-full bg-primary/20">
        <ProgressPrimitive.Fill class="h-full w-[--kb-progress-fill-width] bg-primary transition-all duration-500 ease-linear data-[progress=complete]:bg-primary" />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
};

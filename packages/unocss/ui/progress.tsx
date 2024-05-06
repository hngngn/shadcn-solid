import { cn } from "@/libs/cn";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import * as ProgressPrimitive from "@kobalte/core/progress";
import { type ParentProps, type ValidComponent, splitProps } from "solid-js";

export const ProgressLabel = ProgressPrimitive.Label;
export const ProgressValueLabel = ProgressPrimitive.ValueLabel;

type ProgressProps = ParentProps<
  ProgressPrimitive.ProgressRootProps & {
    class?: string;
  }
>;

export const Progress = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ProgressProps>
) => {
  const [local, rest] = splitProps(props as ProgressProps, ["class", "children"]);

  return (
    <ProgressPrimitive.Root class={cn("flex w-full flex-col gap-2", local.class)} {...rest}>
      {local.children}
      <ProgressPrimitive.Track class="h-2 overflow-hidden rounded-full bg-primary/20">
        <ProgressPrimitive.Fill class="h-full w-[--kb-progress-fill-width] bg-primary transition-all duration-500 ease-linear data-[progress=complete]:bg-primary" />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
};

import { cn } from "@/libs/cn";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import * as SeparatorPrimitive from "@kobalte/core/separator";
import type { ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

type SeparatorProps = SeparatorPrimitive.SeparatorRootProps & {
  class?: string;
};

export const Separator = <T extends ValidComponent = "hr">(
  props: PolymorphicProps<T, SeparatorProps>
) => {
  const [local, rest] = splitProps(props as SeparatorProps, ["class"]);

  return (
    <SeparatorPrimitive.Root
      class={cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-[1px] data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[1px]",
        local.class
      )}
      {...rest}
    />
  );
};

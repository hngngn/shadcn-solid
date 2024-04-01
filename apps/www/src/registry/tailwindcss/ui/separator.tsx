import { cn } from "@/libs/cn";
import { Separator as SeparatorPrimitive } from "@kobalte/core";
import type { VoidProps } from "solid-js";
import { splitProps } from "solid-js";

export const Separator = (props: VoidProps<SeparatorPrimitive.SeparatorRootProps>) => {
  const [local, rest] = splitProps(props, ["class"]);

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

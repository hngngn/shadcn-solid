import { cn } from "@/libs/cn";
import { TextField as TextFieldPrimitive } from "@kobalte/core";
import type { VoidProps } from "solid-js";
import { splitProps } from "solid-js";

export const TextFieldTextArea = (props: VoidProps<TextFieldPrimitive.TextFieldTextAreaProps>) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <TextFieldPrimitive.TextArea
      class={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        local.class
      )}
      {...rest}
    />
  );
};

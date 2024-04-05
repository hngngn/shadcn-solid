import { cn } from "@/libs/cn";
import { TextField as TextFieldPrimitive } from "@kobalte/core";
import type { VoidProps } from "solid-js";
import { splitProps } from "solid-js";

export const TextFieldTextArea = (props: VoidProps<TextFieldPrimitive.TextFieldTextAreaProps>) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <TextFieldPrimitive.TextArea
      class={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-inherit px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:(outline-none ring-1.5 ring-ring) disabled:(cursor-not-allowed opacity-50) transition-shadow",
        local.class
      )}
      {...rest}
    />
  );
};

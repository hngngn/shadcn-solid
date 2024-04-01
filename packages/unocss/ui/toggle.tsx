import { cn } from "@/libs/cn";
import { ToggleButton as ToggleButtonPrimitive } from "@kobalte/core";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { splitProps } from "solid-js";

export const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:(bg-muted text-muted-foreground) focus-visible:(outline-none ring-1 ring-ring) disabled:(pointer-events-none opacity-50) data-[pressed]:(bg-accent text-accent-foreground)",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-sm hover:(bg-accent text-accent-foreground)"
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2",
        lg: "h-10 px-3"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export const ToggleButton = (
  props: ToggleButtonPrimitive.ToggleButtonRootProps & VariantProps<typeof toggleVariants>
) => {
  const [local, rest] = splitProps(props, ["class", "variant", "size"]);

  return (
    <ToggleButtonPrimitive.Root
      class={cn(toggleVariants({ variant: local.variant, size: local.size }), local.class)}
      {...rest}
    />
  );
};

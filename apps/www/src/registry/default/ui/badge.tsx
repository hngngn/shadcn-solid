import { cn } from "@/lib/cn";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ParentComponent } from "solid-js";
import { splitProps, type ComponentProps } from "solid-js";

export const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export const Badge: ParentComponent<
  ComponentProps<"div"> & VariantProps<typeof badgeVariants>
> = props => {
  const [local, rest] = splitProps(props, ["class", "variant"]);

  return (
    <div
      class={cn(
        badgeVariants({
          variant: local.variant
        }),
        local.class
      )}
      {...rest}
    />
  );
};

import { cn } from "@/libs/cn";
import * as AlertPrimitive from "@kobalte/core/alert";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ComponentProps, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

export const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&:has(svg)]:pl-11 [&>svg+div]:translate-y-[-3px] [&>svg]:(absolute left-4 top-4 text-foreground)",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

type AlertProps = AlertPrimitive.AlertRootProps &
  VariantProps<typeof alertVariants> & {
    class?: string;
  };

export const Alert = <T extends ValidComponent = "div">(props: PolymorphicProps<T, AlertProps>) => {
  const [local, rest] = splitProps(props as AlertProps, ["class", "variant"]);

  return (
    <AlertPrimitive.Root
      class={cn(
        alertVariants({
          variant: props.variant
        }),
        local.class
      )}
      {...rest}
    />
  );
};

export const AlertTitle = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"]);

  return <div class={cn("font-medium leading-5 tracking-tight", local.class)} {...rest} />;
};

export const AlertDescription = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"]);

  return <div class={cn("text-sm [&_p]:leading-relaxed", local.class)} {...rest} />;
};

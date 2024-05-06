import { cn } from "@/libs/cn";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import * as ToastPrimitive from "@kobalte/core/toast";
import { mergeDefaultProps } from "@kobalte/utils";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ComponentProps, ValidComponent, VoidComponent, VoidProps } from "solid-js";
import { splitProps } from "solid-js";
import { Portal } from "solid-js/web";

export const toastVariants = cva(
  "group pointer-events-auto relative flex flex-col gap-3 w-full items-center justify-between overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-y-0 data-[swipe=end]:(translate-y-[var(--kb-toast-swipe-end-y)] animate-out) data-[swipe=move]:(translate-y-[--kb-toast-swipe-move-y transition-none) data-[opened]:(animate-in slide-in-from-top-full sm:slide-in-from-bottom-full) data-[closed]:(animate-out fade-out-80 slide-out-to-top-full sm:slide-out-to-bottom-full)",
  {
    variants: {
      variant: {
        default: "border bg-background",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

type ToastProps = ToastPrimitive.ToastRootProps &
  VariantProps<typeof toastVariants> & {
    class?: string;
  };

export const Toast = <T extends ValidComponent = "li">(props: PolymorphicProps<T, ToastProps>) => {
  const [local, rest] = splitProps(props as ToastProps, ["class", "variant"]);

  return (
    <ToastPrimitive.Root
      class={cn(toastVariants({ variant: local.variant }), local.class)}
      {...rest}
    />
  );
};

type ToastTitleProps = ToastPrimitive.ToastTitleProps & {
  class?: string;
};

export const ToastTitle = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ToastTitleProps>
) => {
  const [local, rest] = splitProps(props as ToastTitleProps, ["class"]);

  return (
    <ToastPrimitive.Title
      class={cn("text-sm font-semibold [&+div]:text-xs", local.class)}
      {...rest}
    />
  );
};

type ToastDescriptionProps = ToastPrimitive.ToastDescriptionProps & {
  class?: string;
};

export const ToastDescription = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ToastDescriptionProps>
) => {
  const [local, rest] = splitProps(props as ToastDescriptionProps, ["class"]);

  return <ToastPrimitive.Description class={cn("text-sm opacity-90", local.class)} {...rest} />;
};

type ToastRegionProps = ToastPrimitive.ToastRegionProps & {
  class?: string;
};

export const ToastRegion = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, ToastRegionProps>
) => {
  const merge = mergeDefaultProps(
    {
      swipeDirection: "down"
    },
    props as ToastRegionProps
  );

  return (
    <Portal>
      <ToastPrimitive.Region {...merge} />
    </Portal>
  );
};

type ToastListProps = VoidProps<
  ToastPrimitive.ToastListProps & {
    class?: string;
  }
>;

export const ToastList = <T extends ValidComponent = "ol">(
  props: PolymorphicProps<T, ToastListProps>
) => {
  const [local, rest] = splitProps(props as ToastListProps, ["class"]);

  return (
    <ToastPrimitive.List
      class={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:(bottom-0 right-0 top-auto flex-col) md:max-w-[420px]",
        local.class
      )}
      {...rest}
    />
  );
};

export const ToastContent = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <div class={cn("flex w-full flex-col", local.class)} {...rest}>
      <div>{local.children}</div>
      <ToastPrimitive.CloseButton class="absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:(opacity-100 outline-none) group-hover:opacity-100 group-[.destructive]:(text-red-300 hover:text-red-50) bg-inherit">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M18 6L6 18M6 6l12 12"
          />
        </svg>
      </ToastPrimitive.CloseButton>
    </div>
  );
};

export const ToastProgress: VoidComponent = () => {
  return (
    <ToastPrimitive.ProgressTrack class="h-1 w-full overflow-hidden rounded-xl bg-primary/20 group-[.destructive]:bg-background/20">
      <ToastPrimitive.ProgressFill class="h-full w-[--kb-toast-progress-fill-width] bg-primary transition-all duration-150 ease-linear group-[.destructive]:bg-destructive-foreground" />
    </ToastPrimitive.ProgressTrack>
  );
};

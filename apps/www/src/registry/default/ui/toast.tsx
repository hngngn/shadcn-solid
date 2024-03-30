import { cn } from "@/lib/cn";
import { Toast as ToastPrimitive } from "@kobalte/core";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ComponentProps, VoidComponent, VoidProps } from "solid-js";
import { mergeProps, splitProps } from "solid-js";
import { Portal } from "solid-js/web";

export const toastVariants = cva(
  "group pointer-events-auto relative flex flex-col gap-3 w-full items-center justify-between overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-y-0 data-[swipe=end]:translate-y-[var(--kb-toast-swipe-end-y)] data-[swipe=move]:translate-y-[--kb-toast-swipe-move-y] data-[swipe=move]:transition-none data-[opened]:animate-in data-[closed]:animate-out data-[swipe=end]:animate-out data-[closed]:fade-out-80 data-[closed]:slide-out-to-top-full data-[closed]:sm:slide-out-to-bottom-full data-[opened]:slide-in-from-top-full data-[opened]:sm:slide-in-from-bottom-full",
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

export const Toast = (
  props: ToastPrimitive.ToastRootProps & VariantProps<typeof toastVariants>
) => {
  const [local, rest] = splitProps(props, ["class", "variant"]);

  return (
    <ToastPrimitive.Root
      class={cn(toastVariants({ variant: local.variant }), local.class)}
      {...rest}
    />
  );
};

export const ToastTitle = (props: ToastPrimitive.ToastTitleProps) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ToastPrimitive.Title
      class={cn("text-sm font-semibold [&+div]:text-xs", local.class)}
      {...rest}
    />
  );
};

export const ToastDescription = (props: ToastPrimitive.ToastDescriptionProps) => {
  const [local, rest] = splitProps(props, ["class"]);

  return <ToastPrimitive.Description class={cn("text-sm opacity-90", local.class)} {...rest} />;
};

export const ToastRegion = (props: ToastPrimitive.ToastRegionProps) => {
  const merge = mergeProps<ToastPrimitive.ToastRegionProps[]>(
    {
      swipeDirection: "down"
    },
    props
  );

  return (
    <Portal>
      <ToastPrimitive.Region {...merge} />
    </Portal>
  );
};

export const ToastList = (props: VoidProps<ToastPrimitive.ToastListProps>) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ToastPrimitive.List
      class={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
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
      <ToastPrimitive.CloseButton class="absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50">
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

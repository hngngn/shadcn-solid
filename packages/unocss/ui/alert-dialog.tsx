import { cn } from "@/libs/cn";
import { AlertDialog as AlertDialogPrimitive } from "@kobalte/core";
import type { ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { buttonVariants } from "./button";

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

export const AlertDialogContent = (props: AlertDialogPrimitive.AlertDialogContentProps) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay
        class={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[expanded]:(animate-in fade-in-0) data-[closed]:(animate-out fade-out-0)",
          local.class
        )}
      />
      <div class="fixed inset-0 z-50 flex items-center justify-center">
        <AlertDialogPrimitive.Content
          class={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[expanded]:(animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-48%) data-[closed]:(animate-out fade-out-0 zoom-out-95 slide-out-to-left-1/2 slide-out-to-top-48%) sm:rounded-lg md:w-full",
            local.class
          )}
          {...rest}
        />
      </div>
    </AlertDialogPrimitive.Portal>
  );
};

export const AlertDialogHeader = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div class={cn("flex flex-col space-y-2 text-center sm:text-left", local.class)} {...rest} />
  );
};

export const AlertDialogFooter = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      class={cn("flex flex-col-reverse sm:(flex-row justify-end space-x-2)", local.class)}
      {...rest}
    />
  );
};

export const AlertDialogTitle = (props: AlertDialogPrimitive.AlertDialogTitleProps) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <AlertDialogPrimitive.Title class={cn("text-lg font-semibold", local.class)} {...rest} />;
};

export const AlertDialogDescription = (props: AlertDialogPrimitive.AlertDialogDescriptionProps) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <AlertDialogPrimitive.Description
      class={cn("text-sm text-muted-foreground", local.class)}
      {...rest}
    />
  );
};

export const AlertDialogClose = (props: AlertDialogPrimitive.AlertDialogCloseButtonProps) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <AlertDialogPrimitive.CloseButton
      class={cn(
        buttonVariants({
          variant: "outline"
        }),
        "mt-2 md:mt-0",
        local.class
      )}
      {...rest}
    />
  );
};

export const AlertDialogAction = (props: AlertDialogPrimitive.AlertDialogCloseButtonProps) => {
  const [local, rest] = splitProps(props, ["class"]);
  return <AlertDialogPrimitive.CloseButton class={cn(buttonVariants(), local.class)} {...rest} />;
};

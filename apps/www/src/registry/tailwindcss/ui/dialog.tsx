import { cn } from "@/libs/cn";
import { Dialog as DialogPrimitive } from "@kobalte/core";
import type { ComponentProps } from "solid-js";
import { splitProps } from "solid-js";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogOverlay = (props: DialogPrimitive.DialogOverlayProps) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <DialogPrimitive.Overlay
      class={cn(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0",
        local.class
      )}
      {...rest}
    />
  );
};

export const DialogContent = (props: DialogPrimitive.DialogContentProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <div class="fixed inset-0 z-50 flex items-center justify-center">
        <DialogPrimitive.Content
          class={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95 data-[closed]:slide-out-to-left-1/2 data-[closed]:slide-out-to-top-[48%] data-[expanded]:slide-in-from-left-1/2 data-[expanded]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
            local.class
          )}
          {...rest}
        >
          {local.children}
          <DialogPrimitive.CloseButton class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 6L6 18M6 6l12 12"
              />
            </svg>
            <span class="sr-only">Close</span>
          </DialogPrimitive.CloseButton>
        </DialogPrimitive.Content>
      </div>
    </DialogPrimitive.Portal>
  );
};

export const DialogTitle = (props: DialogPrimitive.DialogTitleProps) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <DialogPrimitive.Title
      class={cn("text-lg font-semibold text-foreground", local.class)}
      {...rest}
    />
  );
};

export const DialogDescription = (props: DialogPrimitive.DialogDescriptionProps) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <DialogPrimitive.Description
      class={cn("text-sm text-muted-foreground", local.class)}
      {...rest}
    />
  );
};

export const DialogHeader = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div class={cn("flex flex-col space-y-2 text-center sm:text-left", local.class)} {...rest} />
  );
};

export const DialogFooter = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"]);
  return (
    <div
      class={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", local.class)}
      {...rest}
    />
  );
};

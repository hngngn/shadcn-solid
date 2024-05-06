import { cn } from "@/libs/cn";
import * as DialogPrimitive from "@kobalte/core/dialog";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ComponentProps, ParentProps, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

type DialogOverlayProps = DialogPrimitive.DialogOverlayProps & {
  class?: string;
};

export const DialogOverlay = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DialogOverlayProps>
) => {
  const [local, rest] = splitProps(props as DialogOverlayProps, ["class"]);

  return (
    <DialogPrimitive.Overlay
      class={cn(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[expanded]:(animate-in fade-in-0) data-[closed]:(animate-out fade-out-0)",
        local.class
      )}
      {...rest}
    />
  );
};

type DialogContentProps = ParentProps<
  DialogPrimitive.DialogOverlayProps & {
    class?: string;
  }
>;

export const DialogContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DialogContentProps>
) => {
  const [local, rest] = splitProps(props as DialogContentProps, ["class", "children"]);

  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <div class="fixed inset-0 z-50 flex items-center justify-center">
        <DialogPrimitive.Content
          class={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[expanded]:(animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-48%) data-[closed]:(animate-out fade-out-0 zoom-out-95 slide-out-to-left-1/2 slide-out-to-top-48%) md:w-full sm:rounded-lg",
            local.class
          )}
          {...rest}
        >
          {local.children}
          <DialogPrimitive.CloseButton class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:(outline-none ring-1.5 ring-ring ring-offset-2) disabled:pointer-events-none bg-inherit transition-property-[opacity,box-shadow]">
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

type DialogTitleProps = DialogPrimitive.DialogTitleProps & {
  class?: string;
};

export const DialogTitle = <T extends ValidComponent = "h2">(
  props: PolymorphicProps<T, DialogTitleProps>
) => {
  const [local, rest] = splitProps(props as DialogTitleProps, ["class"]);

  return (
    <DialogPrimitive.Title
      class={cn("text-lg font-semibold text-foreground", local.class)}
      {...rest}
    />
  );
};

type DialogDescriptionProps = DialogPrimitive.DialogDescriptionProps & {
  class?: string;
};

export const DialogDescription = <T extends ValidComponent = "p">(
  props: PolymorphicProps<T, DialogDescriptionProps>
) => {
  const [local, rest] = splitProps(props as DialogDescriptionProps, ["class"]);

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
      class={cn("flex flex-col-reverse sm:(flex-row justify-end space-x-2)", local.class)}
      {...rest}
    />
  );
};

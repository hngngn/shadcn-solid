import * as DrawerPrimitive from "corvu/drawer";
import type { ComponentProps, ParentComponent } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "@/lib/cn";

export const Drawer = DrawerPrimitive.Root;
export const DrawerTrigger = DrawerPrimitive.Trigger;
export const DrawerClose = DrawerPrimitive.Close;

export const DrawerContent = (props: DrawerPrimitive.ContentProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);
  const ctx = DrawerPrimitive.useContext();

  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Overlay
        class="fixed inset-0 z-50 data-[transitioning]:transition-colors data-[transitioning]:duration-200"
        style={{
          "background-color": `rgb(0 0 0 / ${0.8 * ctx.openPercentage()})`
        }}
      />
      <DrawerPrimitive.Content
        class={cn(
          "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-xl border bg-background after:absolute after:inset-x-0 after:top-full after:h-[50%] after:bg-inherit data-[transitioning]:transition-transform data-[transitioning]:duration-200 md:select-none",
          local.class
        )}
        {...rest}
      >
        <div class="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
        {local.children}
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  );
};

export const DrawerHeader: ParentComponent<ComponentProps<"div">> = props => {
  const [local, rest] = splitProps(props, ["class"]);

  return <div class={cn("grid gap-1.5 p-4 text-center sm:text-left", local.class)} {...rest} />;
};

export const DrawerFooter: ParentComponent<ComponentProps<"div">> = props => {
  const [local, rest] = splitProps(props, ["class"]);

  return <div class={cn("mt-auto flex flex-col gap-2 p-4", local.class)} {...rest} />;
};

export const DrawerLabel = (props: DrawerPrimitive.LabelProps) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <DrawerPrimitive.Label
      class={cn("text-lg font-semibold leading-none tracking-tight", local.class)}
      {...rest}
    />
  );
};

export const DrawerDescription = (props: DrawerPrimitive.DescriptionProps) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <DrawerPrimitive.Description
      class={cn("text-sm text-muted-foreground", local.class)}
      {...rest}
    />
  );
};

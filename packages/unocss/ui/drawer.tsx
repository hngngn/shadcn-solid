import { cn } from "@/libs/cn";
import type {
  ContentElementProps,
  ContentProps,
  DescriptionElementProps,
  DescriptionProps,
  DynamicProps,
  LabelElementProps,
  LabelProps
} from "@corvu/drawer";
import DrawerPrimitive from "@corvu/drawer";
import type { ComponentProps, ParentProps, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

export const Drawer = DrawerPrimitive;
export const DrawerTrigger = DrawerPrimitive.Trigger;
export const DrawerClose = DrawerPrimitive.Close;

type DrawerContentProps = ParentProps<
  ContentProps & {
    class?: string;
  }
>;

export const DrawerContent = <T extends ValidComponent = "div">(
  props: DynamicProps<T, DrawerContentProps, ContentElementProps>
) => {
  const [local, rest] = splitProps(props as DrawerContentProps, ["class", "children"]);
  const ctx = DrawerPrimitive.useContext();

  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Overlay
        class="fixed inset-0 z-50 data-[transitioning]:(transition-colors duration-200)"
        style={{
          "background-color": `rgb(0 0 0 / ${0.8 * ctx.openPercentage()})`
        }}
      />
      <DrawerPrimitive.Content
        class={cn(
          "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-xl border bg-background after:(absolute inset-x-0 top-full h-[50%] bg-inherit) data-[transitioning]:(transition-transform duration-200) md:select-none",
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

export const DrawerHeader = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"]);

  return <div class={cn("grid gap-1.5 p-4 text-center sm:text-left", local.class)} {...rest} />;
};

export const DrawerFooter = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"]);

  return <div class={cn("mt-auto flex flex-col gap-2 p-4", local.class)} {...rest} />;
};

type DrawerLabelProps = LabelProps & {
  class?: string;
};

export const DrawerLabel = <T extends ValidComponent = "h2">(
  props: DynamicProps<T, DrawerLabelProps, LabelElementProps>
) => {
  const [local, rest] = splitProps(props as DrawerLabelProps, ["class"]);

  return (
    <DrawerPrimitive.Label
      class={cn("text-lg font-semibold leading-none tracking-tight", local.class)}
      {...rest}
    />
  );
};

type DrawerDescriptionProps = DescriptionProps & {
  class?: string;
};

export const DrawerDescription = <T extends ValidComponent = "p">(
  props: DynamicProps<T, DrawerDescriptionProps, DescriptionElementProps>
) => {
  const [local, rest] = splitProps(props as DrawerDescriptionProps, ["class"]);

  return (
    <DrawerPrimitive.Description
      class={cn("text-sm text-muted-foreground", local.class)}
      {...rest}
    />
  );
};

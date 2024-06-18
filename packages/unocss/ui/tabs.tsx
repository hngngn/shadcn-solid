import { cn } from "@/libs/cn";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type {
  TabsContentProps,
  TabsIndicatorProps,
  TabsListProps,
  TabsRootProps,
  TabsTriggerProps
} from "@kobalte/core/tabs";
import { Tabs as TabsPrimitive } from "@kobalte/core/tabs";
import type { ValidComponent, VoidProps } from "solid-js";
import { splitProps } from "solid-js";

type tabsProps<T extends ValidComponent = "div"> = TabsRootProps<T> & {
  class?: string;
};

export const Tabs = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, tabsProps<T>>
) => {
  const [local, rest] = splitProps(props as tabsProps, ["class"]);

  return (
    <TabsPrimitive class={cn("w-full data-[orientation=vertical]:flex", local.class)} {...rest} />
  );
};

type tabsListProps<T extends ValidComponent = "div"> = TabsListProps<T> & {
  class?: string;
};

export const TabsList = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, tabsListProps<T>>
) => {
  const [local, rest] = splitProps(props as tabsListProps, ["class"]);

  return (
    <TabsPrimitive.List
      class={cn(
        "relative flex h-9 rounded-lg bg-muted p-1 text-muted-foreground data-[orientation=vertical]:(flex-col items-stretch border-r) data-[orientation=horizontal]:(items-center border-b)",
        local.class
      )}
      {...rest}
    />
  );
};

type tabsContentProps<T extends ValidComponent = "div"> = TabsContentProps<T> & {
  class?: string;
};

export const TabsContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, tabsContentProps<T>>
) => {
  const [local, rest] = splitProps(props as tabsContentProps, ["class"]);

  return (
    <TabsPrimitive.Content
      class={cn(
        "mt-2 ring-offset-background focus-visible:(outline-none ring-1.5 ring-ring ring-offset-2)",
        local.class
      )}
      {...rest}
    />
  );
};

type tabsTriggerProps<T extends ValidComponent = "button"> = TabsTriggerProps<T> & {
  class?: string;
};

export const TabsTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, tabsTriggerProps<T>>
) => {
  const [local, rest] = splitProps(props as tabsTriggerProps, ["class"]);

  return (
    <TabsPrimitive.Trigger
      class={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-shadow focus-visible:(outline-none ring-1.5 ring-ring ring-offset-2) disabled:(pointer-events-none opacity-50) data-[selected]:(bg-background text-foreground shadow) bg-inherit",
        local.class
      )}
      {...rest}
    />
  );
};

type tabsIndicatorProps<T extends ValidComponent = "div"> = VoidProps<
  TabsIndicatorProps<T> & {
    class?: string;
  }
>;

export const TabsIndicator = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, tabsIndicatorProps<T>>
) => {
  const [local, rest] = splitProps(props as tabsIndicatorProps, ["class"]);

  return (
    <TabsPrimitive.Indicator
      class={cn(
        "absolute transition-all duration-200 data-[orientation=horizontal]:(-bottom-[1px] h-[2px]) data-[orientation=vertical]:(-right-[1px] w-[2px])",
        local.class
      )}
      {...rest}
    />
  );
};

import { cn } from "@/lib/cn";
import { Tabs as TabsPrimitive } from "@kobalte/core";
import type { VoidProps } from "solid-js";
import { splitProps } from "solid-js";

export const Tabs = (props: TabsPrimitive.TabsRootProps) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <TabsPrimitive.Root
      class={cn("w-full data-[orientation=vertical]:flex", local.class)}
      {...rest}
    />
  );
};

export const TabsList = (props: TabsPrimitive.TabsListProps) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <TabsPrimitive.List
      class={cn(
        "relative flex h-9 rounded-lg bg-muted p-1 text-muted-foreground data-[orientation=vertical]:flex-col data-[orientation=horizontal]:items-center data-[orientation=vertical]:items-stretch data-[orientation=horizontal]:border-b data-[orientation=vertical]:border-r",
        local.class
      )}
      {...rest}
    />
  );
};

export const TabsContent = (props: TabsPrimitive.TabsContentProps) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <TabsPrimitive.Content
      class={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        local.class
      )}
      {...rest}
    />
  );
};

export const TabsTrigger = (props: TabsPrimitive.TabsTriggerProps) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <TabsPrimitive.Trigger
      class={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[selected]:bg-background data-[selected]:text-foreground data-[selected]:shadow",
        local.class
      )}
      {...rest}
    />
  );
};

export const TabsIndicator = (props: VoidProps<TabsPrimitive.TabsIndicatorProps>) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <TabsPrimitive.Indicator
      class={cn(
        "absolute transition-all duration-200 data-[orientation=horizontal]:-bottom-[1px] data-[orientation=vertical]:-right-[1px] data-[orientation=horizontal]:h-[2px] data-[orientation=vertical]:w-[2px]",
        local.class
      )}
      {...rest}
    />
  );
};

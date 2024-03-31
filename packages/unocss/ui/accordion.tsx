import { cn } from "@/libs/cn";
import { Accordion as AccordionPrimitive } from "@kobalte/core";
import { splitProps } from "solid-js";

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = (props: AccordionPrimitive.AccordionItemProps) => {
  const [local, rest] = splitProps(props, ["class"]);

  return <AccordionPrimitive.Item class={cn("border-b", local.class)} {...rest} />;
};

export const AccordionTrigger = (props: AccordionPrimitive.AccordionTriggerProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <AccordionPrimitive.Header class="flex" as="div">
      <AccordionPrimitive.Trigger
        class={cn(
          "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-expanded]>svg]:rotate-180 bg-inherit",
          local.class
        )}
        {...rest}
      >
        {local.children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="h-4 w-4 text-muted-foreground transition-transform duration-200"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m6 9l6 6l6-6"
          />
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
};

export const AccordionContent = (props: AccordionPrimitive.AccordionContentProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <AccordionPrimitive.Content
      class={cn(
        "animate-accordion-up overflow-hidden text-sm data-[expanded]:animate-accordion-down",
        local.class
      )}
      {...rest}
    >
      <div class="pb-4 pt-0">{local.children}</div>
    </AccordionPrimitive.Content>
  );
};

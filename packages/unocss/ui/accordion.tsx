import { cn } from "@/libs/cn";
import * as AccordionPrimitive from "@kobalte/core/accordion";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { type ParentProps, type ValidComponent, splitProps } from "solid-js";

export const Accordion = AccordionPrimitive.Root;

type AccordionItemProps = AccordionPrimitive.AccordionItemProps & {
  class?: string;
};

export const AccordionItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, AccordionItemProps>
) => {
  const [local, rest] = splitProps(props as AccordionItemProps, ["class"]);

  return <AccordionPrimitive.Item class={cn("border-b", local.class)} {...rest} />;
};

type AccordionTriggerProps = ParentProps<
  AccordionPrimitive.AccordionTriggerProps & {
    class?: string;
  }
>;

export const AccordionTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, AccordionTriggerProps>
) => {
  const [local, rest] = splitProps(props as AccordionTriggerProps, ["class", "children"]);

  return (
    <AccordionPrimitive.Header class="flex" as="div">
      <AccordionPrimitive.Trigger
        class={cn(
          "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-shadow hover:underline [&[data-expanded]>svg]:rotate-180 bg-inherit focus-visible:(outline-none ring-1.5 ring-ring)",
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

type AccordionContentProps = ParentProps<
  AccordionPrimitive.AccordionContentProps & {
    class?: string;
  }
>;

export const AccordionContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, AccordionContentProps>
) => {
  const [local, rest] = splitProps(props as AccordionContentProps, ["class", "children"]);

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

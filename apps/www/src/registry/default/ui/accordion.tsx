import { cn } from "@/lib/cn"
import { Accordion as AccordionPrimitive } from "@kobalte/core"
import type { Component, ParentComponent } from "solid-js"
import { splitProps } from "solid-js"

export const Accordion = AccordionPrimitive.Root

export const AccordionItem: Component<AccordionPrimitive.AccordionItemProps> = (
  props
) => {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <AccordionPrimitive.Item class={cn("border-b", local.class)} {...rest} />
  )
}

export const AccordionTrigger: ParentComponent<
  AccordionPrimitive.AccordionTriggerProps
> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <AccordionPrimitive.Header class="flex" as="div">
      <AccordionPrimitive.Trigger
        class={cn(
          "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-expanded]>svg]:rotate-180",
          local.class
        )}
        {...rest}
      >
        {local.children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="text-muted-foreground h-4 w-4 transition-transform duration-200"
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
  )
}

export const AccordionContent: ParentComponent<
  AccordionPrimitive.AccordionContentProps
> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <AccordionPrimitive.Content
      class={cn(
        "animate-accordion-up data-[expanded]:animate-accordion-down overflow-hidden text-sm",
        local.class
      )}
      {...rest}
    >
      <div class="pb-4 pt-0">{local.children}</div>
    </AccordionPrimitive.Content>
  )
}

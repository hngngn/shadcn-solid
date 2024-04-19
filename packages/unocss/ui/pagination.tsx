import { cn } from "@/libs/cn";
import { Pagination as PaginationPrimitive } from "@kobalte/core";
import type { VariantProps } from "class-variance-authority";
import type { VoidProps } from "solid-js";
import { type ParentComponent, mergeProps, splitProps } from "solid-js";
import { buttonVariants } from "./button";

export const PaginationItems = PaginationPrimitive.Items;

export const Pagination: ParentComponent<PaginationPrimitive.PaginationRootProps> = props => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <PaginationPrimitive.Root
      class={cn(
        "mx-auto flex w-full justify-center [&>ul]:(flex flex-row items-center gap-1)",
        local.class
      )}
      {...rest}
    />
  );
};

export const PaginationItem = (
  props: PaginationPrimitive.PaginationItemProps & Pick<VariantProps<typeof buttonVariants>, "size">
) => {
  const merge = mergeProps(
    { size: "icon" } as Pick<VariantProps<typeof buttonVariants>, "size">,
    props
  );
  const [local, rest] = splitProps(merge, ["class", "size"]);

  return (
    <PaginationPrimitive.Item
      class={cn(
        buttonVariants({
          variant: "ghost",
          size: local.size
        }),
        "aria-[current=page]:(border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground)",
        local.class
      )}
      {...rest}
    />
  );
};

export const PaginationEllipsis = (
  props: VoidProps<PaginationPrimitive.PaginationEllipsisProps>
) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <PaginationPrimitive.Ellipsis
      class={cn("flex h-9 w-9 items-center justify-center", local.class)}
      {...rest}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4">
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0m7 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
        />
      </svg>
      <span class="sr-only">More pages</span>
    </PaginationPrimitive.Ellipsis>
  );
};

export const PaginationPrevious = (
  props: VoidProps<
    PaginationPrimitive.PaginationPreviousProps & Pick<VariantProps<typeof buttonVariants>, "size">
  >
) => {
  const merge = mergeProps(
    { size: "icon" } as Pick<VariantProps<typeof buttonVariants>, "size">,
    props
  );
  const [local, rest] = splitProps(merge, ["class", "size"]);

  return (
    <PaginationPrimitive.Previous
      class={cn(
        buttonVariants({
          variant: "ghost",
          size: local.size
        }),
        "aria-[current=page]:(border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground)",
        local.class
      )}
      {...rest}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4">
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m15 6l-6 6l6 6"
        />
      </svg>
    </PaginationPrimitive.Previous>
  );
};

export const PaginationNext = (
  props: PaginationPrimitive.PaginationNextProps & Pick<VariantProps<typeof buttonVariants>, "size">
) => {
  const merge = mergeProps(
    { size: "icon" } as Pick<VariantProps<typeof buttonVariants>, "size">,
    props
  );
  const [local, rest] = splitProps(merge, ["class", "size"]);

  return (
    <PaginationPrimitive.Next
      class={cn(
        buttonVariants({
          variant: "ghost",
          size: local.size
        }),
        "aria-[current=page]:(border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground)",
        local.class
      )}
      {...rest}
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m9 6l6 6l-6 6"
        />
      </svg>
    </PaginationPrimitive.Next>
  );
};

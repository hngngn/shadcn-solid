import { cn } from "@/libs/cn";
import * as PaginationPrimitive from "@kobalte/core/pagination";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { VariantProps } from "class-variance-authority";
import type { ValidComponent, VoidProps } from "solid-js";
import { mergeProps, splitProps } from "solid-js";
import { buttonVariants } from "./button";

export const PaginationItems = PaginationPrimitive.Items;

type PaginationProps = PaginationPrimitive.PaginationRootProps & {
  class?: string;
};

export const Pagination = <T extends ValidComponent = "nav">(
  props: PolymorphicProps<T, PaginationProps>
) => {
  const [local, rest] = splitProps(props as PaginationProps, ["class"]);

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

type PaginationItemProps = PaginationPrimitive.PaginationItemProps &
  Pick<VariantProps<typeof buttonVariants>, "size"> & {
    class?: string;
  };

export const PaginationItem = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, PaginationItemProps>
) => {
  const merge = mergeProps({ size: "icon" }, props);
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

type PaginationEllipsisProps = VoidProps<
  PaginationPrimitive.PaginationEllipsisProps & {
    class?: string;
  }
>;

export const PaginationEllipsis = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, PaginationEllipsisProps>
) => {
  const [local, rest] = splitProps(props as PaginationEllipsisProps, ["class"]);

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

type PaginationPreviousProps = PaginationPrimitive.PaginationPreviousProps &
  Pick<VariantProps<typeof buttonVariants>, "size"> & {
    class?: string;
  };

export const PaginationPrevious = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, PaginationPreviousProps>
) => {
  const merge = mergeProps({ size: "icon" }, props);
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

type PaginationNextProps = PaginationPrimitive.PaginationNextProps &
  Pick<VariantProps<typeof buttonVariants>, "size"> & {
    class?: string;
  };

export const PaginationNext = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, PaginationNextProps>
) => {
  const merge = mergeProps({ size: "icon" }, props);
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

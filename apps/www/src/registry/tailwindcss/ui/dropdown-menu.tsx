import { cn } from "@/libs/cn";
import * as DropdownMenuPrimitive from "@kobalte/core/dropdown-menu";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { mergeDefaultProps } from "@kobalte/utils";
import type { ComponentProps, ParentProps, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export const DropdownMenu = (props: DropdownMenuPrimitive.DropdownMenuRootProps) => {
  const merge = mergeDefaultProps({ gutter: 4 }, props);

  return <DropdownMenuPrimitive.Root {...merge} />;
};

type DropdownMenuContentProps = DropdownMenuPrimitive.DropdownMenuContentProps & {
  class?: string;
};

export const DropdownMenuContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DropdownMenuContentProps>
) => {
  const [local, rest] = splitProps(props as DropdownMenuContentProps, ["class"]);

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        class={cn(
          "min-w-8rem z-50 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95",
          local.class
        )}
        {...rest}
      />
    </DropdownMenuPrimitive.Portal>
  );
};

type DropdownMenuItemProps = DropdownMenuPrimitive.DropdownMenuItemProps & {
  class?: string;
  inset?: boolean;
};

export const DropdownMenuItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DropdownMenuItemProps>
) => {
  const [local, rest] = splitProps(props as DropdownMenuItemProps, ["class", "inset"]);

  return (
    <DropdownMenuPrimitive.Item
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.inset && "pl-8",
        local.class
      )}
      {...rest}
    />
  );
};

type DropdownMenuGroupLabelProps = DropdownMenuPrimitive.DropdownMenuGroupLabelProps & {
  class?: string;
};

export const DropdownMenuGroupLabel = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, DropdownMenuGroupLabelProps>
) => {
  const [local, rest] = splitProps(props as DropdownMenuGroupLabelProps, ["class"]);

  return (
    <DropdownMenuPrimitive.GroupLabel
      as="div"
      class={cn("px-2 py-1.5 text-sm font-semibold", local.class)}
      {...rest}
    />
  );
};

type DropdownMenuItemLabelProps = DropdownMenuPrimitive.DropdownMenuItemLabelProps & {
  class?: string;
};

export const DropdownMenuItemLabel = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DropdownMenuItemLabelProps>
) => {
  const [local, rest] = splitProps(props as DropdownMenuItemLabelProps, ["class"]);

  return (
    <DropdownMenuPrimitive.ItemLabel
      as="div"
      class={cn("px-2 py-1.5 text-sm font-semibold", local.class)}
      {...rest}
    />
  );
};

type DropdownMenuSeparatorProps = DropdownMenuPrimitive.DropdownMenuItemLabelProps & {
  class?: string;
};

export const DropdownMenuSeparator = <T extends ValidComponent = "hr">(
  props: PolymorphicProps<T, DropdownMenuSeparatorProps>
) => {
  const [local, rest] = splitProps(props as DropdownMenuSeparatorProps, ["class"]);

  return (
    <DropdownMenuPrimitive.Separator
      class={cn("-mx-1 my-1 h-px bg-muted", local.class)}
      {...rest}
    />
  );
};

export const DropdownMenuShortcut = (props: ComponentProps<"span">) => {
  const [local, rest] = splitProps(props, ["class"]);

  return <span class={cn("ml-auto text-xs tracking-widest opacity-60", local.class)} {...rest} />;
};

type DropdownMenuSubTriggerProps = ParentProps<
  DropdownMenuPrimitive.DropdownMenuSubTriggerProps & {
    class?: string;
  }
>;

export const DropdownMenuSubTrigger = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DropdownMenuSubTriggerProps>
) => {
  const [local, rest] = splitProps(props as DropdownMenuSubTriggerProps, ["class", "children"]);

  return (
    <DropdownMenuPrimitive.SubTrigger
      class={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[expanded]:bg-accent",
        local.class
      )}
      {...rest}
    >
      {local.children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        class="ml-auto h-4 w-4"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m9 6l6 6l-6 6"
        />
      </svg>
    </DropdownMenuPrimitive.SubTrigger>
  );
};

type DropdownMenuSubContentProps = DropdownMenuPrimitive.DropdownMenuSubTriggerProps & {
  class?: string;
};

export const DropdownMenuSubContent = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DropdownMenuSubContentProps>
) => {
  const [local, rest] = splitProps(props as DropdownMenuSubContentProps, ["class"]);

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent
        class={cn(
          "min-w-8rem z-50 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95",
          local.class
        )}
        {...rest}
      />
    </DropdownMenuPrimitive.Portal>
  );
};

type DropdownMenuCheckboxItemProps = ParentProps<
  DropdownMenuPrimitive.DropdownMenuCheckboxItemProps & {
    class?: string;
  }
>;

export const DropdownMenuCheckboxItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DropdownMenuCheckboxItemProps>
) => {
  const [local, rest] = splitProps(props as DropdownMenuCheckboxItemProps, ["class", "children"]);

  return (
    <DropdownMenuPrimitive.CheckboxItem
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class
      )}
      {...rest}
    >
      <DropdownMenuPrimitive.ItemIndicator class="absolute left-2 inline-flex h-4 w-4 items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4">
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m5 12l5 5L20 7"
          />
        </svg>
      </DropdownMenuPrimitive.ItemIndicator>
      {props.children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
};

type DropdownMenuRadioItemProps = ParentProps<
  DropdownMenuPrimitive.DropdownMenuRadioItemProps & {
    class?: string;
  }
>;

export const DropdownMenuRadioItem = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, DropdownMenuRadioItemProps>
) => {
  const [local, rest] = splitProps(props as DropdownMenuRadioItemProps, ["class", "children"]);

  return (
    <DropdownMenuPrimitive.RadioItem
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class
      )}
      {...rest}
    >
      <DropdownMenuPrimitive.ItemIndicator class="absolute left-2 inline-flex h-4 w-4 items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-2 w-2">
          <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="M0 0h24v24H0z" />
            <path
              fill="currentColor"
              d="M7 3.34a10 10 0 1 1-4.995 8.984L2 12l.005-.324A10 10 0 0 1 7 3.34"
            />
          </g>
        </svg>
      </DropdownMenuPrimitive.ItemIndicator>
      {props.children}
    </DropdownMenuPrimitive.RadioItem>
  );
};

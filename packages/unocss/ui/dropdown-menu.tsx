import { cn } from "@/libs/cn";
import { DropdownMenu as DropdownMenuPrimitive } from "@kobalte/core";
import type { ComponentProps, ParentProps, VoidProps } from "solid-js";
import { mergeProps, splitProps } from "solid-js";

export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuGroup = DropdownMenuPrimitive.Group;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export const DropdownMenu = (props: DropdownMenuPrimitive.DropdownMenuRootProps) => {
  const merge = mergeProps<ParentProps<DropdownMenuPrimitive.DropdownMenuRootProps[]>>(
    { gutter: 4 },
    props
  );

  return <DropdownMenuPrimitive.Root {...merge} />;
};

export const DropdownMenuContent = (props: DropdownMenuPrimitive.DropdownMenuContentProps) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        class={cn(
          "min-w-8rem z-50 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[expanded]:(animate-in fade-in-0 zoom-in-95) data-[closed]:(animate-out fade-out-0 zoom-out-95) focus-visible:(outline-none ring-1.5 ring-ring) transition-shadow",
          local.class
        )}
        {...rest}
      />
    </DropdownMenuPrimitive.Portal>
  );
};

export const DropdownMenuItem = (
  props: DropdownMenuPrimitive.DropdownMenuItemProps & {
    inset?: boolean;
  }
) => {
  const [local, rest] = splitProps(props, ["class", "inset"]);

  return (
    <DropdownMenuPrimitive.Item
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:(bg-accent text-accent-foreground) data-[disabled]:(pointer-events-none opacity-50)",
        local.inset && "pl-8",
        local.class
      )}
      {...rest}
    />
  );
};

export const DropdownMenuGroupLabel = (
  props: DropdownMenuPrimitive.DropdownMenuGroupLabelProps
) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <DropdownMenuPrimitive.GroupLabel
      as="div"
      class={cn("px-2 py-1.5 text-sm font-semibold", local.class)}
      {...rest}
    />
  );
};

export const DropdownMenuItemLabel = (props: DropdownMenuPrimitive.DropdownMenuItemLabelProps) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <DropdownMenuPrimitive.ItemLabel
      as="div"
      class={cn("px-2 py-1.5 text-sm font-semibold", local.class)}
      {...rest}
    />
  );
};

export const DropdownMenuSeparator = (
  props: VoidProps<DropdownMenuPrimitive.DropdownMenuSeparatorProps>
) => {
  const [local, rest] = splitProps(props, ["class"]);

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

export const DropdownMenuSubTrigger = (
  props: DropdownMenuPrimitive.DropdownMenuSubTriggerProps
) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

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

export const DropdownMenuSubContent = (
  props: DropdownMenuPrimitive.DropdownMenuSubContentProps
) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent
        class={cn(
          "min-w-8rem z-50 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[expanded]:(animate-in fade-in-0 zoom-in-95) data-[closed]:(animate-out fade-out-0 zoom-out-95)",
          local.class
        )}
        {...rest}
      />
    </DropdownMenuPrimitive.Portal>
  );
};

export const DropdownMenuCheckboxItem = (
  props: DropdownMenuPrimitive.DropdownMenuCheckboxItemProps
) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <DropdownMenuPrimitive.CheckboxItem
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:(bg-accent text-accent-foreground) data-[disabled]:(pointer-events-none opacity-50)",
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

export const DropdownMenuRadioItem = (props: DropdownMenuPrimitive.DropdownMenuRadioItemProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <DropdownMenuPrimitive.RadioItem
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:(bg-accent text-accent-foreground) data-[disabled]:(pointer-events-none opacity-50)",
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

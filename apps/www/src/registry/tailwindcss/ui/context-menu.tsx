import { cn } from "@/lib/cn";
import { ContextMenu as ContextMenuPrimitive } from "@kobalte/core";
import type { ComponentProps, VoidProps } from "solid-js";
import { splitProps } from "solid-js";

export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
export const ContextMenuGroup = ContextMenuPrimitive.Group;
export const ContextMenuSub = ContextMenuPrimitive.Sub;
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

export const ContextMenuSubTrigger = (
  props: ContextMenuPrimitive.ContextMenuSubTriggerProps & {
    inset?: boolean;
  }
) => {
  const [local, rest] = splitProps(props, ["class", "children", "inset"]);

  return (
    <ContextMenuPrimitive.SubTrigger
      class={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[expanded]:bg-accent data-[expanded]:text-accent-foreground",
        local.inset && "pl-8",
        local.class
      )}
      {...rest}
    >
      {local.children}
      <svg xmlns="http://www.w3.org/2000/svg" class="ml-auto h-4 w-4" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m9 6l6 6l-6 6"
        />
      </svg>
    </ContextMenuPrimitive.SubTrigger>
  );
};

export const ContextMenuSubContent = (props: ContextMenuPrimitive.ContextMenuSubContentProps) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.SubContent
        class={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95",
          local.class
        )}
        {...rest}
      />
    </ContextMenuPrimitive.Portal>
  );
};

export const ContextMenuContent = (props: ContextMenuPrimitive.ContextMenuContentProps) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        class={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 data-[closed]:zoom-out-95 data-[expanded]:zoom-in-95",
          local.class
        )}
        {...rest}
      />
    </ContextMenuPrimitive.Portal>
  );
};

export const ContextMenuItem = (
  props: ContextMenuPrimitive.ContextMenuItemProps & {
    inset?: boolean;
  }
) => {
  const [local, rest] = splitProps(props, ["class", "inset"]);

  return (
    <ContextMenuPrimitive.Item
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.inset && "pl-8",
        local.class
      )}
      {...rest}
    />
  );
};

export const ContextMenuCheckboxItem = (
  props: ContextMenuPrimitive.ContextMenuCheckboxItemProps
) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <ContextMenuPrimitive.CheckboxItem
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class
      )}
      {...rest}
    >
      <ContextMenuPrimitive.ItemIndicator class="absolute left-2 inline-flex h-3.5 w-3.5 items-center justify-center">
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
      </ContextMenuPrimitive.ItemIndicator>
      {local.children}
    </ContextMenuPrimitive.CheckboxItem>
  );
};

export const ContextMenuRadioItem = (props: ContextMenuPrimitive.ContextMenuRadioItemProps) => {
  const [local, rest] = splitProps(props, ["class", "children"]);

  return (
    <ContextMenuPrimitive.RadioItem
      class={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        local.class
      )}
      {...rest}
    >
      <ContextMenuPrimitive.ItemIndicator class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-2 w-2">
          <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
            <path d="M0 0h24v24H0z" />
            <path
              fill="currentColor"
              d="M7 3.34a10 10 0 1 1-4.995 8.984L2 12l.005-.324A10 10 0 0 1 7 3.34"
            />
          </g>
        </svg>
      </ContextMenuPrimitive.ItemIndicator>
      {local.children}
    </ContextMenuPrimitive.RadioItem>
  );
};

export const ContextMenuItemLabel = (
  props: ContextMenuPrimitive.ContextMenuItemLabelProps & {
    inset?: boolean;
  }
) => {
  const [local, rest] = splitProps(props, ["class", "inset"]);

  return (
    <ContextMenuPrimitive.ItemLabel
      class={cn(
        "px-2 py-1.5 text-sm font-semibold text-foreground",
        local.inset && "pl-8",
        local.class
      )}
      {...rest}
    />
  );
};

export const ContextMenuGroupLabel = (
  props: ContextMenuPrimitive.ContextMenuGroupLabelProps & {
    inset?: boolean;
  }
) => {
  const [local, rest] = splitProps(props, ["class", "inset"]);

  return (
    <ContextMenuPrimitive.GroupLabel
      as="div"
      class={cn(
        "px-2 py-1.5 text-sm font-semibold text-foreground",
        local.inset && "pl-8",
        local.class
      )}
      {...rest}
    />
  );
};

export const ContextMenuSeparator = (
  props: VoidProps<ContextMenuPrimitive.ContextMenuSeparatorProps>
) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ContextMenuPrimitive.Separator
      class={cn("-mx-1 my-1 h-px bg-border", local.class)}
      {...rest}
    />
  );
};

export const ContextMenuShortcut = (props: ComponentProps<"span">) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <span
      class={cn("ml-auto text-xs tracking-widest text-muted-foreground", local.class)}
      {...rest}
    />
  );
};

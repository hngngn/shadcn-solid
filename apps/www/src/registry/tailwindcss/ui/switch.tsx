import { cn } from "@/libs/cn";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import * as SwitchPrimitive from "@kobalte/core/switch";
import type { ParentProps, ValidComponent, VoidProps } from "solid-js";
import { splitProps } from "solid-js";

export const SwitchLabel = SwitchPrimitive.Label;
export const Switch = SwitchPrimitive.Root;
export const SwitchErrorMessage = SwitchPrimitive.ErrorMessage;
export const SwitchDescription = SwitchPrimitive.Description;

type SwitchControlProps = ParentProps<SwitchPrimitive.SwitchControlProps & { class?: string }>;

export const SwitchControl = <T extends ValidComponent = "input">(
  props: PolymorphicProps<T, SwitchControlProps>
) => {
  const [local, rest] = splitProps(props as SwitchControlProps, ["class", "children"]);

  return (
    <>
      <SwitchPrimitive.Input
        class={cn(
          "[&:focus-visible+div]:outline-none [&:focus-visible+div]:ring-[1.5px] [&:focus-visible+div]:ring-ring [&:focus-visible+div]:ring-offset-2 [&:focus-visible+div]:ring-offset-background",
          local.class
        )}
      />
      <SwitchPrimitive.Control
        class={cn(
          "inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-input shadow-sm transition-[color,background-color,box-shadow] data-[disabled]:cursor-not-allowed data-[checked]:bg-primary data-[disabled]:opacity-50",
          local.class
        )}
        {...rest}
      >
        {local.children}
      </SwitchPrimitive.Control>
    </>
  );
};

type SwitchThumbProps = VoidProps<SwitchPrimitive.SwitchControlProps & { class?: string }>;

export const SwitchThumb = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, SwitchThumbProps>
) => {
  const [local, rest] = splitProps(props as SwitchThumbProps, ["class"]);

  return (
    <SwitchPrimitive.Thumb
      class={cn(
        "pointer-events-none block h-4 w-4 translate-x-0 rounded-full bg-background shadow-lg ring-0 transition-transform data-[checked]:translate-x-4",
        local.class
      )}
      {...rest}
    />
  );
};

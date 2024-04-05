import { cn } from "@/libs/cn";
import { RadioGroup as RadioGroupPrimitive } from "@kobalte/core";
import type { VoidProps } from "solid-js";
import { splitProps } from "solid-js";

export const RadioGroupDescription = RadioGroupPrimitive.Description;
export const RadioGroupErrorMessage = RadioGroupPrimitive.ErrorMessage;
export const RadioGroupItemDescription = RadioGroupPrimitive.ItemDescription;
export const RadioGroupItemInput = RadioGroupPrimitive.ItemInput;
export const RadioGroupItemLabel = RadioGroupPrimitive.ItemLabel;
export const RadioGroupLabel = RadioGroupPrimitive.Label;
export const RadioGroup = RadioGroupPrimitive.Root;
export const RadioGroupItem = RadioGroupPrimitive.Item;

export const RadioGroupItemControl = (
  props: VoidProps<RadioGroupPrimitive.RadioGroupItemControlProps>
) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <RadioGroupPrimitive.ItemControl
      as="button"
      role="radio"
      class={cn(
        "flex aspect-square h-4 w-4 items-center justify-center rounded-full border border-primary text-primary shadow transition-shadow focus:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-foreground",
        local.class
      )}
      {...rest}
    >
      <RadioGroupPrimitive.ItemIndicator class="h-2 w-2 rounded-full data-[checked]:bg-background" />
    </RadioGroupPrimitive.ItemControl>
  );
};

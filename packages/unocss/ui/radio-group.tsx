import { cn } from "@/libs/cn";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import * as RadioGroupPrimitive from "@kobalte/core/radio-group";
import type { ValidComponent, VoidProps } from "solid-js";
import { splitProps } from "solid-js";

export const RadioGroupDescription = RadioGroupPrimitive.Description;
export const RadioGroupErrorMessage = RadioGroupPrimitive.ErrorMessage;
export const RadioGroupItemDescription = RadioGroupPrimitive.ItemDescription;
export const RadioGroupItemInput = RadioGroupPrimitive.ItemInput;
export const RadioGroupItemLabel = RadioGroupPrimitive.ItemLabel;
export const RadioGroupLabel = RadioGroupPrimitive.Label;
export const RadioGroup = RadioGroupPrimitive.Root;
export const RadioGroupItem = RadioGroupPrimitive.Item;

type RadioGroupItemControlProps = VoidProps<
  RadioGroupPrimitive.RadioGroupItemControlProps & { class?: string }
>;

export const RadioGroupItemControl = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, RadioGroupItemControlProps>
) => {
  const [local, rest] = splitProps(props as RadioGroupItemControlProps, ["class"]);

  return (
    <RadioGroupPrimitive.ItemControl
      as="button"
      role="radio"
      class={cn(
        "flex aspect-square h-4 w-4 items-center justify-center rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:(ring-1.5 ring-ring) disabled:(cursor-not-allowed opacity-50) data-[checked]:bg-foreground bg-inherit transition-shadow",
        local.class
      )}
      {...rest}
    >
      <RadioGroupPrimitive.ItemIndicator class="h-2 w-2 rounded-full data-[checked]:bg-background" />
    </RadioGroupPrimitive.ItemControl>
  );
};

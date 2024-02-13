import { For } from "solid-js";
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemLabel
} from "../ui/radio-group";
import { labelVariants } from "../ui/textfield";

const RadioGroupDemo = () => {
  return (
    <RadioGroup defaultValue="Orange" class="grid gap-2">
      <For each={["Apple", "Orange", "Watermelon"]}>
        {fruit => (
          <RadioGroupItem value={fruit} class="flex items-center gap-2">
            <RadioGroupItemControl />
            <RadioGroupItemLabel class={labelVariants({ class: "ml-1" })}>
              {fruit}
            </RadioGroupItemLabel>
          </RadioGroupItem>
        )}
      </For>
    </RadioGroup>
  );
};

export default RadioGroupDemo;

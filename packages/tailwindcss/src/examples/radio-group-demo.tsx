import { For } from "solid-js"

import {
  RadioGroup,
  RadioGroupItemControl,
  RadioGroupItemIndicator,
  RadioGroupItemLabel,
  RadioGroupItems,
  RadioGroupLabel,
} from "@repo/tailwindcss/ui/v4/radio-group"

import { RadioGroupItem } from "../ui/v4/radio-group"

const RadioGroupDemo = () => {
  return (
    <RadioGroup defaultValue="Orange">
      <RadioGroupLabel>Favorite fruit</RadioGroupLabel>
      <RadioGroupItems>
        <For each={["Apple", "Orange", "Watermelon"]}>
          {(fruit) => (
            <RadioGroupItem value={fruit}>
              <RadioGroupItemControl>
                <RadioGroupItemIndicator />
              </RadioGroupItemControl>
              <RadioGroupItemLabel>{fruit}</RadioGroupItemLabel>
            </RadioGroupItem>
          )}
        </For>
      </RadioGroupItems>
    </RadioGroup>
  )
}

export default RadioGroupDemo

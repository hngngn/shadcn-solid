import { createSignal } from "solid-js"

import {
  Select,
  SelectContent,
  SelectErrorMessage,
  SelectItem,
  SelectLabel,
  SelectPortal,
  SelectTrigger,
  SelectValue,
} from "@repo/tailwindcss/ui/v4/select"

const SelectErrorDemo = () => {
  const [value, setValue] = createSignal("Grapes")

  return (
    <Select
      options={["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"]}
      placeholder="Select a fruit"
      value={value()}
      onChange={setValue}
      validationState={value() !== "Apple" ? "invalid" : "valid"}
      itemComponent={(props) => (
        <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
      )}
    >
      <SelectLabel>Fruit</SelectLabel>
      <SelectTrigger class="w-[180px]" aria-label="Fruit">
        <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent />
      </SelectPortal>
      <SelectErrorMessage>Hmm, I prefer apples.</SelectErrorMessage>
    </Select>
  )
}

export default SelectErrorDemo

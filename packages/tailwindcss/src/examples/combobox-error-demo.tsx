import { createSignal } from "solid-js"

import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxErrorMessage,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemLabel,
  ComboboxLabel,
  ComboboxPortal,
  ComboboxTrigger,
} from "@repo/tailwindcss/ui/v4/combobox"

const ALL_OPTIONS = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"]

const ComboboxErrorDemo = () => {
  const [value, setValue] = createSignal("Grapes")
  const onInputChange = (value: string) => {
    if (value === "") {
      setValue("")
    }
  }

  return (
    <Combobox
      options={ALL_OPTIONS}
      value={value()}
      onChange={setValue}
      onInputChange={onInputChange}
      validationState={value() !== "Apple" ? "invalid" : "valid"}
      itemComponent={(props) => (
        <ComboboxItem item={props.item}>
          <ComboboxItemLabel>{props.item.rawValue}</ComboboxItemLabel>
        </ComboboxItem>
      )}
    >
      <ComboboxLabel>Fruit</ComboboxLabel>
      <ComboboxControl>
        <ComboboxInput />
        <ComboboxTrigger />
      </ComboboxControl>
      <ComboboxErrorMessage>Hmm, I prefer apples.</ComboboxErrorMessage>
      <ComboboxPortal>
        <ComboboxContent />
      </ComboboxPortal>
    </Combobox>
  )
}

export default ComboboxErrorDemo

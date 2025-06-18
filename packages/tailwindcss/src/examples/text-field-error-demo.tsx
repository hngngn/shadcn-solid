import { createSignal } from "solid-js"

import {
  TextField,
  TextFieldErrorMessage,
  TextFieldInput,
  TextFieldLabel,
} from "@repo/tailwindcss/ui/v4/text-field"

const TextFieldErrorDemo = () => {
  const [value, setValue] = createSignal("Orange")

  return (
    <TextField
      class="max-w-xs"
      value={value()}
      onChange={setValue}
      validationState={value() !== "Apple" ? "invalid" : "valid"}
    >
      <TextFieldLabel>Favorite fruit</TextFieldLabel>
      <TextFieldInput type="text" />
      <TextFieldErrorMessage>Hmm, I prefer apples.</TextFieldErrorMessage>
    </TextField>
  )
}

export default TextFieldErrorDemo

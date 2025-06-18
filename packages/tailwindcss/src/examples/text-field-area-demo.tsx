import {
  TextField,
  TextFieldTextArea,
} from "@repo/tailwindcss/ui/v4/text-field"

const TextFieldTextAreaDemo = () => {
  return (
    <TextField class="max-w-xs">
      <TextFieldTextArea placeholder="Type your message here." />
    </TextField>
  )
}

export default TextFieldTextAreaDemo

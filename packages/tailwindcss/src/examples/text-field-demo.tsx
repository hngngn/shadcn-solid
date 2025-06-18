import { TextField, TextFieldInput } from "@repo/tailwindcss/ui/v4/text-field"

const TextFieldDemo = () => {
  return (
    <TextField class="max-w-xs">
      <TextFieldInput type="email" placeholder="Email" />
    </TextField>
  )
}

export default TextFieldDemo

import { TextField, TextFieldInput } from "@/registry/ui/text-field"

const TextFieldDemo = () => {
  return (
    <TextField class="max-w-xs">
      <TextFieldInput type="email" placeholder="Email" />
    </TextField>
  )
}

export default TextFieldDemo

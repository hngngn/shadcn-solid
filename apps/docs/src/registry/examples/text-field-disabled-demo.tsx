import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "@/registry/ui/text-field"

const TextFieldDisabledDemo = () => {
  return (
    <TextField class="max-w-xs" disabled>
      <TextFieldLabel>Email</TextFieldLabel>
      <TextFieldInput type="email" placeholder="Email" />
    </TextField>
  )
}

export default TextFieldDisabledDemo

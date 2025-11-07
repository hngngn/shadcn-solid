import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "@/registry/ui/text-field"

const TextFieldFileDemo = () => {
  return (
    <TextField class="max-w-xs">
      <TextFieldLabel>Picture</TextFieldLabel>
      <TextFieldInput type="file" />
    </TextField>
  )
}

export default TextFieldFileDemo

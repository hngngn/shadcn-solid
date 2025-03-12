import {
  TextField,
  TextFieldLabel,
  TextFieldRoot,
} from "@/registry/tailwindcss/ui/textfield"

const TextFieldWithLabel = () => {
  return (
    <TextFieldRoot class="w-full max-w-xs">
      <TextFieldLabel>Email</TextFieldLabel>
      <TextField type="email" placeholder="Email" />
    </TextFieldRoot>
  )
}

export default TextFieldWithLabel

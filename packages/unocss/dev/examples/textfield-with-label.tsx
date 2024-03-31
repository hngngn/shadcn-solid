import { TextField, TextFieldInput, TextFieldLabel } from "../../ui/textfield";

const TextFieldWithLabel = () => {
  return (
    <TextField class="w-full max-w-xs">
      <TextFieldLabel>Email</TextFieldLabel>
      <TextFieldInput type="email" placeholder="Email" />
    </TextField>
  );
};

export default TextFieldWithLabel;

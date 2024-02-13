import { TextField, TextFieldInput, TextFieldLabel } from "../ui/textfield";

const TextFieldWithLabel = () => {
  return (
    <TextField class="grid w-full max-w-sm gap-1.5">
      <TextFieldLabel>Email</TextFieldLabel>
      <TextFieldInput type="email" placeholder="Email" />
    </TextField>
  );
};

export default TextFieldWithLabel;

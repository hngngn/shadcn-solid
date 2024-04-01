import { TextField, TextFieldDescription, TextFieldInput, TextFieldLabel } from "../ui/textfield";

const TextFieldWithText = () => {
  return (
    <TextField class="w-full max-w-xs">
      <TextFieldLabel>Email</TextFieldLabel>
      <TextFieldInput type="email" placeholder="Email" />
      <TextFieldDescription>Enter your email address.</TextFieldDescription>
    </TextField>
  );
};

export default TextFieldWithText;

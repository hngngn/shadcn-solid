import { TextField, TextFieldErrorMessage, TextFieldInput, TextFieldLabel } from "../ui/textfield";

const TextFieldWithError = () => {
  return (
    <TextField class="w-full max-w-xs" validationState="invalid">
      <TextFieldLabel>Email</TextFieldLabel>
      <TextFieldInput type="email" placeholder="Email" />
      <TextFieldErrorMessage>Email is required.</TextFieldErrorMessage>
    </TextField>
  );
};

export default TextFieldWithError;

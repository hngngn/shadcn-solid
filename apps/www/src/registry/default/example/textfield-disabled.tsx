import { TextField, TextFieldInput } from "../ui/textfield";

const TextFieldDisabled = () => {
  return (
    <TextField disabled class="w-full max-w-xs">
      <TextFieldInput type="email" placeholder="Email" />
    </TextField>
  );
};

export default TextFieldDisabled;

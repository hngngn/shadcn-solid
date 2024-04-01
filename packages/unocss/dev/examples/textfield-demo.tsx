import { TextField, TextFieldInput } from "../../ui/textfield";

const TextFieldDemo = () => {
  return (
    <TextField class="w-full max-w-xs">
      <TextFieldInput type="email" placeholder="Email" />
    </TextField>
  );
};

export default TextFieldDemo;

import { TextField, TextFieldInput } from "../ui/textfield";

const TextFieldDisabled = () => {
  return (
    <TextField>
      <TextFieldInput disabled type="email" placeholder="Email" />
    </TextField>
  );
};

export default TextFieldDisabled;

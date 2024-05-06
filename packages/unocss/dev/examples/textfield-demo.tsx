import { TextField, TextFieldRoot } from "../../ui/textfield";

const TextFieldDemo = () => {
  return (
    <TextFieldRoot class="w-full max-w-xs">
      <TextField type="email" placeholder="Email" />
    </TextFieldRoot>
  );
};

export default TextFieldDemo;

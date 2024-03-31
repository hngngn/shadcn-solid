import { TextField, TextFieldInput, TextFieldLabel } from "../ui/textfield";

const TextFieldFile = () => {
  return (
    <TextField disabled class="w-full max-w-xs">
      <TextFieldLabel>Picture</TextFieldLabel>
      <TextFieldInput type="file" />
    </TextField>
  );
};

export default TextFieldFile;

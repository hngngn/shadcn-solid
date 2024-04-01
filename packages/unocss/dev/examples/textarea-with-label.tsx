import { TextFieldTextArea } from "../../ui/textarea";
import { TextField, TextFieldLabel } from "../../ui/textfield";

const TextareaWithLabel = () => {
  return (
    <TextField class="w-full max-w-xs">
      <TextFieldLabel>Your message</TextFieldLabel>
      <TextFieldTextArea placeholder="Type your message here." />
    </TextField>
  );
};

export default TextareaWithLabel;

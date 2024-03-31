import { TextFieldTextArea } from "../ui/textarea";
import { TextField, TextFieldDescription, TextFieldLabel } from "../ui/textfield";

const TextareaWithText = () => {
  return (
    <TextField class="w-full max-w-xs">
      <TextFieldLabel>Your message</TextFieldLabel>
      <TextFieldTextArea placeholder="Type your message here." />
      <TextFieldDescription>Enter your email address.</TextFieldDescription>
    </TextField>
  );
};

export default TextareaWithText;

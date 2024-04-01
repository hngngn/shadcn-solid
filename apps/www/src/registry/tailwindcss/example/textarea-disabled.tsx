import { TextFieldTextArea } from "../ui/textarea";
import { TextField } from "../ui/textfield";

const TextareaDisabled = () => {
  return (
    <TextField class="w-full max-w-xs" disabled>
      <TextFieldTextArea placeholder="Type your message here." />
    </TextField>
  );
};

export default TextareaDisabled;

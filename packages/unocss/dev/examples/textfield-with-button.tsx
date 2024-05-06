import { Button } from "../../ui/button";
import { TextField, TextFieldRoot } from "../../ui/textfield";

const TextFieldWithButton = () => {
  return (
    <div class="flex w-full max-w-sm items-center space-x-2">
      <TextFieldRoot class="w-full">
        <TextField type="email" placeholder="Email" />
      </TextFieldRoot>
      <Button type="button">Subscribe</Button>
    </div>
  );
};

export default TextFieldWithButton;

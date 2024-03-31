import { Button } from "../ui/button";
import { TextField, TextFieldInput } from "../ui/textfield";

const TextFieldWithButton = () => {
  return (
    <div class="flex w-full max-w-sm items-center space-x-2">
      <TextField class="w-full">
        <TextFieldInput type="email" placeholder="Email" />
      </TextField>
      <Button type="button">Subscribe</Button>
    </div>
  );
};

export default TextFieldWithButton;

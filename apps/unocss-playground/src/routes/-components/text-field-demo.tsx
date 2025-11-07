import {
  TextField,
  TextFieldInput,
  TextFieldTextArea,
} from "@/registry/ui/text-field"

const TextFieldDemo = () => {
  return (
    <div class="flex flex-col gap-2 size-full">
      <TextField>
        <TextFieldInput type="email" placeholder="Email" />
      </TextField>
      <TextField validationState="invalid">
        <TextFieldInput type="email" placeholder="Email" />
      </TextField>
      <TextField disabled>
        <TextFieldInput type="email" placeholder="Email" />
      </TextField>
      <TextField>
        <TextFieldTextArea placeholder="Type your message here." />
      </TextField>
    </div>
  )
}

export default TextFieldDemo

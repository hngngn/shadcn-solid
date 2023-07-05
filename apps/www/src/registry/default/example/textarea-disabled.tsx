import { TextField, TextFieldTextArea } from "../ui/textfield"

const TextareaDisabled = () => {
    return (
        <TextField class="w-full max-w-sm">
            <TextFieldTextArea disabled placeholder="Type your message here." />
        </TextField>
    )
}

export default TextareaDisabled

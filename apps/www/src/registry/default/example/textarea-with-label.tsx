import { TextFieldTextArea } from "../ui/textarea"
import { TextField, TextFieldLabel } from "../ui/textfield"

const TextareaWithLabel = () => {
    return (
        <TextField class="grid w-full max-w-sm gap-1.5">
            <TextFieldLabel>Your message</TextFieldLabel>
            <TextFieldTextArea placeholder="Type your message here." />
        </TextField>
    )
}

export default TextareaWithLabel

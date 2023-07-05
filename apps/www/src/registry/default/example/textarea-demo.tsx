import { TextFieldTextArea } from "../ui/textarea"
import { TextField } from "../ui/textfield"

const TextareaDemo = () => {
    return (
        <TextField class="w-full max-w-sm">
            <TextFieldTextArea placeholder="Type your message here." />
        </TextField>
    )
}

export default TextareaDemo

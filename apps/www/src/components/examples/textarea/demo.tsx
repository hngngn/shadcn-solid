import { TextField, TextFieldTextArea } from "~/components"

export const TextareaDemo = () => {
    return (
        <TextField class="w-full max-w-sm">
            <TextFieldTextArea placeholder="Type your message here." />
        </TextField>
    )
}

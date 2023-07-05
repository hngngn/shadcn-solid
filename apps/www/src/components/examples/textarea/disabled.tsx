import { TextField, TextFieldTextArea } from "~/components"

export const TextareaDisabled = () => {
    return (
        <TextField class="w-full max-w-sm">
            <TextFieldTextArea disabled placeholder="Type your message here." />
        </TextField>
    )
}

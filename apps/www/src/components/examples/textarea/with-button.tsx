import { Button, TextField, TextFieldTextArea } from "~/components"

export const TextareaWithButton = () => {
    return (
        <div class="flex w-full max-w-sm flex-col items-center gap-2">
            <TextField class="w-full">
                <TextFieldTextArea placeholder="Type your message here." />
            </TextField>
            <Button type="submit" class="w-full">
                Send message
            </Button>
        </div>
    )
}

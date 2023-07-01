import {
    TextField,
    TextFieldDescription,
    TextFieldLabel,
    TextFieldTextArea,
} from "~/components"

export function TextareaWithText() {
    return (
        <TextField class="grid w-full max-w-sm gap-1.5">
            <TextFieldLabel>Your message</TextFieldLabel>
            <TextFieldTextArea placeholder="Type your message here." />
            <TextFieldDescription class="text-sm text-muted-foreground">
                Enter your email address.
            </TextFieldDescription>
        </TextField>
    )
}

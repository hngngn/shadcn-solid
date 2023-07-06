import { TextField, TextFieldInput, TextFieldLabel } from "../ui/textfield"

const TextFieldWithText = () => {
    return (
        <TextField class="grid w-full max-w-sm gap-1.5">
            <TextFieldLabel>Email</TextFieldLabel>
            <TextFieldInput type="email" placeholder="Email" />
            <p class="text-sm text-muted-foreground">
                Enter your email address.
            </p>
        </TextField>
    )
}

export default TextFieldWithText

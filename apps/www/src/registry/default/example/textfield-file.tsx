import { TextField, TextFieldInput, TextFieldLabel } from "../ui/textfield"

const TextFieldFile = () => {
    return (
        <TextField class="grid w-full max-w-sm gap-1.5">
            <TextFieldLabel>Picture</TextFieldLabel>
            <TextFieldInput disabled type="file" />
        </TextField>
    )
}

export default TextFieldFile

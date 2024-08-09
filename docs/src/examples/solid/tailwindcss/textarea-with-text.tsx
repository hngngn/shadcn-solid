import { TextArea } from "@repo/tailwindcss/solid/textarea";
import {
	TextFieldDescription,
	TextFieldLabel,
	TextFieldRoot,
} from "@repo/tailwindcss/solid/textfield";

const TextareaWithText = () => {
	return (
		<TextFieldRoot class="w-full max-w-xs">
			<TextFieldLabel>Your message</TextFieldLabel>
			<TextArea placeholder="Type your message here." />
			<TextFieldDescription>Enter your email address.</TextFieldDescription>
		</TextFieldRoot>
	);
};

export default TextareaWithText;

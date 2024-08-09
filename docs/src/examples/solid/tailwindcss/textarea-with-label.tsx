import { TextArea } from "@repo/tailwindcss/solid/textarea";
import {
	TextFieldLabel,
	TextFieldRoot,
} from "@repo/tailwindcss/solid/textfield";

const TextareaWithLabel = () => {
	return (
		<TextFieldRoot class="w-full max-w-xs">
			<TextFieldLabel>Your message</TextFieldLabel>
			<TextArea placeholder="Type your message here." />
		</TextFieldRoot>
	);
};

export default TextareaWithLabel;

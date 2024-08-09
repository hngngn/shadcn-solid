import { TextArea } from "@repo/tailwindcss/default/textarea";
import { TextFieldRoot } from "@repo/tailwindcss/default/textfield";

const TextareaDemo = () => {
	return (
		<TextFieldRoot class="w-full max-w-xs">
			<TextArea placeholder="Type your message here." />
		</TextFieldRoot>
	);
};

export default TextareaDemo;

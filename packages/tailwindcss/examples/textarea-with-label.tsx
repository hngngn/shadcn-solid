import { TextArea } from "@/components/ui/textarea";
import { TextFieldLabel, TextFieldRoot } from "@/components/ui/textfield";

const TextareaWithLabel = () => {
	return (
		<TextFieldRoot class="w-full max-w-xs">
			<TextFieldLabel>Your message</TextFieldLabel>
			<TextArea placeholder="Type your message here." />
		</TextFieldRoot>
	);
};

export default TextareaWithLabel;

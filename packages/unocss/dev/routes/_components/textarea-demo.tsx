import { TextArea } from "@/components/ui/textarea";
import { TextFieldRoot } from "@/components/ui/textfield";

const TextareaDemo = () => {
	return (
		<TextFieldRoot class="w-full max-w-xs">
			<TextArea placeholder="Type your message here." />
		</TextFieldRoot>
	);
};

export default TextareaDemo;

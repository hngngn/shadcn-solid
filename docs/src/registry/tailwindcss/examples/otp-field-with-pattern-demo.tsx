import {
	OTPField,
	OTPFieldGroup,
	OTPFieldInput,
	OTPFieldSlot,
} from "@/registry/tailwindcss/ui/otp-field";

const OTPFieldWithPatternDemo = () => {
	return (
		<OTPField maxLength={6}>
			<OTPFieldInput pattern="^[a-zA-Z0-9]*$" />
			<OTPFieldGroup>
				<OTPFieldSlot index={0} />
				<OTPFieldSlot index={1} />
				<OTPFieldSlot index={2} />
				<OTPFieldSlot index={3} />
				<OTPFieldSlot index={4} />
				<OTPFieldSlot index={5} />
			</OTPFieldGroup>
		</OTPField>
	);
};

export default OTPFieldWithPatternDemo;

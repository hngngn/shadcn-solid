import {
	OTPField,
	OTPFieldGroup,
	OTPFieldInput,
	OTPFieldSeparator,
	OTPFieldSlot,
} from "@repo/tailwindcss/ui/otp-field";

const OtpFieldDemo = () => {
	return (
		<OTPField maxLength={6}>
			<OTPFieldInput />
			<OTPFieldGroup>
				<OTPFieldSlot index={0} />
				<OTPFieldSlot index={1} />
				<OTPFieldSlot index={2} />
			</OTPFieldGroup>
			<OTPFieldSeparator />
			<OTPFieldGroup>
				<OTPFieldSlot index={3} />
				<OTPFieldSlot index={4} />
				<OTPFieldSlot index={5} />
			</OTPFieldGroup>
		</OTPField>
	);
};

export default OtpFieldDemo;

import {
	NumberField,
	NumberFieldDecrementTrigger,
	NumberFieldErrorMessage,
	NumberFieldGroup,
	NumberFieldIncrementTrigger,
	NumberFieldInput,
	NumberFieldLabel,
} from "@/registry/tailwindcss/ui/number-field";
import { createSignal } from "solid-js";

const NumberFieldDemo = () => {
	const [value, setValue] = createSignal(1000);

	return (
		<NumberField
			formatOptions={{
				style: "currency",
				currency: "VND",
			}}
			rawValue={value()}
			onRawValueChange={setValue}
			validationState={value() >= 1000 ? "valid" : "invalid"}
			minValue={0}
		>
			<NumberFieldLabel>Payment</NumberFieldLabel>
			<NumberFieldGroup>
				<NumberFieldDecrementTrigger aria-label="Decrement" />
				<NumberFieldInput />
				<NumberFieldIncrementTrigger aria-label="Increment" />
			</NumberFieldGroup>
			<NumberFieldErrorMessage>
				Min ₫1000 to send payment
			</NumberFieldErrorMessage>
		</NumberField>
	);
};

export default NumberFieldDemo;

import {
  NumberField,
  NumberFieldDecrementTrigger,
  NumberFieldGroup,
  NumberFieldIncrementTrigger,
  NumberFieldInput,
  NumberFieldLabel
} from "../../ui/number-field";

const NumberFieldDemo = () => {
  const thisYear = () => new Date(Date.now()).getUTCFullYear();
  const age = () => thisYear() - 2001;

  return (
    <NumberField defaultValue={age()} minValue={0}>
      <NumberFieldLabel>Age</NumberFieldLabel>
      <NumberFieldGroup>
        <NumberFieldDecrementTrigger aria-label="Decrement" />
        <NumberFieldInput />
        <NumberFieldIncrementTrigger aria-label="Increment" />
      </NumberFieldGroup>
    </NumberField>
  );
};

export default NumberFieldDemo;

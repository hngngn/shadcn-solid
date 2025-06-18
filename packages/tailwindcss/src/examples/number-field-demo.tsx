import {
  NumberField,
  NumberFieldDecrementTrigger,
  NumberFieldGroup,
  NumberFieldIncrementTrigger,
  NumberFieldInput,
  NumberFieldLabel,
} from "@repo/tailwindcss/ui/v4/number-field"

const NumberFieldDemo = () => {
  const thisYear = () => new Date(Date.now()).getUTCFullYear()
  const age = () => thisYear() - 2001

  return (
    <NumberField defaultValue={age()} minValue={0}>
      <NumberFieldLabel>Age</NumberFieldLabel>
      <NumberFieldGroup>
        <NumberFieldInput />
        <NumberFieldDecrementTrigger aria-label="Decrement" />
        <NumberFieldIncrementTrigger aria-label="Increment" />
      </NumberFieldGroup>
    </NumberField>
  )
}

export default NumberFieldDemo

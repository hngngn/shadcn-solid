import { useNumberFieldContext } from "@kobalte/core/number-field"

import {
  NumberField,
  NumberFieldDecrementTrigger,
  NumberFieldGroup,
  NumberFieldIncrementTrigger,
  NumberFieldInput,
  NumberFieldLabel,
} from "@/registry/ui/number-field"
import { NumberFlow } from "@/registry/ui/number-flow"

const NumberFieldInputView = () => {
  const context = useNumberFieldContext()

  return (
    <>
      <NumberFieldLabel>Age</NumberFieldLabel>
      <NumberFieldGroup class="relative grid items-center justify-items-center text-center [grid-template-areas:'overlap'] *:[grid-area:overlap]">
        <NumberFieldInput
          class="caret-primary text-center text-transparent"
          style={{
            "font-kerning": "none",
          }}
        />
        <NumberFlow value={Number(context.value())} aria-hidden />
        <NumberFieldDecrementTrigger aria-label="Decrement" />
        <NumberFieldIncrementTrigger aria-label="Increment" />
      </NumberFieldGroup>
    </>
  )
}

const NumberFlowInputDemo = () => {
  const thisYear = () => new Date(Date.now()).getUTCFullYear()
  const age = () => thisYear() - 2001

  return (
    <NumberField defaultValue={age()} minValue={0} maxValue={100}>
      <NumberFieldInputView />
    </NumberField>
  )
}

export default NumberFlowInputDemo

import {
  Checkbox,
  CheckboxControl,
  CheckboxDescription,
  CheckboxInput,
  CheckboxLabel,
} from "@/registry/ui/checkbox"

const CheckboxDemo = () => {
  return (
    <Checkbox class="flex items-start gap-3">
      <CheckboxInput />
      <CheckboxControl />
      <div class="grid gap-2">
        <CheckboxLabel>Accept terms and conditions</CheckboxLabel>
        <CheckboxDescription>
          By clicking this checkbox, you agree to the terms and conditions.
        </CheckboxDescription>
      </div>
    </Checkbox>
  )
}

export default CheckboxDemo

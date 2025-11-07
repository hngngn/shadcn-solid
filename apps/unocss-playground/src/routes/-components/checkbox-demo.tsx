import {
  Checkbox,
  CheckboxControl,
  CheckboxDescription,
  CheckboxLabel,
} from "@/registry/ui/checkbox"

const CheckboxDemo = () => {
  return (
    <div class="flex flex-col gap-6">
      <Checkbox class="flex items-start gap-3">
        <CheckboxControl />
        <div class="grid gap-2">
          <CheckboxLabel>Accept terms and conditions</CheckboxLabel>
        </div>
      </Checkbox>
      <Checkbox class="flex items-start gap-3" defaultChecked>
        <CheckboxControl />
        <div class="grid gap-2">
          <CheckboxLabel>Accept terms and conditions</CheckboxLabel>
          <CheckboxDescription>
            By clicking this checkbox, you agree to the terms and conditions.
          </CheckboxDescription>
        </div>
      </Checkbox>
      <Checkbox class="flex items-start gap-3" disabled>
        <CheckboxControl />
        <div class="grid gap-2">
          <CheckboxLabel>Enable notifications</CheckboxLabel>
        </div>
      </Checkbox>
    </div>
  )
}

export default CheckboxDemo

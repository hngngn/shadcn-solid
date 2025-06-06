import {
  Checkbox,
  CheckboxControl,
  CheckboxLabel,
} from "@repo/tailwindcss/ui/v4/checkbox"

const CheckboxDisabledDemo = () => {
  return (
    <Checkbox class="flex items-center gap-3" disabled>
      <CheckboxControl />
      <CheckboxLabel>Enable notifications</CheckboxLabel>
    </Checkbox>
  )
}

export default CheckboxDisabledDemo

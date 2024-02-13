import { Checkbox, CheckboxControl, CheckboxDescription, CheckboxLabel } from "../ui/checkbox";

const CheckboxWithTextDemo = () => {
  return (
    <Checkbox class="flex items-start space-x-2">
      <CheckboxControl />
      <div class="grid gap-1.5 leading-none">
        <CheckboxLabel class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Accept terms and conditions
        </CheckboxLabel>
        <CheckboxDescription class="text-sm text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
        </CheckboxDescription>
      </div>
    </Checkbox>
  );
};

export default CheckboxWithTextDemo;

import { Show, createSignal } from "solid-js";
import { OTPField, OTPFieldGroup, OTPFieldInput, OTPFieldSlot } from "../ui/otp-field";

const OtpFieldWithControlledDemo = () => {
  const [value, setValue] = createSignal<string>();

  return (
    <div class="flex flex-col items-center gap-2">
      <OTPField maxLength={6} value={value()} onValueChange={setValue}>
        <OTPFieldInput noScriptCSSFallback={null} />
        <OTPFieldGroup>
          <OTPFieldSlot index={0} />
          <OTPFieldSlot index={1} />
          <OTPFieldSlot index={2} />
          <OTPFieldSlot index={3} />
          <OTPFieldSlot index={4} />
          <OTPFieldSlot index={5} />
        </OTPFieldGroup>
      </OTPField>
      <span class="text-center text-sm">
        <Show fallback="Enter your one-time password." when={value()}>
          You entered: {value()}
        </Show>
      </span>
    </div>
  );
};

export default OtpFieldWithControlledDemo;

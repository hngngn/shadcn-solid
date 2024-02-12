import { cn } from "@/lib/cn"
import { Checkbox as CheckboxPrimitive } from "@kobalte/core"
import { splitProps, type ParentComponent } from "solid-js"

export const CheckboxLabel = CheckboxPrimitive.Label
export const CheckboxInput = CheckboxPrimitive.Input
export const Checkbox = CheckboxPrimitive.Root
export const CheckboxErrorMessage = CheckboxPrimitive.ErrorMessage
export const CheckboxDescription = CheckboxPrimitive.Description

export const CheckboxControl: ParentComponent<
  CheckboxPrimitive.CheckboxControlProps
> = (props) => {
  const [local, rest] = splitProps(props, ["class", "children"])

  return (
    <CheckboxPrimitive.Control
      class={cn(
        "border-primary focus-visible:ring-ring data-[checked]:text-primary-foreground data-[checked]:bg-primary h-4 w-4 shrink-0 rounded-sm border shadow focus-visible:outline-none focus-visible:ring data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        local.class
      )}
      {...rest}
    >
      <CheckboxPrimitive.Indicator class="flex items-center justify-center text-current">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="h-4 w-4"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m5 12l5 5L20 7"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Control>
  )
}

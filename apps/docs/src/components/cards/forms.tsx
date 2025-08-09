import { For } from "solid-js"

import { Button } from "@repo/tailwindcss/ui/v4/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/tailwindcss/ui/v4/card"
import {
  Checkbox,
  CheckboxControl,
  CheckboxLabel,
} from "@repo/tailwindcss/ui/v4/checkbox"
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemIndicator,
  RadioGroupItemLabel,
  RadioGroupItems,
  RadioGroupLabel,
} from "@repo/tailwindcss/ui/v4/radio-group"
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
  TextFieldTextArea,
} from "@repo/tailwindcss/ui/v4/text-field"

const plans = [
  {
    id: "starter",
    name: "Starter Plan",
    description: "Perfect for small businesses.",
    price: "$10",
  },
  {
    id: "pro",
    name: "Pro Plan",
    description: "More features and storage.",
    price: "$20",
  },
] as const

const CardsForms = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle class="text-lg">Upgrade your subscription</CardTitle>
        <CardDescription class="text-balance">
          You are currently on the free plan. Upgrade to the pro plan to get
          access to all features.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-3 md:flex-row">
            <TextField>
              <TextFieldLabel>Name</TextFieldLabel>
              <TextFieldInput placeholder="Evil Rabbit" class="w-full" />
            </TextField>
            <TextField>
              <TextFieldLabel>Email</TextFieldLabel>
              <TextFieldInput placeholder="example@acme.com" class="w-full" />
            </TextField>
          </div>
          <TextField class="flex flex-col gap-2">
            <TextFieldLabel>Card Number</TextFieldLabel>
            <div class="grid grid-cols-2 gap-3 md:grid-cols-[1fr_80px_60px]">
              <TextFieldInput
                placeholder="1234 1234 1234 1234"
                class="w-full"
              />
              <TextFieldInput placeholder="MM/YY" class="w-full" />
              <TextFieldInput placeholder="CVC" class="w-full" />
            </div>
          </TextField>
          <fieldset>
            <RadioGroup defaultValue="starter" class="gap-3">
              <div class="flex flex-col gap-0">
                <RadioGroupLabel class="text-sm font-medium">
                  Plan
                </RadioGroupLabel>
                <RadioGroupDescription class="text-muted-foreground text-sm">
                  Select the plan that best fits your needs.
                </RadioGroupDescription>
              </div>
              <RadioGroupItems>
                <For each={plans}>
                  {(plan) => (
                    <RadioGroupItem
                      value={plan.id}
                      class="data-[checked]:border-ring data-[checked]:bg-input/20 grid grid-cols-[auto_1fr] items-start gap-3 rounded-lg border p-3"
                    >
                      <RadioGroupItemControl class="data-[checked]:border-primary mt-0.5">
                        <RadioGroupItemIndicator />
                      </RadioGroupItemControl>
                      <RadioGroupItemLabel class="grid gap-1 font-normal">
                        <div class="font-medium">{plan.name}</div>
                        <div class="text-muted-foreground text-xs leading-snug text-balance">
                          {plan.description}
                        </div>
                      </RadioGroupItemLabel>
                    </RadioGroupItem>
                  )}
                </For>
              </RadioGroupItems>
            </RadioGroup>
          </fieldset>
          <div class="flex flex-col gap-2">
            <TextField>
              <TextFieldLabel>Notes</TextFieldLabel>
              <TextFieldTextArea placeholder="Enter notes" class="w-full" />
            </TextField>
          </div>
          <div class="flex flex-col gap-3">
            <Checkbox class="flex items-center gap-2">
              <CheckboxControl />
              <CheckboxLabel>I agree to the terms and conditions</CheckboxLabel>
            </Checkbox>
            <Checkbox defaultChecked class="flex items-start gap-2">
              <CheckboxControl />
              <CheckboxLabel>Allow us to send you emails</CheckboxLabel>
            </Checkbox>
          </div>
        </div>
      </CardContent>
      <CardFooter class="flex justify-between">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Upgrade Plan</Button>
      </CardFooter>
    </Card>
  )
}

export default CardsForms

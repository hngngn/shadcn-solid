import { For } from "solid-js"
import { createForm } from "@tanstack/solid-form"
import { useRadioGroupContext } from "@kobalte/core/radio-group"
import { toast } from "somoto"
import * as v from "valibot"

import { Button } from "@/registry/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/ui/card"
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupItem,
  RadioGroupItemControl,
  RadioGroupItemIndicator,
  RadioGroupItemInput,
  RadioGroupItemLabel,
  RadioGroupItems,
} from "@/registry/ui/radio-group"
import {
  TextField,
  TextFieldDescription,
  TextFieldErrorMessage,
  TextFieldLabel,
} from "@/registry/ui/text-field"

const plans = [
  {
    id: "starter",
    title: "Starter (100K tokens/month)",
    description: "For everyday use with basic features.",
  },
  {
    id: "pro",
    title: "Pro (1M tokens/month)",
    description: "For advanced AI usage with more features.",
  },
  {
    id: "enterprise",
    title: "Enterprise (Unlimited tokens)",
    description: "For large teams and heavy usage.",
  },
]

const formSchema = v.object({
  plan: v.pipe(
    v.string(),
    v.minLength(1, "You must select a subscription plan to continue."),
  ),
})

type formSchemaType = v.InferInput<typeof formSchema>

const TanstackFormRadioGroupDemo = () => {
  const form = createForm(() => ({
    defaultValues: {
      plan: "",
    } as formSchemaType,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: (props) => {
      toast("You submitted the following values:", {
        description: (
          <pre class="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
            <code>{JSON.stringify(props.value, null, 2)}</code>
          </pre>
        ),
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        },
      })
    },
  }))

  return (
    <Card class="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Subscription Plan</CardTitle>
        <CardDescription>
          See pricing and features for each plan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-tanstack-radio-group"
          onSubmit={(e) => {
            e.preventDefault()
            void form.handleSubmit()
          }}
          class="flex w-full flex-col gap-7"
        >
          <form.Field name="plan">
            {(field) => (
              <TextField
                validationState={
                  field().state.meta.isTouched && !field().state.meta.isValid
                    ? "invalid"
                    : "valid"
                }
              >
                <TextFieldLabel>Plan</TextFieldLabel>
                <TextFieldDescription>
                  You can upgrade or downgrade your plan at any time.
                </TextFieldDescription>
                <RadioGroup
                  validationState={
                    field().state.meta.isTouched && !field().state.meta.isValid
                      ? "invalid"
                      : "valid"
                  }
                  name={field().name}
                  value={field().state.value}
                  onChange={field().handleChange}
                >
                  <RadioGroupItems class="flex-col">
                    <For each={plans}>
                      {(plan) => {
                        const context = useRadioGroupContext()

                        return (
                          <RadioGroupItem
                            value={plan.id}
                            class="data-checked:border-primary data-checked:bg-primary/5 flex justify-between rounded-md border p-4 transition-colors"
                            onClick={() => {
                              context.setSelectedValue(plan.id)
                            }}
                          >
                            <RadioGroupItemInput />
                            <div class="flex flex-col gap-3">
                              <RadioGroupItemLabel>
                                {plan.title}
                              </RadioGroupItemLabel>
                              <RadioGroupDescription>
                                {plan.description}
                              </RadioGroupDescription>
                            </div>
                            <RadioGroupItemControl class="self-start">
                              <RadioGroupItemIndicator />
                            </RadioGroupItemControl>
                          </RadioGroupItem>
                        )
                      }}
                    </For>
                  </RadioGroupItems>
                </RadioGroup>
                <TextFieldErrorMessage errors={field().state.meta.errors} />
              </TextField>
            )}
          </form.Field>
        </form>
      </CardContent>
      <CardFooter>
        <div class="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset()
            }}
          >
            Reset
          </Button>
          <Button type="submit" form="form-tanstack-radio-group">
            Save
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default TanstackFormRadioGroupDemo

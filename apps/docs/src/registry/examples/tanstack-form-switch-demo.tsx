import { createForm } from "@tanstack/solid-form"
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
  TextField,
  TextFieldDescription,
  TextFieldErrorMessage,
  TextFieldLabel,
} from "@/registry/ui/text-field"

import { Switch, SwitchControl, SwitchInput, SwitchThumb } from "../ui/switch"

const formSchema = v.object({
  twoFactor: v.pipe(
    v.boolean(),
    v.check(
      (val) => val,
      "It is highly recommended to enable two-factor authentication.",
    ),
  ),
})

type formSchemaType = v.InferInput<typeof formSchema>

const TanstackFormSwitchDemo = () => {
  const form = createForm(() => ({
    defaultValues: {
      twoFactor: false,
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
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>
          Manage your account security preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-tanstack-switch"
          onSubmit={(e) => {
            e.preventDefault()
            void form.handleSubmit()
          }}
          class="flex w-full flex-col gap-7"
        >
          <form.Field name="twoFactor">
            {(field) => (
              <div class="flex gap-3">
                <TextField
                  validationState={
                    field().state.meta.isTouched && !field().state.meta.isValid
                      ? "invalid"
                      : "valid"
                  }
                >
                  <TextFieldLabel>Multi-factor authentication</TextFieldLabel>
                  <TextFieldDescription>
                    Enable multi-factor authentication to secure your account.
                  </TextFieldDescription>
                  <TextFieldErrorMessage errors={field().state.meta.errors} />
                </TextField>
                <Switch
                  class="flex items-center gap-x-2 self-start"
                  name={field().name}
                  checked={field().state.value}
                  onChange={field().handleChange}
                >
                  <SwitchInput />
                  <SwitchControl>
                    <SwitchThumb />
                  </SwitchControl>
                </Switch>
              </div>
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
          <Button type="submit" form="form-tanstack-switch">
            Save
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default TanstackFormSwitchDemo

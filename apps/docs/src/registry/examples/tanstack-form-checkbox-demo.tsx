import { For } from "solid-js"
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
  Checkbox,
  CheckboxControl,
  CheckboxInput,
  CheckboxLabel,
} from "@/registry/ui/checkbox"
import { Separator } from "@/registry/ui/separator"
import {
  TextField,
  TextFieldDescription,
  TextFieldErrorMessage,
  TextFieldLabel,
} from "@/registry/ui/text-field"

const tasks = [
  {
    id: "push",
    label: "Push notifications",
  },
  {
    id: "email",
    label: "Email notifications",
  },
] as const

const formSchema = v.object({
  responses: v.boolean(),
  tasks: v.pipe(
    v.array(v.string()),
    v.minLength(1, "Please select at least one notification type."),
    v.check(
      (value) => value.every((task) => tasks.some((t) => t.id === task)),
      "Invalid notification type selected.",
    ),
  ),
})

type formSchemaType = v.InferInput<typeof formSchema>

const TanstackFormCheckboxDemo = () => {
  const form = createForm(() => ({
    defaultValues: {
      responses: true,
      tasks: [] as string[],
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
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Manage your notification preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-tanstack-checkbox"
          onSubmit={(e) => {
            e.preventDefault()
            void form.handleSubmit()
          }}
          class="flex w-full flex-col gap-7"
        >
          <form.Field name="responses">
            {(field) => (
              <TextField
                validationState={
                  field().state.meta.isTouched && !field().state.meta.isValid
                    ? "invalid"
                    : "valid"
                }
              >
                <TextFieldLabel>Responses</TextFieldLabel>
                <TextFieldDescription>
                  Get notified for requests that take time, like research or
                  image generation.
                </TextFieldDescription>
                <TextFieldErrorMessage errors={field().state.meta.errors} />
                <Checkbox
                  class="flex items-start gap-3"
                  name={field().name}
                  checked={field().state.value}
                  onChange={field().handleChange}
                  disabled
                >
                  <CheckboxInput />
                  <CheckboxControl />
                  <div class="grid gap-2">
                    <CheckboxLabel>Push notifications</CheckboxLabel>
                  </div>
                </Checkbox>
              </TextField>
            )}
          </form.Field>
          <Separator />
          <form.Field name="tasks">
            {(field) => (
              <TextField
                validationState={
                  field().state.meta.isTouched && !field().state.meta.isValid
                    ? "invalid"
                    : "valid"
                }
              >
                <TextFieldLabel>Tasks</TextFieldLabel>
                <TextFieldDescription>
                  Get notified when tasks you&apos;ve created have updates.
                </TextFieldDescription>
                <div class="flex flex-col gap-3">
                  <For each={tasks}>
                    {(task) => (
                      <Checkbox
                        validationState={
                          field().state.meta.isTouched &&
                          !field().state.meta.isValid
                            ? "invalid"
                            : "valid"
                        }
                        name={field().name}
                        checked={field().state.value.includes(task.id)}
                        onChange={(checked) => {
                          if (checked) {
                            field().pushValue(task.id)
                          } else {
                            const index = field().state.value.indexOf(task.id)
                            if (index > -1) {
                              field().removeValue(index)
                            }
                          }
                        }}
                        class="flex items-start gap-3"
                      >
                        <CheckboxInput />
                        <CheckboxControl />
                        <div class="grid gap-2">
                          <CheckboxLabel>{task.label}</CheckboxLabel>
                        </div>
                      </Checkbox>
                    )}
                  </For>
                </div>
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
          <Button type="submit" form="form-tanstack-checkbox">
            Save
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default TanstackFormCheckboxDemo

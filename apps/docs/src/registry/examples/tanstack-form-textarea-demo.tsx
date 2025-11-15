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
  TextFieldTextArea,
} from "@/registry/ui/text-field"

const formSchema = v.object({
  about: v.pipe(
    v.string(),
    v.minLength(10, "Please provide at least 10 characters."),
    v.maxLength(200, "Please keep it under 200 characters."),
  ),
})

type formSchemaType = v.InferInput<typeof formSchema>

const TanstackFormTextAreaDemo = () => {
  const form = createForm(() => ({
    defaultValues: {
      about: "",
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
        <CardTitle>Personalization</CardTitle>
        <CardDescription>
          Customize your experience by telling us more about yourself.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-tanstack-textarea"
          onSubmit={(e) => {
            e.preventDefault()
            void form.handleSubmit()
          }}
          class="flex w-full flex-col gap-7"
        >
          <form.Field name="about">
            {(field) => (
              <TextField
                validationState={
                  field().state.meta.isTouched && !field().state.meta.isValid
                    ? "invalid"
                    : "valid"
                }
                name={field().name}
                value={field().state.value}
                onBlur={field().handleBlur}
                onChange={field().handleChange}
              >
                <TextFieldLabel>Username</TextFieldLabel>
                <TextFieldTextArea
                  placeholder="I'm a software engineer..."
                  class="min-h-[120px]"
                />
                <TextFieldDescription>
                  Tell us more about yourself. This will be used to help us
                  personalize your experience.
                </TextFieldDescription>
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
          <Button type="submit" form="form-tanstack-textarea">
            Save
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default TanstackFormTextAreaDemo

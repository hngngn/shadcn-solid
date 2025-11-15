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
  TextFieldInput,
  TextFieldLabel,
} from "@/registry/ui/text-field"

const formSchema = v.object({
  username: v.pipe(
    v.string(),
    v.minLength(3, "Username must be at least 3 characters."),
    v.maxLength(10, "Username must be at most 10 characters."),
    v.regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores.",
    ),
  ),
})

type formSchemaType = v.InferInput<typeof formSchema>

const TanstackFormInputDemo = () => {
  const form = createForm(() => ({
    defaultValues: {
      username: "",
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
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Update your profile information below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-tanstack-input"
          onSubmit={(e) => {
            e.preventDefault()
            void form.handleSubmit()
          }}
          class="flex w-full flex-col gap-7"
        >
          <form.Field name="username">
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
                <TextFieldInput placeholder="shadcn" autocomplete="username" />
                <TextFieldDescription>
                  This is your public display name. Must be between 3 and 10
                  characters. Must only contain letters, numbers, and
                  underscores.
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
          <Button type="submit" form="form-tanstack-input">
            Save
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default TanstackFormInputDemo

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
  HiddenSelect,
  Select,
  SelectContent,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select"
import {
  TextField,
  TextFieldDescription,
  TextFieldErrorMessage,
  TextFieldLabel,
} from "@/registry/ui/text-field"

const spokenLanguages = [
  { label: "Auto", value: "auto" },
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Italian", value: "it" },
  { label: "Chinese", value: "zh" },
  { label: "Japanese", value: "ja" },
]

const formSchema = v.object({
  language: v.pipe(
    v.string(),
    v.minLength(1, "Please select your spoken language."),
    v.check(
      (val) => val !== "auto",
      "Auto-detection is not allowed. Please select a specific language.",
    ),
  ),
})

type formSchemaType = v.InferInput<typeof formSchema>

const TanstackFormSelectDemo = () => {
  const form = createForm(() => ({
    defaultValues: {
      language: "",
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
    <Card class="w-full sm:max-w-lg">
      <CardHeader>
        <CardTitle>Language Preferences</CardTitle>
        <CardDescription>
          Select your preferred spoken language.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-tanstack-select"
          onSubmit={(e) => {
            e.preventDefault()
            void form.handleSubmit()
          }}
          class="flex w-full flex-col gap-7"
        >
          <form.Field name="language">
            {(field) => (
              <div class="flex gap-3">
                <TextField
                  validationState={
                    field().state.meta.isTouched && !field().state.meta.isValid
                      ? "invalid"
                      : "valid"
                  }
                >
                  <TextFieldLabel>Spoken Language</TextFieldLabel>
                  <TextFieldDescription>
                    For best results, select the language you speak.
                  </TextFieldDescription>
                  <TextFieldErrorMessage errors={field().state.meta.errors} />
                </TextField>
                <Select<(typeof spokenLanguages)[number]>
                  name={field().name}
                  value={{
                    label: field().state.value,
                    value: field().state.value,
                  }}
                  onChange={(e) => {
                    field().handleChange(e?.value ?? "")
                  }}
                  validationState={
                    field().state.meta.isTouched && !field().state.meta.isValid
                      ? "invalid"
                      : "valid"
                  }
                  options={spokenLanguages}
                  optionValue="value"
                  optionTextValue="label"
                  placeholder="Select"
                  itemComponent={(props) => (
                    <SelectItem item={props.item}>
                      {props.item.rawValue.label}
                    </SelectItem>
                  )}
                >
                  <HiddenSelect />
                  <SelectTrigger class="w-[120px]">
                    <SelectValue<(typeof spokenLanguages)[number]>>
                      {(state) => state.selectedOption().label}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectContent />
                  </SelectPortal>
                </Select>
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
          <Button type="submit" form="form-tanstack-select">
            Save
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default TanstackFormSelectDemo

import { For } from "solid-js"
import { Image } from "@kobalte/core/image"

import { Button } from "@repo/tailwindcss/ui/v4/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/tailwindcss/ui/v4/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  SelectValue,
} from "@repo/tailwindcss/ui/v4/select"
import { Separator } from "@repo/tailwindcss/ui/v4/separator"
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "@repo/tailwindcss/ui/v4/text-field"

const people = [
  {
    name: "Olivia Martin",
    email: "m@example.com",
    avatar: "/avatars/01.png",
  },
  {
    name: "Isabella Nguyen",
    email: "b@example.com",
    avatar: "/avatars/02.png",
  },
  {
    name: "Sofia Davis",
    email: "p@example.com",
    avatar: "/avatars/03.png",
  },
]

const CardsShare = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Share this document</CardTitle>
        <CardDescription>
          Anyone with the link can view this document.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TextField class="flex items-center gap-2">
          <TextFieldLabel class="sr-only">Link</TextFieldLabel>
          <TextFieldInput
            value="http://example.com/link/to/document"
            class="h-8 w-full"
            readOnly
          />
          <Button size="sm" variant="outline" class="shadow-none">
            Copy Link
          </Button>
        </TextField>
        <Separator class="my-4" />
        <div class="flex flex-col gap-4">
          <div class="text-sm font-medium">People with access</div>
          <div class="grid gap-6">
            <For each={people}>
              {(person) => (
                <div class="flex items-center justify-between gap-4">
                  <div class="flex items-center gap-4">
                    <Image class="relative flex size-8 shrink-0 overflow-hidden rounded-full">
                      <Image.Img
                        class="aspect-square size-full"
                        src={person.avatar}
                        alt="Image"
                      />
                      <Image.Fallback class="bg-muted flex size-full items-center justify-center rounded-full">
                        {person.name.charAt(0)}
                      </Image.Fallback>
                    </Image>
                    <div>
                      <p class="text-sm leading-none font-medium">
                        {person.name}
                      </p>
                      <p class="text-muted-foreground text-sm">
                        {person.email}
                      </p>
                    </div>
                  </div>

                  <Select
                    defaultValue="Can edit"
                    options={["Can edit", "Can view"]}
                    placeholder="Select"
                    itemComponent={(props) => (
                      <SelectItem item={props.item}>
                        {props.item.rawValue}
                      </SelectItem>
                    )}
                  >
                    <SelectTrigger
                      class="ml-auto pr-2"
                      size="sm"
                      aria-label="Edit"
                    >
                      <SelectValue<string>>
                        {(state) => state.selectedOption()}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectContent />
                    </SelectPortal>
                  </Select>
                </div>
              )}
            </For>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CardsShare

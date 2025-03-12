import { Image } from "@kobalte/core/image"

import { Button } from "@/registry/tailwindcss/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/tailwindcss/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/tailwindcss/ui/select"
import { Separator } from "@/registry/tailwindcss/ui/separator"
import {
  TextField,
  TextFieldLabel,
  TextFieldRoot,
} from "@/registry/tailwindcss/ui/textfield"

export const DemoShareDocument = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Share this document</CardTitle>
        <CardDescription>
          Anyone with the link can view this document.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex space-x-2">
          <TextFieldRoot class="w-full space-y-0">
            <TextFieldLabel class="sr-only">Link</TextFieldLabel>
            <TextField value="http://example.com/link/to/document" readOnly />
          </TextFieldRoot>
          <Button variant="secondary" class="shrink-0">
            Copy Link
          </Button>
        </div>
        <Separator class="my-4" />
        <div class="space-y-4">
          <h4 class="text-sm font-medium">People with access</h4>
          <div class="grid gap-6">
            <div class="flex items-center justify-between space-x-4">
              <div class="flex items-center space-x-4">
                <Image class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <Image.Img
                    src="/avatars/03.png"
                    alt="Olivia Martin"
                    class="aspect-square size-full"
                  />
                  <Image.Fallback class="bg-muted flex h-full w-full items-center justify-center rounded-full">
                    OM
                  </Image.Fallback>
                </Image>
                <div>
                  <p class="text-sm font-medium leading-none">Olivia Martin</p>
                  <p class="text-muted-foreground text-sm">m@example.com</p>
                </div>
              </div>
              <Select
                options={["Can edit", "Can view"]}
                itemComponent={(props) => (
                  <SelectItem item={props.item}>
                    {props.item.rawValue}
                  </SelectItem>
                )}
                defaultValue="Can edit"
              >
                <SelectTrigger class="w-[110px]">
                  <SelectValue<string>>
                    {(state) => state.selectedOption()}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent />
              </Select>
            </div>
            <div class="flex items-center justify-between space-x-4">
              <div class="flex items-center space-x-4">
                <Image class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <Image.Img
                    src="/avatars/03.png"
                    alt="Isabella Nguyen"
                    class="aspect-square size-full"
                  />
                  <Image.Fallback class="bg-muted flex h-full w-full items-center justify-center rounded-full">
                    IN
                  </Image.Fallback>
                </Image>
                <div>
                  <p class="text-sm font-medium leading-none">
                    Isabella Nguyen
                  </p>
                  <p class="text-muted-foreground text-sm">b@example.com</p>
                </div>
              </div>
              <Select
                options={["Can edit", "Can view"]}
                itemComponent={(props) => (
                  <SelectItem item={props.item}>
                    {props.item.rawValue}
                  </SelectItem>
                )}
                defaultValue="Can edit"
              >
                <SelectTrigger class="w-[110px]">
                  <SelectValue<string>>
                    {(state) => state.selectedOption()}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent />
              </Select>
            </div>
            <div class="flex items-center justify-between space-x-4">
              <div class="flex items-center space-x-4">
                <Image class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <Image.Img
                    src="/avatars/01.png"
                    alt="Sofia Davis"
                    class="aspect-square size-full"
                  />
                  <Image.Fallback class="bg-muted flex h-full w-full items-center justify-center rounded-full">
                    SD
                  </Image.Fallback>
                </Image>
                <div>
                  <p class="text-sm font-medium leading-none">Sofia Davis</p>
                  <p class="text-muted-foreground text-sm">p@example.com</p>
                </div>
              </div>
              <Select
                options={["Can edit", "Can view"]}
                itemComponent={(props) => (
                  <SelectItem item={props.item}>
                    {props.item.rawValue}
                  </SelectItem>
                )}
                defaultValue="Can edit"
              >
                <SelectTrigger class="w-[110px]">
                  <SelectValue<string>>
                    {(state) => state.selectedOption()}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent />
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

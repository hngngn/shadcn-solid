import { As } from "@kobalte/core"
import { Button } from "../ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover"
import { TextField, TextFieldInput, TextFieldLabel } from "../ui/textfield"

const PopoverDemo = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <As component={Button} variant="outline">
          Open popover
        </As>
      </PopoverTrigger>
      <PopoverContent class="w-80">
        <div class="grid gap-4">
          <PopoverTitle class="space-y-2">
            <h4 class="font-medium leading-none">Dimensions</h4>
            <p class="text-muted-foreground text-sm">
              Set the dimensions for the layer.
            </p>
          </PopoverTitle>
          <PopoverDescription class="grid gap-2">
            <TextField class="grid grid-cols-3 items-center gap-4">
              <TextFieldLabel class="text-right">Width</TextFieldLabel>
              <TextFieldInput value="100%" class="col-span-2 h-8" />
            </TextField>
            <TextField class="grid grid-cols-3 items-center gap-4">
              <TextFieldLabel class="text-right">Max. width</TextFieldLabel>
              <TextFieldInput value="300px" class="col-span-2 h-8" />
            </TextField>
            <TextField class="grid grid-cols-3 items-center gap-4">
              <TextFieldLabel class="text-right">Height</TextFieldLabel>
              <TextFieldInput value="25px" class="col-span-2 h-8" />
            </TextField>
            <TextField class="grid grid-cols-3 items-center gap-4">
              <TextFieldLabel class="text-right">Max. height</TextFieldLabel>
              <TextFieldInput value="none" class="col-span-2 h-8" />
            </TextField>
          </PopoverDescription>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default PopoverDemo

import type { PopoverTriggerProps } from "@kobalte/core/popover"

import { Button } from "@/registry/tailwindcss/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/registry/tailwindcss/ui/popover"
import {
  TextField,
  TextFieldLabel,
  TextFieldRoot,
} from "@/registry/tailwindcss/ui/textfield"

const PopoverDemo = () => {
  return (
    <Popover>
      <PopoverTrigger
        as={(props: PopoverTriggerProps) => (
          <Button variant="outline" {...props}>
            Open popover
          </Button>
        )}
      />
      <PopoverContent class="w-80">
        <div class="grid gap-4">
          <PopoverTitle class="space-y-2">
            <h4 class="font-medium leading-none">Dimensions</h4>
            <p class="text-muted-foreground text-sm">
              Set the dimensions for the layer.
            </p>
          </PopoverTitle>
          <PopoverDescription class="grid gap-2">
            <TextFieldRoot class="grid grid-cols-3 items-center gap-4">
              <TextFieldLabel class="text-right">Width</TextFieldLabel>
              <TextField value="100%" class="col-span-2 h-8" />
            </TextFieldRoot>
            <TextFieldRoot class="grid grid-cols-3 items-center gap-4">
              <TextFieldLabel class="text-right">Max. width</TextFieldLabel>
              <TextField value="300px" class="col-span-2 h-8" />
            </TextFieldRoot>
            <TextFieldRoot class="grid grid-cols-3 items-center gap-4">
              <TextFieldLabel class="text-right">Height</TextFieldLabel>
              <TextField value="25px" class="col-span-2 h-8" />
            </TextFieldRoot>
            <TextFieldRoot class="grid grid-cols-3 items-center gap-4">
              <TextFieldLabel class="text-right">Max. height</TextFieldLabel>
              <TextField value="none" class="col-span-2 h-8" />
            </TextFieldRoot>
          </PopoverDescription>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default PopoverDemo

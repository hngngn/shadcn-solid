import { Button } from "@/registry/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "@/registry/ui/popover"
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "@/registry/ui/text-field"

const PopoverDemo = () => {
  return (
    <Popover>
      <PopoverTrigger<typeof Button>
        as={(props) => (
          <Button variant="outline" {...props}>
            Open popover
          </Button>
        )}
      />
      <PopoverPortal>
        <PopoverContent class="w-80">
          <div class="grid gap-4">
            <div class="space-y-2">
              <h4 class="font-medium leading-none">Dimensions</h4>
              <p class="text-muted-foreground text-sm">
                Set the dimensions for the layer.
              </p>
            </div>
            <div class="grid gap-2">
              <TextField
                defaultValue="100%"
                class="grid grid-cols-3 items-center gap-4"
              >
                <TextFieldLabel>Width</TextFieldLabel>
                <TextFieldInput class="col-span-2 h-8" />
              </TextField>
              <TextField
                defaultValue="300px"
                class="grid grid-cols-3 items-center gap-4"
              >
                <TextFieldLabel>Max. width</TextFieldLabel>
                <TextFieldInput class="col-span-2 h-8" />
              </TextField>
              <TextField
                defaultValue="25px"
                class="grid grid-cols-3 items-center gap-4"
              >
                <TextFieldLabel>Height</TextFieldLabel>
                <TextFieldInput class="col-span-2 h-8" />
              </TextField>
              <TextField
                defaultValue="none"
                class="grid grid-cols-3 items-center gap-4"
              >
                <TextFieldLabel>Max. height</TextFieldLabel>
                <TextFieldInput class="col-span-2 h-8" />
              </TextField>
            </div>
          </div>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  )
}

export default PopoverDemo

import type { DialogTriggerProps } from "@kobalte/core/dialog"

import { Button } from "@/registry/tailwindcss/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/tailwindcss/ui/dialog"
import {
  TextField,
  TextFieldLabel,
  TextFieldRoot,
} from "@/registry/tailwindcss/ui/textfield"

const DialogDemo = () => {
  return (
    <Dialog>
      <DialogTrigger
        as={(props: DialogTriggerProps) => (
          <Button variant="outline" {...props}>
            Edit Profile
          </Button>
        )}
      />
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <TextFieldRoot class="grid grid-cols-3 items-center gap-4 md:grid-cols-4">
            <TextFieldLabel class="text-right">Name</TextFieldLabel>
            <TextField class="col-span-2 md:col-span-3" />
          </TextFieldRoot>
          <TextFieldRoot class="grid grid-cols-3 items-center gap-4 md:grid-cols-4">
            <TextFieldLabel class="text-right">Username</TextFieldLabel>
            <TextField class="col-span-2 md:col-span-3" />
          </TextFieldRoot>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogDemo

import { As } from "@kobalte/core";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../ui/sheet";
import { TextField, TextFieldInput, TextFieldLabel } from "../ui/textfield";

const SheetDemo = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <As component={Button} variant="outline">
          Open
        </As>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div class="grid gap-4 py-4">
          <TextField class="grid grid-cols-3 items-center gap-4 md:grid-cols-4">
            <TextFieldLabel class="text-right">Name</TextFieldLabel>
            <TextFieldInput class="col-span-2 md:col-span-3" />
          </TextField>
          <TextField class="grid grid-cols-3 items-center gap-4 md:grid-cols-4">
            <TextFieldLabel class="text-right">Username</TextFieldLabel>
            <TextFieldInput class="col-span-2 md:col-span-3" />
          </TextField>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SheetDemo;

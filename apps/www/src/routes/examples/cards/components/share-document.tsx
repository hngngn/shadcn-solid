import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/registry/default/ui/card";
import { Image, ImageFallback, ImageRoot } from "@/registry/default/ui/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/registry/default/ui/select";
import { Separator } from "@/registry/default/ui/separator";
import { TextField, TextFieldInput, TextFieldLabel } from "@/registry/default/ui/textfield";

export const DemoShareDocument = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Share this document</CardTitle>
        <CardDescription>Anyone with the link can view this document.</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex space-x-2">
          <TextField class="w-full space-y-0">
            <TextFieldLabel class="sr-only">Link</TextFieldLabel>
            <TextFieldInput value="http://example.com/link/to/document" readOnly />
          </TextField>
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
                <ImageRoot>
                  <Image src="/avatars/03.png" alt="Olivia Martin" />
                  <ImageFallback>OM</ImageFallback>
                </ImageRoot>
                <div>
                  <p class="text-sm font-medium leading-none">Olivia Martin</p>
                  <p class="text-sm text-muted-foreground">m@example.com</p>
                </div>
              </div>
              <Select
                options={["Can edit", "Can view"]}
                itemComponent={props => (
                  <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
                )}
                defaultValue="Can edit"
              >
                <SelectTrigger class="w-[110px]">
                  <SelectValue<string>>{state => state.selectedOption()}</SelectValue>
                </SelectTrigger>
                <SelectContent />
              </Select>
            </div>
            <div class="flex items-center justify-between space-x-4">
              <div class="flex items-center space-x-4">
                <ImageRoot>
                  <Image src="/avatars/03.png" alt="Isabella Nguye" />
                  <ImageFallback>IN</ImageFallback>
                </ImageRoot>
                <div>
                  <p class="text-sm font-medium leading-none">Isabella Nguyen</p>
                  <p class="text-sm text-muted-foreground">b@example.com</p>
                </div>
              </div>
              <Select
                options={["Can edit", "Can view"]}
                itemComponent={props => (
                  <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
                )}
                defaultValue="Can edit"
              >
                <SelectTrigger class="w-[110px]">
                  <SelectValue<string>>{state => state.selectedOption()}</SelectValue>
                </SelectTrigger>
                <SelectContent />
              </Select>
            </div>
            <div class="flex items-center justify-between space-x-4">
              <div class="flex items-center space-x-4">
                <ImageRoot>
                  <Image src="/avatars/01.png" alt="Sofia Davis" />
                  <ImageFallback>SD</ImageFallback>
                </ImageRoot>
                <div>
                  <p class="text-sm font-medium leading-none">Sofia Davis</p>
                  <p class="text-sm text-muted-foreground">p@example.com</p>
                </div>
              </div>
              <Select
                options={["Can edit", "Can view"]}
                itemComponent={props => (
                  <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
                )}
                defaultValue="Can edit"
              >
                <SelectTrigger class="w-[110px]">
                  <SelectValue<string>>{state => state.selectedOption()}</SelectValue>
                </SelectTrigger>
                <SelectContent />
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

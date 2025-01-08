import { Button } from "@/registry/tailwindcss/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { TextArea } from "@/registry/tailwindcss/ui/textarea"
import {
  TextField,
  TextFieldLabel,
  TextFieldRoot,
} from "@/registry/tailwindcss/ui/textfield"

export const DemoReportAnIssue = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Report an issue</CardTitle>
        <CardDescription>
          What area are you having problems with?
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-6">
        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-2">
            <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Area
            </label>
            <Select
              options={["Team", "Billing", "Account"]}
              placeholder="Area"
              itemComponent={(props) => (
                <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
              )}
              defaultValue="Billing"
            >
              <SelectTrigger>
                <SelectValue<string>>
                  {(state) => state.selectedOption()}
                </SelectValue>
              </SelectTrigger>
              <SelectContent />
            </Select>
          </div>
          <div class="grid gap-2">
            <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Security Level
            </label>
            <Select
              options={[
                "Severity 1 (Highest)",
                "Severity 2",
                "Severity 3",
                "Severity 4 (Lowest)",
              ]}
              placeholder="Security Level"
              itemComponent={(props) => (
                <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
              )}
              defaultValue="Severity 2"
            >
              <SelectTrigger>
                <SelectValue<string>>
                  {(state) => state.selectedOption()}
                </SelectValue>
              </SelectTrigger>
              <SelectContent />
            </Select>
          </div>
        </div>
        <div class="grid gap-2">
          <TextFieldRoot>
            <TextFieldLabel>Subject</TextFieldLabel>
            <TextField placeholder="I need help with..." />
          </TextFieldRoot>
        </div>
        <div class="grid gap-2">
          <TextFieldRoot>
            <TextFieldLabel>Description</TextFieldLabel>
            <TextArea placeholder="Please include all information relevant to your issue." />
          </TextFieldRoot>
        </div>
      </CardContent>
      <CardFooter class="justify-between space-x-2">
        <Button variant="ghost">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  )
}

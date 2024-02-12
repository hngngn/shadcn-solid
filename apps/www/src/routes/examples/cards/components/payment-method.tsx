import { Button } from "@/registry/default/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card"
import { RadioGroup, RadioGroupItem } from "@/registry/default/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select"
import { TextField, TextFieldInput } from "@/registry/default/ui/textfield"

export const DemoPaymentMethod = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>
          Add a new payment method to your account.
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-6">
        <RadioGroup defaultValue="card" class="grid grid-cols-3 gap-4">
          <div>
            <RadioGroupItem value="card" id="card" class="peer sr-only" />
            <label class="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="mb-3 h-6 w-6"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
              Card
            </label>
          </div>
          <div>
            <RadioGroupItem value="paypal" id="paypal" class="peer sr-only" />
            <label
              class="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md
						border-2 p-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mb-3 h-6 w-6"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M0 0h24v24H0z" />
                  <path
                    fill="currentColor"
                    d="M12.5 2c3.113 0 5.309 1.785 5.863 4.565C20.088 7.75 21 9.717 21 12c0 2.933-2.748 5.384-5.783 5.496L15 17.5h-1.754l-.466 2.8a1.998 1.998 0 0 1-1.823 1.597l-.157.003H8.12a1.5 1.5 0 0 1-1.182-.54a1.495 1.495 0 0 1-.348-1.07l.042-.29H5c-1.004 0-1.914-.864-1.994-1.857L3 18l.01-.141L5.003 3.905l.003-.048c.072-.894.815-1.682 1.695-1.832l.156-.02L7 2zm5.812 7.35l-.024.087c-.706 2.403-3.072 4.436-5.555 4.557L12.5 14H9.997v.05l-.025.183l-1.2 5a1.007 1.007 0 0 1-.019.07l-.088.597h2.154l.595-3.564a1 1 0 0 1 .865-.829l.121-.007H15c2.073 0 4-1.67 4-3.5c0-1.022-.236-1.924-.688-2.65"
                  />
                </g>
              </svg>
              Paypal
            </label>
          </div>
          <div>
            <RadioGroupItem value="apple" id="apple" class="peer sr-only" />
            <label class="border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary flex flex-col items-center justify-between rounded-md border-2 p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mb-3 h-6 w-6"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M0 0h24v24H0z" />
                  <path
                    fill="currentColor"
                    d="m15.079 5.999l.239.012c1.43.097 3.434 1.013 4.508 2.586a1 1 0 0 1-.344 1.44c-.05.028-.372.158-.497.217a4.15 4.15 0 0 0-.722.431c-.614.461-.948 1.009-.942 1.694c.01.885.339 1.454.907 1.846c.208.143.436.253.666.33c.126.043.426.116.444.122a1 1 0 0 1 .662.942C20 18.24 16.96 22 14.714 22c-.79 0-1.272-.091-1.983-.315l-.098-.031c-.463-.146-.702-.192-1.133-.192c-.52 0-.863.06-1.518.237l-.197.053c-.575.153-.964.226-1.5.248C5.536 22 3 16.907 3 12.928c0-3.87 1.786-6.92 5.286-6.92c.297 0 .598.045.909.128c.403.107.774.26 1.296.508c.787.374.948.44 1.009.44h.016c.03-.003.128-.047 1.056-.457c1.061-.467 1.864-.685 2.746-.616l-.24-.012zM14 1a1 1 0 0 1 1 1a3 3 0 0 1-3 3a1 1 0 0 1-1-1a3 3 0 0 1 3-3"
                  />
                </g>
              </svg>
              Apple
            </label>
          </div>
        </RadioGroup>
        <div class="grid gap-2">
          <label>Name</label>
          <TextField>
            <TextFieldInput placeholder="First Last" />
          </TextField>
        </div>
        <div class="grid gap-2">
          <label>Card number</label>
          <TextField>
            <TextFieldInput placeholder="" />
          </TextField>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div class="grid gap-2">
            <label>Expires</label>
            <Select
              options={[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "August",
                "September",
                "October",
                "November",
                "December",
              ]}
              placeholder="Month"
              itemComponent={(props) => (
                <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
              )}
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
            <label>Year</label>
            <Select
              options={Array.from({ length: 10 }).map(
                (_, i) => new Date().getFullYear() + i
              )}
              placeholder="Year"
              itemComponent={(props) => (
                <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
              )}
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
            <label>CVC</label>
            <TextField>
              <TextFieldInput id="cvc" placeholder="CVC" />
            </TextField>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full">Continue</Button>
      </CardFooter>
    </Card>
  )
}

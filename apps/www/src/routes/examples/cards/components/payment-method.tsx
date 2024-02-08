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
						<RadioGroupItem
							value="card"
							id="card"
							class="peer sr-only"
						/>
						<label class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
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
								<rect
									width="20"
									height="14"
									x="2"
									y="5"
									rx="2"
								/>
								<path d="M2 10h20" />
							</svg>
							Card
						</label>
					</div>
					<div>
						<RadioGroupItem
							value="paypal"
							id="paypal"
							class="peer sr-only"
						/>
						<label class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
							<span class="icon-[tabler--brand-paypal] mb-3 h-6 w-6" />
							Paypal
						</label>
					</div>
					<div>
						<RadioGroupItem
							value="apple"
							id="apple"
							class="peer sr-only"
						/>
						<label class="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
							<span class="icon-[tabler--brand-apple] mb-3 h-6 w-6" />
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
								<SelectItem item={props.item}>
									{props.item.rawValue}
								</SelectItem>
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
								<SelectItem item={props.item}>
									{props.item.rawValue}
								</SelectItem>
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

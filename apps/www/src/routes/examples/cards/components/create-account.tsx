import { Button } from "@/registry/default/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/default/ui/card"
import { TextField, TextFieldInput } from "@/registry/default/ui/textfield"

export const DemoCreateAccount = () => {
	return (
		<Card>
			<CardHeader class="space-y-1">
				<CardTitle class="text-2xl">Create an account</CardTitle>
				<CardDescription>
					Enter your email below to create your account
				</CardDescription>
			</CardHeader>
			<CardContent class="grid gap-4">
				<div class="grid grid-cols-2 gap-6">
					<Button variant="outline">
						<span class="icon-[tabler--brand-github] mr-2 h-4 w-4" />
						Github
					</Button>
					<Button variant="outline">
						<span class="icon-[tabler--brand-google] mr-2 h-4 w-4" />
						Google
					</Button>
				</div>
				<div class="relative">
					<div class="absolute inset-0 flex items-center">
						<span class="w-full border-t" />
					</div>
					<div class="relative flex justify-center text-xs uppercase">
						<span class="bg-background px-2 text-muted-foreground">
							Or continue with
						</span>
					</div>
				</div>
				<div class="grid gap-2">
					<label>Email</label>
					<TextField>
						<TextFieldInput
							type="email"
							placeholder="m@example.com"
						/>
					</TextField>
				</div>
				<div class="grid gap-2">
					<label>Password</label>
					<TextField>
						<TextFieldInput type="password" />
					</TextField>
				</div>
			</CardContent>
			<CardFooter>
				<Button class="w-full">Create account</Button>
			</CardFooter>
		</Card>
	)
}

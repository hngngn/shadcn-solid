import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	TextFieldInput,
	TextFieldLabel,
	TextFieldRoot,
} from "~/components"

export const TabsDemo = () => {
	return (
		<Tabs defaultValue="account" class="w-400px">
			<TabsList class="grid w-full grid-cols-2 justify-center items-center">
				<TabsTrigger value="account" class="w-full">
					Account
				</TabsTrigger>
				<TabsTrigger value="password" class="w-full">
					Password
				</TabsTrigger>
			</TabsList>
			<TabsContent value="account">
				<Card>
					<CardHeader>
						<CardTitle>Account</CardTitle>
						<CardDescription>
							Make changes to your account here. Click save when
							you're done.
						</CardDescription>
					</CardHeader>
					<CardContent class="space-y-4">
						<TextFieldRoot class="space-y-1">
							<TextFieldLabel>Name</TextFieldLabel>
							<TextFieldInput />
						</TextFieldRoot>
						<TextFieldRoot class="space-y-1">
							<TextFieldLabel>Username</TextFieldLabel>
							<TextFieldInput />
						</TextFieldRoot>
					</CardContent>
					<CardFooter>
						<Button>Save changes</Button>
					</CardFooter>
				</Card>
			</TabsContent>
			<TabsContent value="password">
				<Card>
					<CardHeader>
						<CardTitle>Password</CardTitle>
						<CardDescription>
							Change your password here. After saving, you'll be
							logged out.
						</CardDescription>
					</CardHeader>
					<CardContent class="space-y-4">
						<TextFieldRoot class="space-y-1">
							<TextFieldLabel>Current password</TextFieldLabel>
							<TextFieldInput />
						</TextFieldRoot>
						<TextFieldRoot class="space-y-1">
							<TextFieldLabel>New password</TextFieldLabel>
							<TextFieldInput />
						</TextFieldRoot>
					</CardContent>
					<CardFooter>
						<Button>Save password</Button>
					</CardFooter>
				</Card>
			</TabsContent>
		</Tabs>
	)
}

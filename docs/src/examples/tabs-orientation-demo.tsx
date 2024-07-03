import { Button } from "@repo/tailwindcss/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/tailwindcss/ui/card";
import {
	Tabs,
	TabsContent,
	TabsIndicator,
	TabsList,
	TabsTrigger,
} from "@repo/tailwindcss/ui/tabs";
import {
	TextField,
	TextFieldLabel,
	TextFieldRoot,
} from "@repo/tailwindcss/ui/textfield";

const TabsOrientationDemo = () => {
	return (
		<Tabs defaultValue="account" class="w-[500px]" orientation="vertical">
			<TabsList class="max-w-[200px]">
				<TabsTrigger value="account">Account</TabsTrigger>
				<TabsTrigger value="password">Password</TabsTrigger>
				<TabsIndicator />
			</TabsList>
			<TabsContent value="account">
				<Card>
					<CardHeader>
						<CardTitle>Account</CardTitle>
						<CardDescription>
							Make changes to your account here. Click save when you're done.
						</CardDescription>
					</CardHeader>
					<CardContent class="space-y-2">
						<TextFieldRoot class="space-y-1">
							<TextFieldLabel>Name</TextFieldLabel>
							<TextField />
						</TextFieldRoot>
						<TextFieldRoot class="space-y-1">
							<TextFieldLabel>Username</TextFieldLabel>
							<TextField />
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
							Change your password here. After saving, you'll be logged out.
						</CardDescription>
					</CardHeader>
					<CardContent class="space-y-2">
						<TextFieldRoot class="space-y-1">
							<TextFieldLabel>Current password</TextFieldLabel>
							<TextField />
						</TextFieldRoot>
						<TextFieldRoot class="space-y-1">
							<TextFieldLabel>New password</TextFieldLabel>
							<TextField />
						</TextFieldRoot>
					</CardContent>
					<CardFooter>
						<Button>Save password</Button>
					</CardFooter>
				</Card>
			</TabsContent>
		</Tabs>
	);
};

export default TabsOrientationDemo;

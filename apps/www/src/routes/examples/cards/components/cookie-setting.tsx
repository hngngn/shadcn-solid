import { Button } from "@/registry/default/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/default/ui/card"
import {
	Switch,
	SwitchControl,
	SwitchThumb,
} from "@/registry/default/ui/switch"

export const DemoCookieSettings = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Cookie Settings</CardTitle>
				<CardDescription>
					Manage your cookie settings here.
				</CardDescription>
			</CardHeader>
			<CardContent class="grid gap-6">
				<div class="flex items-center justify-between space-x-2">
					<label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col space-y-1">
						<span>Strictly Necessary</span>
						<span class="font-normal leading-snug text-muted-foreground">
							These cookies are essential in order to use the
							website and use its features.
						</span>
					</label>
					<Switch defaultChecked>
						<SwitchControl>
							<SwitchThumb />
						</SwitchControl>
					</Switch>
				</div>
				<div class="flex items-center justify-between space-x-2">
					<label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col space-y-1">
						<span>Functional Cookies</span>
						<span class="font-normal leading-snug text-muted-foreground">
							These cookies allow the website to provide
							personalized functionality.
						</span>
					</label>
					<Switch>
						<SwitchControl>
							<SwitchThumb />
						</SwitchControl>
					</Switch>
				</div>
				<div class="flex items-center justify-between space-x-2">
					<label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col space-y-1">
						<span>Performance Cookies</span>
						<span class="font-normal leading-snug text-muted-foreground">
							These cookies help to improve the performance of the
							website.
						</span>
					</label>
					<Switch>
						<SwitchControl>
							<SwitchThumb />
						</SwitchControl>
					</Switch>
				</div>
			</CardContent>
			<CardFooter>
				<Button variant="outline" class="w-full">
					Save preferences
				</Button>
			</CardFooter>
		</Card>
	)
}

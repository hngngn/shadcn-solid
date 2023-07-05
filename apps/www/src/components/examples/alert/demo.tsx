import { Alert, AlertDescription, AlertTitle } from "~/components"

export const AlertDemo = () => {
	return (
		<Alert>
			<i class="i-lucide:terminal" />
			<AlertTitle>Heads up!</AlertTitle>
			<AlertDescription>
				You can not add components to your app using the cli, yet.
			</AlertDescription>
		</Alert>
	)
}

import { Alert, AlertDescription, AlertTitle } from "~/components"

export const AlertDestructive = () => {
	return (
		<Alert variant="destructive">
			<i class="i-lucide:alert-circle" />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>
				Your session has expired. Please log in again.
			</AlertDescription>
		</Alert>
	)
}

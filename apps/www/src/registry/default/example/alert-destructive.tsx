import { IconAlertCircle } from "@tabler/icons-solidjs"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

const AlertDestructive = () => {
    return (
        <Alert variant="destructive">
            <IconAlertCircle class="w-4 h-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                Your session has expired. Please log in again.
            </AlertDescription>
        </Alert>
    )
}

export default AlertDestructive

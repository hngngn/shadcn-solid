import { IconTerminal } from "@tabler/icons-solidjs"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

const AlertDemo = () => {
    return (
        <Alert>
            <IconTerminal class="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
                You can not add components to your app using the cli, yet.
            </AlertDescription>
        </Alert>
    )
}

export default AlertDemo

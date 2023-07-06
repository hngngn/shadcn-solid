import { TbTerminal } from "solid-icons/tb"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

const AlertDemo = () => {
    return (
        <Alert>
            <TbTerminal class="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
                You can not add components to your app using the cli, yet.
            </AlertDescription>
        </Alert>
    )
}

export default AlertDemo

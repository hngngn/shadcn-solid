import { toaster } from "@kobalte/core"
import {
    Button,
    Toast,
    ToastContent,
    ToastDescription,
    ToastList,
    ToastProgress,
    ToastRegion,
    ToastTitle,
} from "~/components"

export const ToastDestructive = () => {
    const showToast = () =>
        toaster.show((props) => (
            <Toast
                toastId={props.toastId}
                variant="destructive"
                class="flex-col gap-2"
            >
                <ToastContent>
                    <ToastTitle>Uh oh! Something went wrong.</ToastTitle>
                    <ToastDescription>
                        There was a problem with your request.
                    </ToastDescription>
                </ToastContent>
                <ToastProgress />
            </Toast>
        ))

    return (
        <>
            <Button variant="outline" onClick={showToast}>
                Add to calendar
            </Button>
            <ToastRegion>
                <ToastList />
            </ToastRegion>
        </>
    )
}

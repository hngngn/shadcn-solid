import { toaster } from "@kobalte/core"
import { Button } from "../ui/button"
import {
	Toast,
	ToastContent,
	ToastDescription,
	ToastList,
	ToastProgress,
	ToastRegion,
	ToastTitle,
} from "../ui/toast"

const ToastDemo = () => {
	const showToast = () => {
		toaster.show((props) => (
			<Toast toastId={props.toastId} class="flex-col gap-2">
				<ToastContent>
					<ToastTitle>Scheduled: Catch up</ToastTitle>
					<ToastDescription>
						Friday, February 10, 2023 at 5:57 PM
					</ToastDescription>
				</ToastContent>
				<ToastProgress />
			</Toast>
		))
	}

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

export default ToastDemo

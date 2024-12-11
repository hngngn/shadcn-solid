import { Button } from "@/registry/tailwindcss/ui/button";
import {
	Toast,
	ToastContent,
	ToastDescription,
	ToastProgress,
	ToastTitle,
} from "@/registry/tailwindcss/ui/toast";
import { toaster } from "@kobalte/core";

const ToastDemo = () => {
	const showToast = () => {
		toaster.show((props) => (
			<Toast toastId={props.toastId}>
				<ToastContent>
					<ToastTitle>Scheduled: Catch up</ToastTitle>
					<ToastDescription>
						Friday, February 10, 2023 at 5:57 PM
					</ToastDescription>
				</ToastContent>
				<ToastProgress />
			</Toast>
		));
	};

	return (
		<Button variant="outline" onClick={showToast}>
			Add to calendar
		</Button>
	);
};

export default ToastDemo;

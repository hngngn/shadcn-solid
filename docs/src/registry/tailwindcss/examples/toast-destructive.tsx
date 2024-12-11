import { Button } from "@/registry/tailwindcss/ui/button";
import {
	Toast,
	ToastContent,
	ToastDescription,
	ToastProgress,
	ToastTitle,
} from "@/registry/tailwindcss/ui/toast";
import { toaster } from "@kobalte/core";

const ToastDestructive = () => {
	const showToast = () =>
		toaster.show((props) => (
			<Toast toastId={props.toastId} variant="destructive">
				<ToastContent>
					<ToastTitle>Uh oh! Something went wrong.</ToastTitle>
					<ToastDescription>
						There was a problem with your request.
					</ToastDescription>
				</ToastContent>
				<ToastProgress />
			</Toast>
		));

	return (
		<Button variant="outline" onClick={showToast}>
			Add to calendar
		</Button>
	);
};

export default ToastDestructive;

import { ToastList, ToastRegion } from "@repo/tailwindcss/ui/toast";
import { Toaster } from "solid-sonner";

const ToastWrapper = () => {
	return (
		<div>
			<ToastRegion>
				<ToastList />
			</ToastRegion>
			<Toaster />
		</div>
	);
};

export default ToastWrapper;

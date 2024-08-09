import { Toaster } from "@repo/tailwindcss/default/sonner";
import { ToastList, ToastRegion } from "@repo/tailwindcss/default/toast";
import { createEffect, createSignal, on } from "solid-js";

const ToastWrapper = () => {
	const [theme, setThemeState] = createSignal<"light" | "dark" | "system">(
		"light",
	);

	createEffect(
		on(
			() => document.documentElement.classList.contains("dark"),
			(isDarkMode) => {
				setThemeState(isDarkMode ? "dark" : "light");
			},
		),
	);

	return (
		<>
			<ToastRegion>
				<ToastList />
			</ToastRegion>
			<Toaster theme={theme()} />
		</>
	);
};

export default ToastWrapper;

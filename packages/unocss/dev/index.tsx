import { ColorModeProvider, ColorModeScript } from "@kobalte/core";
import { render } from "solid-js/web";
import { Toaster } from "../ui/sonner";
import { ToastList, ToastRegion } from "../ui/toast";
import App from "./app";

import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import "./app.css";

render(
	() => (
		<>
			<ColorModeScript />
			<ColorModeProvider>
				<App />
				<ToastRegion>
					<ToastList />
				</ToastRegion>
				<Toaster />
			</ColorModeProvider>
		</>
	),
	document.getElementById("root") as HTMLElement,
);

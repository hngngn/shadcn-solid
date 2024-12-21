import { ColorModeProvider, ColorModeScript } from "@kobalte/core";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { Toaster } from "../ui/sonner";
import { ToastList, ToastRegion } from "../ui/toast";

import "virtual:uno.css";
import "@unocss/reset/tailwind-compat.css";
import "./app.css";

export default function App() {
	return (
		<Router
			root={(props) => (
				<>
					<ColorModeScript />
					<ColorModeProvider>
						<Suspense>{props.children}</Suspense>
						<ToastRegion>
							<ToastList />
						</ToastRegion>
						<Toaster />
					</ColorModeProvider>
				</>
			)}
		>
			<FileRoutes />
		</Router>
	);
}

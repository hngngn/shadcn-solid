import { ColorModeProvider, ColorModeScript } from "@kobalte/core";
import { Toaster } from "@repo/tailwindcss/ui/sonner";
import { ToastList, ToastRegion } from "@repo/tailwindcss/ui/toast";
import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { Metadata } from "~/components/metadata";

import "./app.css";
import "./mdx.css";

export default function App() {
	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<Metadata />
					<ColorModeScript />
					<ColorModeProvider>
						<Suspense>{props.children}</Suspense>
						<ToastRegion>
							<ToastList />
						</ToastRegion>
						<Toaster />
					</ColorModeProvider>
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	);
}

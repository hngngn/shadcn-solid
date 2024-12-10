import {
	ColorModeProvider,
	ColorModeScript,
	cookieStorageManagerSSR,
} from "@kobalte/core";
import { Toaster } from "@repo/tailwindcss/ui/sonner";
import { ToastList, ToastRegion } from "@repo/tailwindcss/ui/toast";
import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { Metadata } from "~/components/metadata";

import "./app.css";
import "./mdx.css";
import { isServer } from "solid-js/web";
import { getCookie } from "vinxi/http";

const getServerCookies = () => {
	"use server";
	const colorMode = getCookie("kb-color-mode");
	return colorMode ? `kb-color-mode=${colorMode}` : "";
};

export default function App() {
	const storageManager = cookieStorageManagerSSR(
		isServer ? getServerCookies() : document.cookie,
	);

	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<Metadata />
					<ColorModeScript storageType={storageManager.type} />
					<ColorModeProvider storageManager={storageManager}>
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

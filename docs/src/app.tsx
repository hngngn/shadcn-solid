import { Metadata } from "@/components/metadata";
import { Toaster } from "@/registry/tailwindcss/ui/sonner";
import { ToastList, ToastRegion } from "@/registry/tailwindcss/ui/toast";
import {
	ColorModeProvider,
	ColorModeScript,
	cookieStorageManagerSSR,
} from "@kobalte/core";
import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { isServer } from "solid-js/web";
import { getCookie } from "vinxi/http";

import "./app.css";
import "./mdx.css";

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
						<Suspense>
							<div class="relative flex min-h-svh flex-col bg-background">
								{props.children}
							</div>
						</Suspense>
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

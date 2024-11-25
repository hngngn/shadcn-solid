import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Metadata } from "@/components/metadata";
import { ColorModeProvider, ColorModeScript } from "@kobalte/core";
import { ToastList, ToastRegion } from "@repo/tailwindcss/ui/toast";
import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { clientOnly } from "@solidjs/start";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

import "./app.css";
import "./mdx.css";

const Toaster = clientOnly(
	async () => (await import("@repo/tailwindcss/ui/sonner")).Toaster,
);

export default function App() {
	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<Metadata />
					<ColorModeScript />
					<ColorModeProvider>
						<Suspense>
							<div class="relative flex min-h-screen flex-col">
								<div class="mx-auto w-full border-border/40 dark:border-border min-[1800px]:max-w-[1536px] min-[1800px]:border-x">
									<Header />
									<div class="flex-1">{props.children}</div>
									<Footer />
									<ToastRegion>
										<ToastList />
									</ToastRegion>
									<Toaster />
								</div>
							</div>
						</Suspense>
					</ColorModeProvider>
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	);
}

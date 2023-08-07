// @refresh reload
import { Metadata } from "@/components/metadata"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import "@/styles/global.css"
import "@/styles/mdx.css"
import "@fontsource-variable/inter"
import {
	ColorModeProvider,
	ColorModeScript,
	cookieStorageManagerSSR,
} from "@kobalte/core"
import { Suspense, useContext } from "solid-js"
import { isServer } from "solid-js/web"
import {
	Body,
	ErrorBoundary,
	FileRoutes,
	Head,
	Html,
	Routes,
	Scripts,
	ServerContext,
} from "solid-start"

export default function Root() {
	const event = useContext(ServerContext)

	const storageManager = cookieStorageManagerSSR(
		isServer ? event?.request.headers.get("cookie") ?? "" : document.cookie
	)

	return (
		<Html lang="en">
			<Head>
				<Metadata />
			</Head>
			<Body class="font-sans antialiased">
				<Suspense>
					<ErrorBoundary>
						<ColorModeScript storageType={storageManager.type} />
						<ColorModeProvider storageManager={storageManager}>
							<SiteHeader />
							<Routes>
								<FileRoutes />
							</Routes>
							<SiteFooter />
						</ColorModeProvider>
					</ErrorBoundary>
				</Suspense>
				<Scripts />
			</Body>
		</Html>
	)
}

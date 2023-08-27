// @refresh reload
import "@fontsource-variable/inter"
import { ColorModeProvider, localStorageManager } from "@kobalte/core"
import { Suspense } from "solid-js"
import {
	Body,
	ErrorBoundary,
	FileRoutes,
	Head,
	Html,
	Routes,
	Scripts,
} from "solid-start"
import { Metadata } from "./components/metadata"
import SiteFooter from "./components/site-footer"
import SiteHeader from "./components/site-header"
import "./mdx.css"
import "./root.css"

export default function Root() {
	return (
		<Html lang="en">
			<Head>
				<Metadata />
			</Head>
			<Body>
				<ErrorBoundary>
					<Suspense>
						<ColorModeProvider storageManager={localStorageManager}>
							<SiteHeader />
							<Routes>
								<FileRoutes />
							</Routes>
							<SiteFooter />
						</ColorModeProvider>
					</Suspense>
				</ErrorBoundary>
				<Scripts />
			</Body>
		</Html>
	)
}

// @refresh reload
import {
	ColorModeProvider,
	ColorModeScript,
	cookieStorageManagerSSR,
} from "@kobalte/core"
import { Suspense, useContext } from "solid-js"
import { MDXProvider } from "solid-mdx"
import {
	Body,
	ErrorBoundary,
	FileRoutes,
	Head,
	Html,
	Meta,
	Routes,
	Scripts,
	ServerContext,
	Title,
} from "solid-start"
import { MDXComponent, SiteFooter, SiteHeader } from "~/components"

import "@unocss/reset/tailwind.css"
import { isServer } from "solid-js/web"
import "virtual:uno.css"
import "~/styles/index.scss"

export const mods = /*#__PURE__*/ import.meta.glob<
	true,
	any,
	{
		getHeadings: () => {
			depth: number
			text: string
			slug: string
		}[]
		getFrontMatter: () => {
			title: string
			description: string
			component?: boolean
			source?: string
			kobalte?: string
			external?: string
		}
	}
>("./routes/docs/**/*.mdx", {
	eager: true,
	query: {
		meta: "",
	},
})

const Root = () => {
	const event = useContext(ServerContext)

	const storageManager = cookieStorageManagerSSR(
		isServer ? event?.request.headers.get("cookie") ?? "" : document.cookie
	)

	return (
		<Html lang="en">
			<Head>
				<Title>shadcn-solid</Title>
				<Meta charset="utf-8" />
				<Meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<Body class="font-sans antialiased bg-background text-foreground min-h-screen">
				<ErrorBoundary>
					<ColorModeScript storageType={storageManager.type} />
					<Suspense>
						<ColorModeProvider storageManager={storageManager}>
							<SiteHeader />
							<div class="min-h-[calc(100vh-57px-97px)]">
								<MDXProvider components={MDXComponent}>
									<Routes>
										<FileRoutes />
									</Routes>
								</MDXProvider>
							</div>
							<SiteFooter />
						</ColorModeProvider>
					</Suspense>
				</ErrorBoundary>
				<Scripts />
			</Body>
		</Html>
	)
}

export default Root

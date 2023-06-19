// @refresh reload
import { Suspense } from "solid-js"
import {
	Body,
	ErrorBoundary,
	FileRoutes,
	Head,
	Html,
	Meta,
	Routes,
	Scripts,
	Title,
} from "solid-start"
import { MDXComponent, SiteFooter, SiteHeader } from "~/components"

import "@unocss/reset/tailwind.css"
import { MDXProvider } from "solid-mdx"
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
				<SiteHeader />
				<ErrorBoundary>
					<Suspense>
						<div class="min-h-[calc(100vh-57px-97px)]">
							<MDXProvider components={MDXComponent}>
								<Routes>
									<FileRoutes />
								</Routes>
							</MDXProvider>
						</div>
					</Suspense>
				</ErrorBoundary>
				<SiteFooter />
				<Scripts />
			</Body>
		</Html>
	)
}

export default Root

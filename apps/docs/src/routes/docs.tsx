import { Show } from "solid-js"
import { A, Outlet, Title, useLocation } from "solid-start"
import { createServerData$ } from "solid-start/server"
import { Balancer } from "solid-wrap-balancer"
import {
	DocsPager,
	KobalteLogo,
	Separator,
	Sidebar,
	TableOfContents,
	badgeVariants,
} from "~/components"

const mods = /*#__PURE__*/ import.meta.glob<
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
			kobalte?: {
				link: string
				api: string
			}
		}
	}
>("./docs/**/*.mdx", {
	eager: true,
	query: {
		meta: "",
	},
})

export default () => {
	const location = useLocation()

	const data = createServerData$(
		async (pathname) => {
			const mod = mods[`.${pathname}.mdx`]

			return {
				frontmatter: !mod ? null : mod.getFrontMatter(),
				headings: !mod ? [] : mod.getHeadings(),
			}
		},
		{
			key: () => location.pathname,
		}
	)

	return (
		<>
			<Title>{`${data()?.frontmatter?.title} - shadcn-solid`}</Title>
			<div class="container flex-1 items-start md:(grid grid-cols-[220px_minmax(0,1fr)] gap-6) lg:(grid-cols-[240px_minmax(0,1fr)] gap-10)">
				<aside class="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 hover:overflow-y-auto overflow-hidden [scrollbar-gutter:stable] scrollbar-w-2 md:(sticky block)">
					<div class="h-full py-6 px-6 lg:py-8">
						<Sidebar />
					</div>
				</aside>
				<main class="relative py-6 lg:(gap-10 py-8) xl:(grid grid-cols-[1fr_300px])">
					<div class="mx-auto w-full min-w-0">
						<div class="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
							<div class="overflow-hidden text-ellipsis whitespace-nowrap">
								Docs
							</div>
							<i class="i-lucide:chevron-right" />
							<div class="font-medium text-foreground">
								{data()?.frontmatter?.title}
							</div>
						</div>
						<div class="space-y-2">
							<h1 class="scroll-m-20 text-4xl font-bold tracking-tight">
								{data()?.frontmatter?.title}
							</h1>
							<Show when={data()?.frontmatter?.description}>
								<p class="text-lg text-muted-foreground">
									<Balancer>
										{data()?.frontmatter?.description}
									</Balancer>
								</p>
							</Show>
						</div>
						<Show when={data()?.frontmatter?.kobalte}>
							<div class="flex items-center space-x-2 pt-4">
								<Show when={data()?.frontmatter?.kobalte?.link}>
									<A
										href={
											data()?.frontmatter?.kobalte?.link!
										}
										target="_blank"
										rel="noreferrer"
										class={badgeVariants({
											variant: "secondary",
										})}
									>
										<KobalteLogo class="mr-1 h-2.5 w-2.5" />
										Kobalte
									</A>
								</Show>
								<Show when={data()?.frontmatter?.kobalte?.api}>
									<A
										href={
											data()?.frontmatter?.kobalte?.api!
										}
										target="_blank"
										rel="noreferrer"
										class={badgeVariants({
											variant: "secondary",
										})}
									>
										API Reference
									</A>
								</Show>
							</div>
						</Show>
						<div class="max-w-full pb-12 pt-8">
							<Outlet />
						</div>
						<Separator class="my-4 md:my-6" />
						<DocsPager slug={location.pathname} />
					</div>
					<div class="hidden text-sm xl:block">
						<div class="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-hidden pt-6">
							<Show when={location.pathname}>
								<TableOfContents toc={data()?.headings} />
							</Show>
						</div>
					</div>
				</main>
			</div>
		</>
	)
}

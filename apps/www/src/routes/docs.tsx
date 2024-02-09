import { MDXComponent } from "@/components/mdx-components"
import { Metadata } from "@/components/metadata"
import { Pager } from "@/components/pager"
import { Sidebar } from "@/components/sidebar"
import { TableOfContents } from "@/components/toc"
import { badgeVariants } from "@/registry/default/ui/badge"
import { A, useLocation, type RouteSectionProps } from "@solidjs/router"
import { Show, createMemo } from "solid-js"
import { MDXProvider } from "solid-mdx"
import { Balancer } from "solid-wrap-balancer"

type Heading = { depth: number; text: string; slug: string }

type Frontmatter = {
	title: string
	description: string
	component?: boolean
	link?: {
		doc: string
		api: string
	}
	toc: boolean
}

const contents = /*#__PURE__*/ import.meta.glob<
	true,
	any,
	{
		headings: Heading[]
		frontmatter: Frontmatter
	}
>("./docs/**/*.mdx", {
	eager: true,
})

const Documents = (props: RouteSectionProps) => {
	const location = useLocation()

	const markdownData = createMemo(() => ({
		frontmatter:
			contents[
				`.${
					location.pathname === "/docs" ||
					location.pathname === "/docs/installation"
						? location.pathname + "/index"
						: location.pathname
				}.mdx`
			].frontmatter,
		headings:
			contents[
				`.${
					location.pathname === "/docs" ||
					location.pathname === "/docs/installation"
						? location.pathname + "/index"
						: location.pathname
				}.mdx`
			].headings,
	}))

	return (
		<>
			<Metadata
				title={markdownData().frontmatter.title}
				description={markdownData().frontmatter.description}
				type="article"
			/>
			<div class="border-b">
				<div class="container flex-1 items-start md:grid grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
					<aside class="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
						<div class="relative overflow-y-auto h-full py-6 pr-6 lg:py-8">
							<Sidebar />
						</div>
					</aside>
					<main class="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
						<div class="mx-auto w-full min-w-0">
							<div class="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
								<div class="overflow-hidden text-ellipsis whitespace-nowrap">
									Docs
								</div>
								<span class="icon-[tabler--chevron-right] h-4 w-4" />
								<div class="font-medium text-foreground">
									{markdownData().frontmatter.title}
								</div>
							</div>
							<div class="space-y-2">
								<h1 class="scroll-m-20 text-4xl font-bold tracking-tight">
									{markdownData().frontmatter.title}
								</h1>
								<Show
									when={
										markdownData().frontmatter.description
									}
								>
									<p class="text-lg text-muted-foreground">
										<Balancer>
											{
												markdownData().frontmatter
													.description
											}
										</Balancer>
									</p>
								</Show>
							</div>
							<Show when={markdownData().frontmatter.link}>
								<div class="flex items-center space-x-2 pt-4">
									<Show
										when={
											markdownData().frontmatter.link?.doc
										}
									>
										<A
											href={
												markdownData().frontmatter.link
													?.doc!
											}
											target="_blank"
											rel="noreferrer"
											class={badgeVariants({
												variant: "secondary",
											})}
										>
											Docs{" "}
											<span class="icon-[tabler--external-link] ml-1" />
										</A>
									</Show>
									<Show
										when={
											markdownData().frontmatter.link?.api
										}
									>
										<A
											href={
												markdownData().frontmatter.link
													?.api!
											}
											target="_blank"
											rel="noreferrer"
											class={badgeVariants({
												variant: "secondary",
											})}
										>
											API Reference
											<span class="icon-[tabler--external-link] ml-1" />
										</A>
									</Show>
								</div>
							</Show>
							<div class="max-w-full pb-12 pt-8">
								<MDXProvider components={MDXComponent}>
									{props.children}
								</MDXProvider>
							</div>
							<Pager slug={location.pathname} />
						</div>
						<Show
							when={markdownData().frontmatter.toc === undefined}
						>
							<div class="hidden text-sm xl:block">
								<div class="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-hidden pt-6">
									<TableOfContents
										data={markdownData().headings}
									/>
								</div>
							</div>
						</Show>
					</main>
				</div>
			</div>
		</>
	)
}

export default Documents

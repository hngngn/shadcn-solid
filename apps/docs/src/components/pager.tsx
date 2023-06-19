import type { Component } from "solid-js"
import { Show } from "solid-js"
import { A } from "solid-start"
import { docsConfig } from "~/config"
import type { TNavItem, TNavItemWithChildren } from "~/types"
import { buttonVariants } from "./ui"

interface DocsPagerProps {
	slug: string
}

export const DocsPager: Component<DocsPagerProps> = (props) => {
	const getPagerForDoc = (slug: string) => {
		const flattenedLinks = [null, ...flatten(docsConfig.sidebarNav), null]
		let activeIndex: number
		if (!slug) {
			activeIndex = 1
		} else {
			activeIndex = flattenedLinks.findIndex(
				(link) => `${slug}` === link?.href
			)
		}

		const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null
		const next =
			activeIndex !== flattenedLinks.length - 1
				? flattenedLinks[activeIndex + 1]
				: null
		return {
			prev,
			next,
		}
	}

	const flatten = (links: TNavItemWithChildren[]): TNavItem[] => {
		return links
			.reduce<TNavItem[]>((flat, link) => {
				return flat.concat(
					link.items?.length ? flatten(link.items) : link
				)
			}, [])
			.filter((link) => !link?.disabled)
	}

	const pager = () => getPagerForDoc(props.slug)

	return (
		<div class="flex flex-row items-center justify-between">
			<Show when={pager()?.prev?.href}>
				<A
					href={pager().prev?.href!}
					class={buttonVariants({ variant: "outline" })}
				>
					<i class="i-lucide-chevron-left mr-2" />
					{pager().prev?.title}
				</A>
			</Show>
			<Show when={pager()?.next?.href}>
				<A
					href={pager().next?.href!}
					class={buttonVariants({ variant: "outline" })}
				>
					{pager().next?.title}
					<i class="i-lucide-chevron-right ml-2" />
				</A>
			</Show>
		</div>
	)
}

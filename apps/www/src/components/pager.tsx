import { docsConfig } from "@/config"
import { Button } from "@/registry/default/ui/button"
import type { TNavItem, TNavItemWithChildren } from "@/types"
import { As } from "@kobalte/core"
import { TbChevronLeft, TbChevronRight } from "solid-icons/tb"
import type { Component } from "solid-js"
import { Show } from "solid-js"
import { A } from "solid-start"

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
				<Button asChild variant="outline">
					<As component={A} href={pager().prev?.href!}>
						<TbChevronLeft class="h-4 w-4 mr-2" />
						{pager().prev?.title}
					</As>
				</Button>
			</Show>
			<Show when={pager()?.next?.href}>
				<Button asChild variant="outline" class="ml-auto">
					<As component={A} href={pager().next?.href!}>
						{pager().next?.title}
						<TbChevronRight class="h-4 w-4 ml-2" />
					</As>
				</Button>
			</Show>
		</div>
	)
}

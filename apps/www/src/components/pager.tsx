import type { TNavItem, TNavItemWithChildren } from "@/config/docs"
import { docsConfig } from "@/config/docs"
import { Button } from "@/registry/default/ui/button"
import { As } from "@kobalte/core"
import { A } from "@solidjs/router"
import type { VoidComponent } from "solid-js"
import { Show } from "solid-js"

export const Pager: VoidComponent<{
	slug: string
}> = (props) => {
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
						<span class="icon-[tabler--chevron-left] h-4 w-4 mr-2" />
						{pager().prev?.title}
					</As>
				</Button>
			</Show>
			<Show when={pager()?.next?.href}>
				<Button asChild variant="outline" class="ml-auto">
					<As component={A} href={pager().next?.href!}>
						{pager().next?.title}
						<span class="icon-[tabler--chevron-right] h-4 w-4 ml-2" />
					</As>
				</Button>
			</Show>
		</div>
	)
}

import type { MarkdownHeading } from "astro"
import type { Component } from "solid-js"
import { For, createSignal } from "solid-js"

type Props = {
	headings: MarkdownHeading[]
}

export const TableOfContents: Component<Props> = (props) => {
	const [hash, setHash] = createSignal<string | null>(null)

	return (
		<aside id="#toc" class="space-y-2">
			<p class="font-medium">On This Page</p>
			<ul class="m-0 list-none">
				<For each={props.headings}>
					{(h) => (
						<li class="mt-0 pt-2">
							<a
								href={`#${h.slug}`}
								onClick={() => setHash(h.slug)}
								class="inline-block no-underline transition-colors hover:text-foreground"
								classList={{
									"font-medium text-foreground":
										h.slug === hash(),
									"text-muted-foreground": h.slug !== hash(),
								}}
							>
								{h.text}
							</a>
						</li>
					)}
				</For>
			</ul>
		</aside>
	)
}

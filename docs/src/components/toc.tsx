import { cn } from "@/registry/tailwindcss/libs/cn";
import { createIntersectionObserver } from "@solid-primitives/intersection-observer";
import { useLocation } from "@solidjs/router";
import { For, createEffect, createSignal } from "solid-js";

type Heading = { depth: number; slug: string; text: string };

type TocProps = {
	data: Heading[];
};

type TocItemProps = {
	data: Heading;
};

const TocItem = (props: TocItemProps) => {
	const location = useLocation();

	const handleClick = (event: Event) => {
		event.preventDefault();

		const element = document.getElementById(props.data.slug);

		if (element) {
			const elementPosition = element.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.scrollY - 70;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	};

	return (
		<li class={cn("mt-0 pt-2", props.data.depth === 3 && "pl-4")}>
			<a
				href={`${location.pathname}#${props.data.slug}`}
				class={cn(
					"inline-block no-underline transition-colors hover:text-foreground text-muted-foreground",
					"[&.active-toc-item]:font-medium [&.active-toc-item]:text-foreground",
				)}
				onClick={handleClick}
			>
				{props.data.text}
			</a>
		</li>
	);
};

export const Toc = (props: TocProps) => {
	const [targets, setTargets] = createSignal<Element[]>([]);

	createEffect(() => {
		for (const item of props.data) {
			setTargets((p) => [...p, document.getElementById(item.slug) as Element]);
		}
	});

	createIntersectionObserver(
		targets,
		(entries) => {
			let firstIntersectingEntry = null;

			for (const entry of entries) {
				if (entry.isIntersecting) {
					firstIntersectingEntry = entry;
					break;
				}
			}

			if (firstIntersectingEntry) {
				const headingFragment = `#${firstIntersectingEntry.target.id}`;
				const tocItem = document.querySelector(
					`a[href="${window.location.pathname + headingFragment}"]`,
				);
				const previouslyActivatedItem =
					document.querySelector(".active-toc-item");

				previouslyActivatedItem?.classList.remove("active-toc-item");
				tocItem?.classList.add("active-toc-item");
			}
		},
		{
			threshold: 0.01,
		},
	);

	return (
		<aside class="space-y-2">
			<p class="font-medium">On This Page</p>
			<ul class="m-0 list-none">
				<For each={props.data}>{(h) => <TocItem data={h} />}</For>
			</ul>
		</aside>
	);
};

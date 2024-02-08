import { cn } from "@/lib/cn"
import { A, useLocation } from "@solidjs/router"
import { Index } from "solid-js"

const examples = [
	{
		name: "Cards",
		href: "/examples/cards",
	},
	{
		name: "Authentication",
		href: "/examples/authentication",
	},
]

export const Example = () => {
	const location = useLocation()

	return (
		<div class="relative">
			<div class="mb-4 flex items-center justify-center [&>a:first-child]:text-primary">
				<Index each={examples}>
					{(example, index) => (
						<A
							href={example().href}
							class={cn(
								"flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
								location.pathname.startsWith(example().href) ||
									(index === 0 && location.pathname === "/")
									? "bg-muted font-medium text-primary"
									: "text-muted-foreground"
							)}
						>
							{example().name}
						</A>
					)}
				</Index>
			</div>
		</div>
	)
}

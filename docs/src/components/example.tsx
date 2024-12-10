import { cn } from "@/registry/tailwindcss/libs/cn";
import { useLocation } from "@solidjs/router";
import { For } from "solid-js";

const examples = [
	{
		name: "Mail",
		href: "/examples/mail",
	},
	{
		name: "Cards",
		href: "/examples/cards",
	},
	{
		name: "Authentication",
		href: "/examples/authentication",
	},
];

const Example = () => {
	const location = useLocation();

	return (
		<div class="relative">
			<div class="mb-4 flex items-center">
				<For each={examples}>
					{(item, index) => (
						<a
							href={item.href}
							class={cn(
								"flex h-7 items-center justify-center rounded-full px-4 text-center text-sm font-medium transition-colors hover:text-primary",
								location.pathname.startsWith(item.href) ||
									(index() === 0 && location.pathname === "/")
									? "bg-muted text-primary"
									: "text-muted-foreground",
							)}
						>
							{item.name}
						</a>
					)}
				</For>
			</div>
		</div>
	);
};

export default Example;

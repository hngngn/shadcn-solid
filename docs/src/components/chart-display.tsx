import { Index } from "@/__registry__";
import type { RegistryEntry } from "@/registry/schema";
import { cn } from "@/registry/tailwindcss/libs/cn";
import { createAsync } from "@solidjs/router";
import { clientOnly } from "@solidjs/start";
import { type ComponentProps, Show, splitProps } from "solid-js";

const ChartToolbar = clientOnly(() => import("./chart-toolbar"), {
	lazy: true,
});

const ChartDisplay = (
	props: ComponentProps<"div"> & {
		name: string;
	},
) => {
	const [local, rest] = splitProps(props, ["name", "children", "class"]);
	const item = createAsync<RegistryEntry>(() => Index.tailwindcss[props.name]);

	return (
		<Show when={item()}>
			<div
				class={cn(
					"themes-wrapper group relative flex flex-col overflow-hidden rounded-xl border shadow transition-all duration-200 ease-in-out hover:z-30",
					local.class,
				)}
				{...rest}
			>
				<ChartToolbar item={item()} />
				<div class="relative z-10 [&>div]:rounded-none [&>div]:border-none [&>div]:shadow-none">
					{local.children}
				</div>
			</div>
		</Show>
	);
};

export default ChartDisplay;

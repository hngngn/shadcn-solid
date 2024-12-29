import { cn } from "@/registry/tailwindcss/libs/cn";
import { type ComponentProps, splitProps } from "solid-js";

const ChartDisplay = (
	props: ComponentProps<"div"> & {
		name: string;
	},
) => {
	const [local, rest] = splitProps(props, ["name", "children", "class"]);

	return (
		<div
			class={cn(
				"themes-wrapper group relative flex flex-col overflow-hidden rounded-xl border shadow transition-all duration-200 ease-in-out hover:z-30",
				local.class,
			)}
			{...rest}
		>
			<div class="relative z-10 [&>div]:rounded-none [&>div]:border-none [&>div]:shadow-none">
				{local.children}
			</div>
		</div>
	);
};

export default ChartDisplay;

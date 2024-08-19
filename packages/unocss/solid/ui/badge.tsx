import { cn } from "@/libs/cn";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { type ComponentProps, splitProps } from "solid-js";

export const badgeVariants = cva(
	"inline-flex text-xs font-medium px-3 gap-x-2 py-1 rounded-xl cursor-default ring-inset ring-1 select-none transition-[box-shadow,color,background-color] duration-300",
	{
		variants: {
			variant: {
				default: [
					"[--badge-ring:theme(colors.blue.400)] [--badge-bg:theme(colors.blue.100)] [--badge-text:theme(colors.blue.600)] hover:[--badge-bg:theme(colors.blue.200)]",
					"dark:([--badge-ring:theme(colors.blue.800)] [--badge-bg:theme(colors.blue.900/50%)] [--badge-text:theme(colors.blue.100)] hover:[--badge-bg:theme(colors.blue.900/80%)])",
					"ring-[--badge-ring] bg-[--badge-bg] text-[--badge-text]",
				],
				destructive: [
					"[--badge-ring:theme(colors.red.400)] [--badge-bg:theme(colors.red.100)] [--badge-text:theme(colors.red.600)] hover:[--badge-bg:theme(colors.red.200)]",
					"dark:([--badge-ring:theme(colors.red.800)] [--badge-bg:theme(colors.red.900/50%)] [--badge-text:theme(colors.red.100)] hover:[--badge-bg:theme(colors.red.900/80%)])",
					"ring-[--badge-ring] bg-[--badge-bg] text-[--badge-text]",
				],
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export type badgeProps = ComponentProps<"div"> &
	VariantProps<typeof badgeVariants>;

export const Badge = (props: badgeProps) => {
	const [local, rest] = splitProps(props, ["class", "variant"]);

	return (
		<div
			class={cn(
				badgeVariants({
					variant: local.variant,
				}),
				local.class,
			)}
			{...rest}
		/>
	);
};

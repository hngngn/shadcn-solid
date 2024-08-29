import { cn } from "@/libs/cn";
import type { ButtonRootProps } from "@kobalte/core/button";
import { Button as ButtonPrimitive } from "@kobalte/core/button";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

export const buttonVariants = cva(
	"relative isolate inline-flex justify-center items-center font-medium text-sm rounded-lg py-2 px-6 outline-none appearance-none border-none transition-[background-color,box-shadow,color,outline-color] duration-300 disabled:cursor-not-allowed",
	{
		variants: {
			variant: {
				default: [
					"text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus-visible:outline-blue-500",
					"disabled:(bg-blue-100 text-blue-400)",
					"dark:disabled:(bg-blue-950 text-blue-700)",
				],
				destructive: [
					"text-white bg-red-500 hover:bg-red-600 active:bg-red-700 focus-visible:outline-red-500",
					"disabled:(bg-red-100 text-red-400)",
					"dark:disabled:(bg-red-950 text-red-700)",
				],
			},
			appearance: {
				bezel: [
					"shadow-sm disabled:shadow-none",
					"[&:before,&:after]:(content-empty absolute inset-0 -z-10 rounded-lg disabled:shadow-none)",
					"before:(shadow-[inset_0_-1px_0_0] shadow-black/20)",
					"after:(shadow-[inset_0_2px_0_0] shadow-white/25)",
				],
				flat: "shadow-sm disabled:shadow-none",
				outline: [
					"text-zinc-950 ring-inset ring-1 ring-zinc-200 bg-transparent",
					"hover:bg-zinc-50 active:bg-zinc-100",
					"dark:(ring-zinc-800 text-white hover:bg-zinc-900/80 active:bg-zinc-900)",
					"disabled:(bg-transparent text-zinc-500 dark:(bg-transparent text-zinc-500))",
				],
				plain: [
					"text-zinc-950 bg-transparent",
					"hover:bg-zinc-50 active:bg-zinc-100",
					"dark:(ring-zinc-800 text-white hover:bg-zinc-900/80 active:bg-zinc-900)",
					"disabled:(bg-transparent text-zinc-500 dark:(bg-transparent text-zinc-500))",
				],
			},
		},
		defaultVariants: {
			variant: "default",
			appearance: "bezel",
		},
	},
);

export type buttonProps<T extends ValidComponent = "button"> =
	ButtonRootProps<T> &
		VariantProps<typeof buttonVariants> & {
			class?: string;
		};

export const Button = <T extends ValidComponent = "button">(
	props: PolymorphicProps<T, buttonProps<T>>,
) => {
	const [local, rest] = splitProps(props as buttonProps, [
		"class",
		"variant",
		"appearance",
	]);

	return (
		<ButtonPrimitive
			class={cn(
				buttonVariants({
					appearance: local.appearance,
					variant: local.variant,
				}),
				local.class,
			)}
			{...rest}
		/>
	);
};

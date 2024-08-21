import { cn } from "@/libs/cn";
import type { ButtonRootProps } from "@kobalte/core/button";
import { Button as ButtonPrimitive } from "@kobalte/core/button";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

export const buttonVariants = cva(
	"relative isolate inline-flex justify-center items-center font-medium text-sm rounded-lg py-2 px-6 outline-none appearance-none transition-[background-color,box-shadow,color,outline-color] duration-300 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-[--button-outline] border-none",
	{
		variants: {
			variant: {
				default: [
					"[--button-text:theme(colors.blue.50)] [--button-bg:theme(colors.blue.500)] hover:[--button-bg:theme(colors.blue.600)] active:[--button-bg:theme(colors.blue.700)] [--button-outline:theme(colors.blue.500)]",
					"disabled:[--button-bg:theme(colors.blue.100)] disabled:[--button-text:theme(colors.blue.400)]",
					"dark:disabled:[--button-bg:theme(colors.blue.950)] dark:disabled:[--button-text:theme(colors.blue.700)]",
				],
				destructive: [
					"[--button-text:theme(colors.red.50)] [--button-bg:theme(colors.red.500)] hover:[--button-bg:theme(colors.red.600)] active:[--button-bg:theme(colors.red.700)] [--button-outline:theme(colors.red.500)]",
					"disabled:[--button-bg:theme(colors.red.100)] disabled:[--button-text:theme(colors.red.400)]",
					"dark:disabled:[--button-bg:theme(colors.red.950)] dark:disabled:[--button-text:theme(colors.red.700)]",
				],
			},
			appearance: {
				bezel: [
					"text-[--button-text] bg-[--button-bg] shadow-sm disabled:shadow-none",
					"before:absolute before:inset-0 before:-z-10 before:rounded-lg before:shadow-[inset_0_-1px_0_0_theme(colors.black/25%)] before:disabled:shadow-none",
					"after:absolute after:inset-0 after:-z-10 after:rounded-lg after:shadow-[inset_0_2px_0_0_theme(colors.white/20%)] after:disabled:shadow-none",
				],
				flat: "text-[--button-text] bg-[--button-bg] shadow-sm disabled:shadow-none",
				outline: [
					"[--button-ring:theme(colors.zinc.200)] dark:[--button-ring:theme(colors.zinc.800)]",
					"ring-inset ring-1 ring-[--button-ring] [--button-bg:theme(colors.transparent)] bg-[--button-bg]",
					"hover:[--button-bg:theme(colors.zinc.50)] active:[--button-bg:theme(colors.zinc.100)]",
					"dark:hover:[--button-bg:theme(colors.zinc.900/80%)] dark:active:[--button-bg:theme(colors.zinc.900)] dark:disabled:[--button-bg:theme(colors.transparent)]",
					"disabled:[--button-bg:theme(colors.transparent)] disabled:text-zinc-500",
				],
				plain: [
					"[--button-bg:theme(colors.transparent)] bg-[--button-bg]",
					"hover:[--button-bg:theme(colors.zinc.100)] active:[--button-bg:theme(colors.zinc.200)]",
					"dark:hover:[--button-bg:theme(colors.zinc.900/80%)] dark:active:[--button-bg:theme(colors.zinc.900)] dark:disabled:[--button-bg:theme(colors.transparent)]",
					"disabled:[--button-bg:theme(colors.transparent)] disabled:text-zinc-500",
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

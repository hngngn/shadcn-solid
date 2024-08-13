import { cn } from "@/libs/cn";
import type { ButtonRootProps } from "@kobalte/core/button";
import { Button as ButtonPrimitive } from "@kobalte/core/button";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

export const buttonVariants = cva(
	"relative isolate inline-flex justify-center items-center font-medium text-sm rounded-lg py-2 px-6 outline-none appearance-none transition-[background-color,box-shadow,color,outline-color] duration-300 disabled:cursor-not-allowed",
	{
		variants: {
			variant: {
				default: [
					"[--btn-text:theme(colors.blue.50)] [--btn-bg:theme(colors.blue.500)] hover:[--btn-bg:theme(colors.blue.600)] active:[--btn-bg:theme(colors.blue.700)]",
					"disabled:[--btn-bg:theme(colors.blue.100)] dark:disabled:[--btn-bg:theme(colors.blue.950)] disabled:[--btn-text:theme(colors.blue.400)] dark:disabled:[--btn-text:theme(colors.blue.700)]",
				],
				destructive:
					"[--btn-text:theme(colors.red.50)] [--btn-bg:theme(colors.red.500)] hover:[--btn-bg:theme(colors.red.600)] active:[--btn-bg:theme(colors.red.700)] disabled:[--btn-bg:theme(colors.red.100)] dark:disabled:[--btn-bg:theme(colors.red.950)] disabled:[--btn-text:theme(colors.red.400)] dark:disabled:[--btn-text:theme(colors.red.700)]",
			},
			appearance: {
				bezel: [
					"border-none text-[--btn-text] bg-[--btn-bg] shadow-sm disabled:shadow-none focus-visible:outline focus-visible:outline-[--btn-bg]",
					"before:absolute before:inset-0 before:-z-10 before:rounded-lg before:shadow-[inset_0_-1px_0_0_theme(colors.black/25%)] before:disabled:shadow-none",
					"after:absolute after:inset-0 after:-z-10 after:rounded-lg after:shadow-[inset_0_2px_0_0_theme(colors.white/20%)] after:disabled:shadow-none",
				],
				flat: "text-[--btn-text] bg-[--btn-bg] shadow-sm disabled:shadow-none focus-visible:outline focus-visible:outline-[--btn-bg]",
				outline:
					"ring-inset ring ring-[--btn-border] bg-[--btn-bg] text-[--btn-text] focus-visible:outline focus-visible:outline-[--btn-ring]",
				plain:
					"bg-inherit text-[--btn-text] focus-visible:outline focus-visible:outline-[--btn-bg]",
			},
		},
		defaultVariants: {
			variant: "default",
			appearance: "bezel",
		},
		compoundVariants: [
			{
				appearance: "outline",
				variant: "default",
				class: [
					"[--btn-text:theme(colors.primary.DEFAULT)] [--btn-border:theme(colors.border)] [--btn-ring:theme(colors.blue.500)] [--btn-bg:theme(colors.transparent)]",
					"hover:[--btn-bg:theme(colors.zinc.50)] dark:hover:[--btn-bg:theme(colors.zinc.900)]",
					"active:[--btn-bg:theme(colors.zinc.100)] dark:active:[--btn-bg:theme(colors.zinc.900/50%)]",
				],
			},
			{
				appearance: "outline",
				variant: "destructive",
				class: [
					"[--btn-text:theme(colors.red.500)] [--btn-border:theme(colors.red.500)] [--btn-ring:theme(colors.red.500)] [--btn-bg:theme(colors.transparent)]",
					"hover:[--btn-bg:theme(colors.red.100)] dark:hover:[--btn-bg:theme(colors.red.900)]",
					"active:[--btn-bg:theme(colors.red.200)] dark:active:[--btn-bg:theme(colors.red.950)]",
				],
			},
			{
				appearance: "plain",
				variant: "destructive",
				class:
					"[--btn-text:theme(colors.red.500)] hover:[--btn-text:theme(colors.red.600)] active:[--btn-text:theme(colors.red.700)]",
			},
			{
				appearance: "plain",
				variant: "default",
				class:
					"[--btn-text:theme(colors.primary.DEFAULT)] hover:[--btn-text:theme(colors.primary.DEFAULT/70%)] active:[--btn-text:theme(colors.primary.DEFAULT/60%)]",
			},
		],
	},
);

type buttonProps<T extends ValidComponent = "button"> = ButtonRootProps<T> &
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

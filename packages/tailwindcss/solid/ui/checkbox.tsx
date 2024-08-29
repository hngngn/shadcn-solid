import { cn } from "@/libs/cn";
import type {
	CheckboxControlProps,
	CheckboxDescriptionProps,
	CheckboxErrorMessageProps,
	CheckboxLabelProps,
	CheckboxRootProps,
} from "@kobalte/core/checkbox";
import { Checkbox as CheckboxPrimitive } from "@kobalte/core/checkbox";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { cva } from "class-variance-authority";
import type { JSXElement, ValidComponent, VoidProps } from "solid-js";
import { Match, Switch, splitProps } from "solid-js";

export type checkboxProps<T extends ValidComponent = "div"> =
	CheckboxRootProps<T> & {
		class?: string;
	};

export const Checkbox = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, checkboxProps<T>>,
) => {
	const [local, rest] = splitProps(props as checkboxProps, ["class"]);

	return (
		<CheckboxPrimitive class={cn("flex gap-x-2", local.class)} {...rest} />
	);
};

export type checkboxLabelProps<T extends ValidComponent = "label"> =
	CheckboxLabelProps<T> & {
		class?: string;
	};

export const CheckboxLabel = <T extends ValidComponent = "label">(
	props: PolymorphicProps<T, checkboxLabelProps<T>>,
) => {
	const [local, rest] = splitProps(props as checkboxLabelProps, ["class"]);

	return (
		<CheckboxPrimitive.Label
			class={cn(
				"text-sm font-medium select-none cursor-pointer data-[disabled]:cursor-not-allowed",
				local.class,
			)}
			{...rest}
		/>
	);
};

export type checkboxDescriptionProps<T extends ValidComponent = "div"> =
	CheckboxDescriptionProps<T> & {
		class?: string;
	};

export const CheckboxDescription = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, checkboxDescriptionProps<T>>,
) => {
	const [local, rest] = splitProps(props as checkboxDescriptionProps, [
		"class",
	]);

	return (
		<CheckboxPrimitive.Description
			class={cn("text-sm/6 text-muted-foreground select-none", local.class)}
			{...rest}
		/>
	);
};

export type checkboxErrorMessageProps<T extends ValidComponent = "div"> =
	CheckboxErrorMessageProps<T> & {
		class?: string;
	};

export const CheckboxErrorMessage = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, checkboxErrorMessageProps<T>>,
) => {
	const [local, rest] = splitProps(props as checkboxErrorMessageProps, [
		"class",
	]);

	return (
		<CheckboxPrimitive.ErrorMessage
			class={cn("text-xs/6 text-red-500 font-medium", local.class)}
			{...rest}
		/>
	);
};

export type checkboxControlProps<T extends ValidComponent = "div"> = VoidProps<
	CheckboxControlProps<T> & {
		class?: string;
		icon?: JSXElement;
		indeterminate?: boolean;
	}
>;

export const checkboxContentVariant = cva(
	"size-4 shrink-0 rounded-sm transition-[box-shadow,border-color,background-color,color,opacity] duration-300 border cursor-pointer data-[disabled]:opacity-50 data-[disabled]:text-transparent data-[disabled]:cursor-not-allowed",
	{
		variants: {
			valid: {
				true: [
					// main
					"bg-zinc-100 border-zinc-200 text-white",
					// main - dark
					"dark:bg-zinc-900 dark:border-zinc-800",
					// hover
					"[&:is(:not([data-disabled]))]:hover:bg-zinc-200 [&:is(:not([data-disabled]))]:hover:border-zinc-300 [&:is(:not([data-disabled]))]:peer-hover:bg-zinc-200 [&:is(:not([data-disabled]))]:peer-hover:border-zinc-300",
					// hover - dark
					"dark:[&:is(:not([data-disabled]))]:hover:bg-zinc-800 dark:[&:is(:not([data-disabled]))]:hover:border-zinc-700 dark:[&:is(:not([data-disabled]))]:peer-hover:bg-zinc-800 dark:[&:is(:not([data-disabled]))]:peer-hover:border-zinc-700",
					// checked
					"[&:is([data-checked],[data-indeterminate]):not([data-invalid],[data-disabled])]:bg-blue-600 [&:is([data-checked],[data-indeterminate]):not([data-invalid],[data-disabled])]:border-blue-600 [&:is([data-checked],[data-indeterminate]):not([data-invalid],[data-disabled])]:hover:bg-blue-700 [&:is([data-checked],[data-indeterminate]):not([data-invalid],[data-disabled])]:hover:border-blue-700 [&:is([data-checked],[data-indeterminate]):not([data-invalid],[data-disabled])]:peer-hover:bg-blue-700 [&:is([data-checked],[data-indeterminate]):not([data-invalid],[data-disabled])]:peer-hover:border-blue-700",
					// checked - dark
					"dark:[&:is([data-checked],[data-indeterminate]):not([data-invalid],[data-disabled])]:bg-blue-600 dark:[&:is([data-checked],[data-indeterminate]):not([data-invalid],[data-disabled])]:border-blue-600 dark:[&:is([data-checked],[data-indeterminate]):not([data-invalid],[data-disabled])]:hover:bg-blue-700 dark:[&:is([data-checked],[data-indeterminate]):not([data-invalid],[data-disabled])]:hover:border-blue-700 dark:[&:is([data-checked],[data-indeterminate]):not([data-invalid],[data-disabled])]:peer-hover:bg-blue-700 dark:[&:is([data-checked],[data-indeterminate]):not([data-invalid],[data-disabled])]:peer-hover:border-blue-700",
				],
			},
			invalid: {
				true: [
					// main
					"data-[invalid]:bg-red-100 data-[invalid]:border-red-200",
					// main - dark
					"dark:data-[invalid]:bg-red-950 dark:data-[invalid]:border-red-800",
					// hover
					"[&:is(:not([data-disabled]))]:data-[invalid]:hover:bg-red-200 [&:is(:not([data-disabled]))]:data-[invalid]:hover:border-red-300 [&:is(:not([data-disabled]))]:data-[invalid]:peer-hover:bg-red-200 [&:is(:not([data-disabled]))]:data-[invalid]:peer-hover:border-red-300",
					// hover - dark
					"dark:[&:is(:not([data-disabled]))]:data-[invalid]:hover:bg-red-950 dark:[&:is(:not([data-disabled]))]:data-[invalid]:hover:border-red-700 dark:[&:is(:not([data-disabled]))]:data-[invalid]:peer-hover:bg-red-950 dark:[&:is(:not([data-disabled]))]:data-[invalid]:peer-hover:border-red-700",
					// checked
					"[&:is([data-invalid][data-checked],[data-invalid][data-indeterminate]):not([data-disabled])]:bg-red-500 [&:is([data-invalid][data-checked],[data-invalid][data-indeterminate]):not([data-disabled])]:border-red-500 [&:is([data-invalid][data-checked],[data-invalid][data-indeterminate]):not([data-disabled])]:hover:bg-red-600 [&:is([data-invalid][data-checked],[data-invalid][data-indeterminate]):not([data-disabled])]:hover:border-red-600 [&:is([data-invalid][data-checked],[data-invalid][data-indeterminate]):not([data-disabled])]:peer-hover:bg-red-600 [&:is([data-invalid][data-checked],[data-invalid][data-indeterminate]):not([data-disabled])]:peer-hover:border-red-600",
					// checked - dark
					"dark:[&:is([data-invalid][data-checked],[data-invalid][data-indeterminate]):not([data-disabled])]:bg-red-600 dark:[&:is([data-invalid][data-checked],[data-invalid][data-indeterminate]):not([data-disabled])]:border-red-600 dark:[&:is([data-invalid][data-checked],[data-invalid][data-indeterminate]):not([data-disabled])]:hover:bg-red-700 dark:[&:is([data-invalid][data-checked],[data-invalid][data-indeterminate]):not([data-disabled])]:hover:border-red-700 dark:[&:is([data-invalid][data-checked],[data-invalid][data-indeterminate]):not([data-disabled])]:peer-hover:bg-red-700 dark:[&:is([data-invalid][data-checked],[data-invalid][data-indeterminate]):not([data-disabled])]:peer-hover:border-red-700",
				],
			},
			focus: {
				true: [
					// main
					"peer-focus-visible:outline-none peer-focus-visible:ring-4 peer-focus-visible:ring-blue-200 peer-focus-visible:border-blue-500",
					// dark
					"dark:peer-focus-visible:ring-blue-500/40",
				],
			},
		},
		compoundVariants: [
			{
				invalid: true,
				focus: true,
				class: [
					// main
					"data-[invalid]:peer-focus-visible:ring-red-200 data-[invalid]:peer-focus-visible:border-red-500",
					// dark
					"dark:data-[invalid]:peer-focus-visible:ring-red-500/40",
				],
			},
		],
		defaultVariants: {
			focus: true,
			invalid: true,
			valid: true,
		},
	},
);

export const CheckboxControl = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, checkboxControlProps<T>>,
) => {
	const [local, rest] = splitProps(props as checkboxControlProps, [
		"class",
		"icon",
		"indeterminate",
	]);

	return (
		<div class="flex items-start mt-[0.15rem]">
			<CheckboxPrimitive.Input class="peer" />
			<CheckboxPrimitive.Control
				class={cn(checkboxContentVariant(), local.class)}
				{...rest}
			>
				<CheckboxPrimitive.Indicator
					class="flex items-center justify-center size-full [&>svg]:animate-in [&>svg]:zoom-in [&>svg]:fade-in-0 [&>svg]:duration-300"
					forceMount={local.indeterminate}
				>
					<Switch>
						<Match when={!local.icon && !local.indeterminate}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="m5 12l5 5L20 7"
								/>
								<title>Checked</title>
							</svg>
						</Match>
						<Match when={local.icon && !local.indeterminate}>
							{local.icon}
						</Match>
						<Match when={local.indeterminate}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path
									fill="none"
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 12h14"
								/>
								<title>Indeterminate</title>
							</svg>
						</Match>
					</Switch>
				</CheckboxPrimitive.Indicator>
			</CheckboxPrimitive.Control>
		</div>
	);
};

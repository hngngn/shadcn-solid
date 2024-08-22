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
			class={cn("text-sm font-medium select-none", local.class)}
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
	props: PolymorphicProps<T, CheckboxErrorMessageProps<T>>,
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

export const CheckboxControl = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, checkboxControlProps<T>>,
) => {
	const [local, rest] = splitProps(props as checkboxControlProps, [
		"class",
		"children",
		"icon",
		"indeterminate",
	]);

	return (
		<div class="flex items-start mt-[0.15rem]">
			<CheckboxPrimitive.Input class="peer" />
			<CheckboxPrimitive.Control
				class={cn(
					"[--checkbox-control-border:theme(colors.zinc.300)] [--checkbox-control-bg:theme(colors.zinc.50)] [--checkbox-control-text:theme(colors.white)]",
					"peer-focus-visible:outline-none peer-focus-visible:ring-4 peer-focus-visible:ring-blue-200 peer-focus-visible:[--checkbox-control-border:theme(colors.blue.500)]",
					"peer-hover:[--checkbox-control-bg:theme(colors.zinc.200)] hover:[--checkbox-control-bg:theme(colors.zinc.200)]",
					"has-[[data-checked],[data-indeterminate]]:[--checkbox-control-bg:theme(colors.blue.500)] has-[[data-checked],[data-indeterminate]]:peer-hover:[--checkbox-control-bg:theme(colors.blue.500)] has-[[data-checked],[data-indeterminate]]:hover:[--checkbox-control-bg:theme(colors.blue.500)] has-[[data-checked],[data-indeterminate]]:border-[--checkbox-control-bg]",
					"data-[invalid]:[--checkbox-control-bg:theme(colors.red.100)] data-[invalid]:[--checkbox-control-border:theme(colors.red.400)] data-[invalid]:peer-hover:[--checkbox-control-bg:theme(colors.red.300)] data-[invalid]:hover:[--checkbox-control-bg:theme(colors.red.300)] data-[invalid]:peer-focus-visible:ring-red-200 data-[invalid]:peer-focus-visible:[--checkbox-control-border:theme(colors.red.500)]",
					"has-[[data-checked][data-invalid]]:[--checkbox-control-bg:theme(colors.red.500)] has-[[data-checked][data-invalid]]:peer-hover:[--checkbox-control-bg:theme(colors.red.500)] has-[[data-checked][data-invalid]]:hover:[--checkbox-control-bg:theme(colors.red.500)]",
					"size-4 shrink-0 rounded-sm transition-[box-shadow,border-color,background-color,color] duration-300 border border-[--checkbox-control-border] bg-[--checkbox-control-bg] text-[--checkbox-control-text]",
					local.class,
				)}
				{...rest}
			>
				<CheckboxPrimitive.Indicator
					class="flex items-center justify-center size-full [&>svg]:animate-in [&>svg]:zoom-in [&>svg]:fade-in-0 [&>svg]:duration-300"
					data-checked
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

import { cn } from "@/libs/cn";
import type {
	CheckboxControlProps,
	CheckboxRootProps,
} from "@kobalte/core/checkbox";
import { Checkbox as CheckboxPrimitive } from "@kobalte/core/checkbox";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type {
	JSXElement,
	ParentProps,
	ValidComponent,
	VoidProps,
} from "solid-js";
import { Show, splitProps } from "solid-js";

export type checkboxProps<T extends ValidComponent = "div"> = ParentProps<
	CheckboxRootProps<T> & {
		class?: string;
		title?: string;
		description?: string;
		error?: string;
	}
>;

export const Checkbox = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, checkboxProps<T>>,
) => {
	const [local, rest] = splitProps(props as checkboxProps, [
		"class",
		"children",
		"title",
		"description",
		"error",
	]);

	return (
		<CheckboxPrimitive class={cn("flex gap-x-2", local.class)} {...rest}>
			{local.children}
			<Show
				when={
					local.title || local.description || rest.validationState === "invalid"
				}
			>
				<div class="flex flex-col gap-y-1">
					<Show when={local.title}>
						<CheckboxPrimitive.Label class="text-sm font-medium select-none grid-col-end-0">
							{local.title}
						</CheckboxPrimitive.Label>
					</Show>
					<Show when={local.description}>
						<CheckboxPrimitive.Description class="text-sm/6 text-muted-foreground select-none grid-col-start-2">
							{local.description}
						</CheckboxPrimitive.Description>
					</Show>
					<CheckboxPrimitive.ErrorMessage class="text-xs/6 text-red-500 font-medium grid-col-start-2">
						{local.error}
					</CheckboxPrimitive.ErrorMessage>
				</div>
			</Show>
		</CheckboxPrimitive>
	);
};

export type checkboxControlProps<T extends ValidComponent = "div"> = VoidProps<
	CheckboxControlProps<T> & { class?: string; icon?: JSXElement }
>;

export const CheckboxControl = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, checkboxControlProps<T>>,
) => {
	const [local, rest] = splitProps(props as checkboxControlProps, [
		"class",
		"children",
		"icon",
	]);

	return (
		<div class="flex items-start mt-[0.15rem]">
			<CheckboxPrimitive.Input class="peer" />
			<CheckboxPrimitive.Control
				class={cn(
					"[--checkbox-control-border:theme(colors.zinc.300)] [--checkbox-control-bg:theme(colors.zinc.50)] [--checkbox-control-text:theme(colors.white)]",
					"peer-focus-visible:outline-none peer-focus-visible:ring-4 peer-focus-visible:ring-blue-200 peer-focus-visible:[--checkbox-control-border:theme(colors.blue.500)]",
					"peer-hover:[--checkbox-control-bg:theme(colors.zinc.200)] hover:[--checkbox-control-bg:theme(colors.zinc.200)]",
					"data-[checked]:[--checkbox-control-bg:theme(colors.blue.500)] data-[checked]:peer-hover:[--checkbox-control-bg:theme(colors.blue.500)] data-[checked]:hover:[--checkbox-control-bg:theme(colors.blue.500)] data-[checked]:border-[--checkbox-control-bg]",
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
					<Show
						when={local.icon}
						fallback={
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
						}
					>
						{local.icon}
					</Show>
				</CheckboxPrimitive.Indicator>
			</CheckboxPrimitive.Control>
		</div>
	);
};

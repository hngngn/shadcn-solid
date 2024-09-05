import { cn } from "@/libs/cn";
import type {
	ComboboxContentProps,
	ComboboxControlProps,
	ComboboxDescriptionProps,
	ComboboxErrorMessageProps,
	ComboboxInputProps,
	ComboboxItemProps,
	ComboboxTriggerProps,
} from "@kobalte/core/combobox";
import { Combobox as ComboboxPrimitive } from "@kobalte/core/combobox";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ParentProps, ValidComponent, VoidProps } from "solid-js";
import { Show, splitProps } from "solid-js";

export const Combobox = ComboboxPrimitive;
export const ComboboxHiddenSelect = ComboboxPrimitive.HiddenSelect;

export type comboboxErrorMessageProps<T extends ValidComponent = "div"> =
	ComboboxErrorMessageProps<T> & {
		class?: string;
	};

export const ComboboxErrorMessage = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, comboboxErrorMessageProps<T>>,
) => {
	const [local, rest] = splitProps(props as comboboxErrorMessageProps, [
		"class",
	]);

	return (
		<ComboboxPrimitive.ErrorMessage
			class={cn(
				"text-sm/6 text-destructive-foreground select-none pt-1.5 pl-1",
				local.class,
			)}
			{...rest}
		/>
	);
};

export type comboboxDescriptionProps<T extends ValidComponent = "div"> =
	ComboboxDescriptionProps<T> & {
		class?: string;
	};

export const ComboboxDescription = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, comboboxDescriptionProps<T>>,
) => {
	const [local, rest] = splitProps(props as comboboxDescriptionProps, [
		"class",
	]);

	return (
		<ComboboxPrimitive.Description
			class={cn(
				"text-sm/6 text-accent-foreground select-none pt-1.5 pl-1",
				local.class,
			)}
			{...rest}
		/>
	);
};

export type comboboxInputProps<T extends ValidComponent = "input"> = VoidProps<
	ComboboxInputProps<T> & {
		class?: string;
	}
>;

export const ComboboxInput = <T extends ValidComponent = "input">(
	props: PolymorphicProps<T, comboboxInputProps<T>>,
) => {
	const [local, rest] = splitProps(props as comboboxInputProps, ["class"]);

	return (
		<ComboboxPrimitive.Input
			class={cn(
				"size-full text-sm focus:outline-none bg-inherit pl-2",
				"disabled:(cursor-not-allowed opacity-50)",
				local.class,
			)}
			{...rest}
		/>
	);
};

export type comboboxControlProps<T extends ValidComponent = "div"> =
	ParentProps<
		ComboboxControlProps<T> & {
			class?: string;
		}
	>;

export const ComboboxControl = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, comboboxControlProps<T>>,
) => {
	const [local, rest] = splitProps(props as comboboxControlProps, ["class"]);

	return (
		<ComboboxPrimitive.Control
			class={cn(
				"h-9 rounded-lg border transition-[box-shadow,border-color] duration-300 inline-flex justify-between overflow-hidden",
				"has-[input:focus-visible]:(ring-2 ring-offset-2)",
				"data-[invalid]:(border-destructive ring-destructive has-[input:focus-visible]:border-alt_border)",
				"dark:bg-accent",
				local.class,
			)}
			{...rest}
		/>
	);
};

export type comboboxTriggerProps<T extends ValidComponent = "button"> =
	ParentProps<
		ComboboxTriggerProps<T> & {
			class?: string;
		}
	>;

export const ComboboxTrigger = <T extends ValidComponent = "button">(
	props: PolymorphicProps<T, comboboxTriggerProps<T>>,
) => {
	const [local, rest] = splitProps(props as comboboxTriggerProps, [
		"class",
		"children",
	]);

	return (
		<ComboboxPrimitive.Trigger
			class={cn(
				"bg-inherit px-2",
				"disabled:(cursor-not-allowed opacity-50)",
				local.class,
			)}
			{...rest}
		>
			<ComboboxPrimitive.Icon class="[&>svg]:(size-4 transition-transform duration-300) [&>svg]:data-[expanded]:rotate-180">
				<Show
					when={local.children}
					fallback={
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								fill="none"
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m6 9l6 6l6-6"
							/>
							<title>Open</title>
						</svg>
					}
				>
					{local.children}
				</Show>
			</ComboboxPrimitive.Icon>
		</ComboboxPrimitive.Trigger>
	);
};

export type comboboxContentProps<T extends ValidComponent = "div"> =
	ComboboxContentProps<T> & {
		class?: string;
	};

export const ComboboxContent = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, comboboxContentProps<T>>,
) => {
	const [local, rest] = splitProps(props as comboboxContentProps, ["class"]);

	return (
		<ComboboxPrimitive.Portal>
			<ComboboxPrimitive.Content
				class={cn(
					"relative z-50 overflow-hidden rounded-lg border shadow-sm bg-background",
					"data-[expanded]:(animate-in fade-in slide-in-t-2 animate-duration-300)",
					"data-[closed]:(animate-out fade-out slide-out-t-1 animate-duration-300)",
					"dark:bg-accent",
					local.class,
				)}
				{...rest}
			>
				<ComboboxPrimitive.Listbox class="p-1" />
			</ComboboxPrimitive.Content>
		</ComboboxPrimitive.Portal>
	);
};

export type comboboxItemProps<T extends ValidComponent = "li"> = VoidProps<
	ComboboxItemProps<T> & {
		class?: string;
		title: string;
		description?: string;
	}
>;

export const ComboboxItem = <T extends ValidComponent = "li">(
	props: PolymorphicProps<T, comboboxItemProps<T>>,
) => {
	const [local, rest] = splitProps(props as comboboxItemProps, [
		"class",
		"title",
		"description",
	]);

	return (
		<ComboboxPrimitive.Item
			class={cn(
				"text-sm flex justify-between p-1.5 rounded-md select-none gap-x-2",
				"data-[highlighted]:(bg-active text-white)",
				"data-[disabled]:(cursor-not-allowed opacity-50)",
				local.class,
			)}
			{...rest}
		>
			<div>
				<ComboboxPrimitive.ItemLabel>{local.title}</ComboboxPrimitive.ItemLabel>
				<ComboboxPrimitive.ItemDescription class="text-sm/6 text-accent-foreground">
					{local.description}
				</ComboboxPrimitive.ItemDescription>
			</div>
			<ComboboxPrimitive.ItemIndicator class="flex items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					class="size-4"
				>
					<path
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m5 12l5 5L20 7"
					/>
					<title>Selected</title>
				</svg>
			</ComboboxPrimitive.ItemIndicator>
		</ComboboxPrimitive.Item>
	);
};

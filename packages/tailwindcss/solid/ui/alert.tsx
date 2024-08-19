import { cn } from "@/libs/cn";
import type { AlertRootProps } from "@kobalte/core/alert";
import { Alert as AlertPrimitive } from "@kobalte/core/alert";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type {
	ComponentProps,
	JSXElement,
	ParentProps,
	ValidComponent,
} from "solid-js";
import { Show, splitProps } from "solid-js";

export const alertVariants = cva(
	"w-full rounded-xl ring-inset ring-1 p-4 flex gap-x-3 text-sm",
	{
		variants: {
			variant: {
				default: [
					"[--alert-ring:theme(colors.zinc.200)] [--alert-bg:inherit] [--alert-text:inherit]",
					"dark:[--alert-ring:theme(colors.zinc.800)] dark:[--alert-bg:theme(colors.zinc.900/50%)]",
					"ring-[--alert-ring] bg-[--alert-bg] text-[--alert-text]",
				],
				destructive: [
					"[--alert-ring:theme(colors.red.400)] [--alert-bg:theme(colors.red.100)] [--alert-text:theme(colors.red.600)]",
					"dark:[--alert-ring:theme(colors.red.800)] dark:[--alert-bg:theme(colors.red.900/50%)] dark:[--alert-text:theme(colors.red.100)]",
					"ring-[--alert-ring] bg-[--alert-bg] text-[--alert-text]",
				],
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export type alertProps<T extends ValidComponent = "div"> = ParentProps<
	AlertRootProps<T> &
		VariantProps<typeof alertVariants> & {
			class?: string;
			icon?: JSXElement;
		}
>;

export const Alert = <T extends ValidComponent = "div">(
	props: PolymorphicProps<T, alertProps<T>>,
) => {
	const [local, rest] = splitProps(props as alertProps, [
		"class",
		"variant",
		"icon",
		"children",
	]);

	return (
		<AlertPrimitive
			class={cn(
				alertVariants({
					variant: props.variant,
				}),
				local.class,
			)}
			{...rest}
		>
			<Show when={local.icon}>
				<div class="py-0.5 [&>svg]:size-4">{local.icon}</div>
			</Show>
			<div>{local.children}</div>
		</AlertPrimitive>
	);
};

export const AlertTitle = (props: ComponentProps<"h2">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return <h2 class={cn("text-sm font-medium", local.class)} {...rest} />;
};

export const AlertDescription = (props: ComponentProps<"p">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return <p class={cn("text-sm mt-1", local.class)} {...rest} />;
};

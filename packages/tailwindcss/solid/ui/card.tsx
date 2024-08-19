import { cn } from "@/libs/cn";
import type { ComponentProps } from "solid-js";
import { splitProps } from "solid-js";

export const Card = (props: ComponentProps<"div">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<div
			class={cn(
				"[--card-ring:theme(colors.zinc.200)] [--card-bg:inherit]",
				"dark:[--card-ring:theme(colors.zinc.800)] dark:[--card-bg:theme(colors.zinc.900/50%)]",
				"rounded-xl ring-inset ring-1 ring-[--card-ring] bg-[--card-bg] w-fit shadow-sm",
				local.class,
			)}
			{...rest}
		/>
	);
};

export const CardHeader = (props: ComponentProps<"div">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<div class={cn("flex flex-col space-y-1.5 p-6", local.class)} {...rest} />
	);
};

export const CardTitle = (props: ComponentProps<"h1">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<h1
			class={cn(
				"text-lg font-semibold leading-none tracking-tight",
				local.class,
			)}
			{...rest}
		/>
	);
};

export const CardDescription = (props: ComponentProps<"h3">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return (
		<h3 class={cn("text-sm text-muted-foreground", local.class)} {...rest} />
	);
};

export const CardContent = (props: ComponentProps<"div">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return <div class={cn("p-6 pt-0 text-sm", local.class)} {...rest} />;
};

export const CardFooter = (props: ComponentProps<"div">) => {
	const [local, rest] = splitProps(props, ["class"]);

	return <div class={cn("p-6 pt-0", local.class)} {...rest} />;
};

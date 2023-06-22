import { splitProps, type ComponentProps, type ParentComponent } from "solid-js"

export const Card: ParentComponent<ComponentProps<"div">> = (props) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<div
			class="rounded-lg border bg-card text-card-foreground shadow-sm"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

export const CardHeader: ParentComponent<ComponentProps<"div">> = (props) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<div
			class="flex flex-col space-y-1.5 p-6"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

export const CardTitle: ParentComponent<ComponentProps<"h3">> = (props) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<h3
			class="text-lg font-semibold leading-none tracking-tight"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

export const CardDescription: ParentComponent<ComponentProps<"h3">> = (
	props
) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<h3
			class="text-sm text-muted-foreground"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

export const CardContent: ParentComponent<ComponentProps<"div">> = (props) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<div
			class="p-6 pt-0"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

export const CardFooter: ParentComponent<ComponentProps<"div">> = (props) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<div
			class="flex items-center p-6 pt-0"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

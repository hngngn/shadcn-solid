import { AlertDialog as AlertDialogPrimitive } from "@kobalte/core"
import type { ComponentProps } from "solid-js"
import { splitProps, type ParentComponent } from "solid-js"
import { buttonVariants } from "./button"

export const AlertDialog = AlertDialogPrimitive.Root
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger

export const AlertDialogOverlay: ParentComponent<
	AlertDialogPrimitive.AlertDialogOverlayProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<AlertDialogPrimitive.Overlay
			class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-fade-out data-[expanded]:animate-fade-in"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

export const AlertDialogContent: ParentComponent<
	AlertDialogPrimitive.AlertDialogContentProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class"])

	return (
		<AlertDialogPrimitive.Portal>
			<AlertDialogOverlay />
			<div class="fixed flex justify-center items-center inset-0 z-50">
				<AlertDialogPrimitive.Content
					class="z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full animate-content-hide data-[expanded]:animate-content-show"
					classList={{
						[local.class!]: local.class !== undefined,
					}}
					{...rest}
				/>
			</div>
		</AlertDialogPrimitive.Portal>
	)
}

export const AlertDialogHeader: ParentComponent<ComponentProps<"div">> = (
	props
) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<div
			class="flex flex-col space-y-2 text-center sm:text-left"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

export const AlertDialogFooter: ParentComponent<ComponentProps<"div">> = (
	props
) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<div
			class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

export const AlertDialogTitle: ParentComponent<
	AlertDialogPrimitive.AlertDialogTitleProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<AlertDialogPrimitive.Title
			class="text-lg font-semibold"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

export const AlertDialogDescription: ParentComponent<
	AlertDialogPrimitive.AlertDialogDescriptionProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<AlertDialogPrimitive.Description
			class="text-sm text-muted-foreground"
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

export const AlertDialogClose: ParentComponent<
	AlertDialogPrimitive.AlertDialogCloseButtonProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<AlertDialogPrimitive.CloseButton
			class={`${buttonVariants({ variant: "outline" })} mt-2 sm:mt-0`}
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

export const AlertDialogAction: ParentComponent<
	AlertDialogPrimitive.AlertDialogCloseButtonProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<AlertDialogPrimitive.CloseButton
			class={buttonVariants()}
			classList={{
				[local.class!]: local.class !== undefined,
			}}
			{...rest}
		/>
	)
}

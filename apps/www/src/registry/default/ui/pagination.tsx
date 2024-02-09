import { cn } from "@/lib/cn"
import { Pagination as PaginationPrimitive } from "@kobalte/core"
import type { VariantProps } from "class-variance-authority"
import type { VoidComponent } from "solid-js"
import { mergeProps, splitProps, type ParentComponent } from "solid-js"
import { buttonVariants } from "./button"

export const PaginationItems = PaginationPrimitive.Items

export const Pagination: ParentComponent<
	PaginationPrimitive.PaginationRootProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class"])

	return (
		<PaginationPrimitive.Root
			class={cn(
				"mx-auto flex w-full justify-center [&>ul]:flex [&>ul]:flex-row [&>ul]:items-center [&>ul]:gap-1",
				local.class
			)}
			{...rest}
		/>
	)
}

export const PaginationItem: ParentComponent<
	PaginationPrimitive.PaginationItemProps &
		Pick<VariantProps<typeof buttonVariants>, "size">
> = (props) => {
	const merge = mergeProps(
		{ size: "icon" } satisfies Pick<
			VariantProps<typeof buttonVariants>,
			"size"
		>,
		props
	)
	const [local, rest] = splitProps(merge, ["class", "size"])

	return (
		<PaginationPrimitive.Item
			class={cn(
				buttonVariants({
					variant: "ghost",
					size: local.size,
				}),
				"aria-[current=page]:border aria-[current=page]:border-input aria-[current=page]:bg-background aria-[current=page]:shadow-sm aria-[current=page]:hover:bg-accent aria-[current=page]:hover:text-accent-foreground",
				local.class
			)}
			{...rest}
		/>
	)
}

export const PaginationEllipsis: VoidComponent<
	PaginationPrimitive.PaginationEllipsisProps
> = (props) => {
	const [local, rest] = splitProps(props, ["class"])

	return (
		<PaginationPrimitive.Ellipsis
			class={cn("flex h-9 w-9 items-center justify-center", local.class)}
			{...rest}
		>
			<span class="icon-[tabler--dots] h-4 w-4" />
			<span class="sr-only">More pages</span>
		</PaginationPrimitive.Ellipsis>
	)
}

export const PaginationPrevious: VoidComponent<
	PaginationPrimitive.PaginationPreviousProps &
		Pick<VariantProps<typeof buttonVariants>, "size">
> = (props) => {
	const merge = mergeProps(
		{ size: "icon" } satisfies Pick<
			VariantProps<typeof buttonVariants>,
			"size"
		>,
		props
	)
	const [local, rest] = splitProps(merge, ["class", "size"])

	return (
		<PaginationPrimitive.Previous
			class={cn(
				buttonVariants({
					variant: "ghost",
					size: local.size,
				}),
				"aria-[current=page]:border aria-[current=page]:border-input aria-[current=page]:bg-background aria-[current=page]:shadow-sm aria-[current=page]:hover:bg-accent aria-[current=page]:hover:text-accent-foreground",
				local.class
			)}
			{...rest}
		>
			<span class="icon-[tabler--chevron-left] h-4 w-4" />
		</PaginationPrimitive.Previous>
	)
}

export const PaginationNext: VoidComponent<
	PaginationPrimitive.PaginationNextProps &
		Pick<VariantProps<typeof buttonVariants>, "size">
> = (props) => {
	const merge = mergeProps(
		{ size: "icon" } satisfies Pick<
			VariantProps<typeof buttonVariants>,
			"size"
		>,
		props
	)
	const [local, rest] = splitProps(merge, ["class", "size"])

	return (
		<PaginationPrimitive.Next
			class={cn(
				buttonVariants({
					variant: "ghost",
					size: local.size,
				}),
				"aria-[current=page]:border aria-[current=page]:border-input aria-[current=page]:bg-background aria-[current=page]:shadow-sm aria-[current=page]:hover:bg-accent aria-[current=page]:hover:text-accent-foreground",
				local.class
			)}
			{...rest}
		>
			<span class="icon-[tabler--chevron-right] h-4 w-4" />
		</PaginationPrimitive.Next>
	)
}

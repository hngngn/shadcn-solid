import { Separator } from "@/registry/default/ui/separator"
import { A } from "@solidjs/router"

export const Announcement = () => {
	return (
		<A
			href="/docs/changelog"
			class="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
		>
			🎉{" "}
			<Separator
				class="mx-2 data-[orientation=vertical]:h-4"
				orientation="vertical"
			/>{" "}
			<span class="sm:hidden">New components and more.</span>
			<span class="hidden sm:inline">
				New components, cli updates and more.
			</span>
			<span class="icon-[tabler--arrow-right] ml-1 h-4 w-4" />
		</A>
	)
}

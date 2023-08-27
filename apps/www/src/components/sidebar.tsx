import { docsConfig } from "@/config/docs"
import { For } from "solid-js"
import { SidebarItem } from "./sidebar-item"

export const Sidebar = () => {
	return (
		<div class="w-full">
			<For each={docsConfig.sidebarNav}>
				{(item) => (
					<div class="pb-4">
						<h4 class="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
							{item.title}
						</h4>
						<SidebarItem items={item.items} />
					</div>
				)}
			</For>
		</div>
	)
}

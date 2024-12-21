import AppSidebar from "@/registry/tailwindcss/blocks/sidebar-03/components/app-sidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarSeparator,
	SidebarTrigger,
} from "@/registry/tailwindcss/ui/sidebar";

const Page = () => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header class="flex h-16 shrink-0 items-center gap-2">
					<div class="flex items-center gap-2 px-4">
						<SidebarTrigger class="-ml-1" />
						<SidebarSeparator orientation="vertical" class="mr-2 h-4" />
					</div>
				</header>
				<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
					<div class="grid auto-rows-min gap-4 md:grid-cols-3">
						<div class="aspect-video rounded-xl bg-muted/50" />
						<div class="aspect-video rounded-xl bg-muted/50" />
						<div class="aspect-video rounded-xl bg-muted/50" />
					</div>
					<div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
};

export default Page;

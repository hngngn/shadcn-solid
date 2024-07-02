import { cn } from "@/libs/cn";
import {
	Resizable,
	ResizableHandle,
	ResizablePanel,
} from "@repo/tailwindcss/ui/resizable";
import { Separator } from "@repo/tailwindcss/ui/separator";
import {
	Tabs,
	TabsContent,
	TabsIndicator,
	TabsList,
	TabsTrigger,
} from "@repo/tailwindcss/ui/tabs";
import { TextField, TextFieldRoot } from "@repo/tailwindcss/ui/textfield";
import { cookieStorage, makePersisted } from "@solid-primitives/storage";
import { createSignal } from "solid-js";
import { AccountSwitcher } from "./account-switcher";
import { MailDisplay } from "./mail-display";
import { MailList } from "./mail-list";
import { Nav } from "./nav";

const MailUI = () => {
	const [sizes, setSizes] = makePersisted(createSignal<number[]>([]), {
		name: "resizable-sizes",
		storage: cookieStorage,
		storageOptions: {
			path: "/",
		},
	});

	const [isCollapsed, setIsCollapsed] = createSignal(false);

	return (
		<>
			<div class="md:hidden">
				<img
					src="/examples/mail-light.png"
					width={1280}
					height={1214}
					alt="Mail"
					class="block dark:hidden"
				/>
				<img
					src="/examples/mail-dark.png"
					width={1280}
					height={1214}
					alt="Mail"
					class="hidden dark:block"
				/>
			</div>
			<div class="hidden md:block">
				<Resizable sizes={sizes()} onSizesChange={setSizes}>
					<ResizablePanel
						initialSize={sizes()[0] ?? 0.2}
						minSize={0.1}
						maxSize={0.2}
						collapsible
						onCollapse={(e) => setIsCollapsed(e === 0)}
						onExpand={() => setIsCollapsed(false)}
						class={cn(
							isCollapsed() &&
								"min-w-[50px] transition-all duration-300 ease-in-out",
						)}
					>
						<AccountSwitcher isCollapsed={isCollapsed()} />
						<Separator />
						<Nav
							isCollapsed={isCollapsed()}
							links={[
								{
									title: "Inbox",
									label: "128",
									icon: (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="size-4"
											viewBox="0 0 24 24"
										>
											<g
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
											>
												<path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
												<path d="M4 13h3l3 3h4l3-3h3" />
											</g>
											<title>Inbox</title>
										</svg>
									),
									variant: "default",
								},
								{
									title: "Drafts",
									label: "9",
									icon: (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="size-4"
											viewBox="0 0 24 24"
										>
											<g
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
											>
												<path d="M14 3v4a1 1 0 0 0 1 1h4" />
												<path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2" />
											</g>
											<title>Drafts</title>
										</svg>
									),
									variant: "ghost",
								},
								{
									title: "Sent",
									label: "",
									icon: (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="size-4"
											viewBox="0 0 24 24"
										>
											<path
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M10 14L21 3m0 0l-6.5 18a.55.55 0 0 1-1 0L10 14l-7-3.5a.55.55 0 0 1 0-1z"
											/>
											<title>Sent</title>
										</svg>
									),
									variant: "ghost",
								},
								{
									title: "Trash",
									label: "23",
									icon: (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="size-4"
											viewBox="0 0 24 24"
										>
											<path
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
											/>
											<title>Trash</title>
										</svg>
									),
									variant: "ghost",
								},
								{
									title: "Archive",
									label: "",
									icon: (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="size-4"
											viewBox="0 0 24 24"
										>
											<path
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2m2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8m-9 4h4"
											/>
											<title>Archive</title>
										</svg>
									),
									variant: "ghost",
								},
							]}
						/>
						<Separator />
						<Nav
							isCollapsed={isCollapsed()}
							links={[
								{
									title: "Social",
									label: "972",
									icon: (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="size-4"
											viewBox="0 0 24 24"
										>
											<path
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0-8 0M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2m1-17.87a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85"
											/>
											<title>Social</title>
										</svg>
									),
									variant: "ghost",
								},
								{
									title: "Updates",
									label: "342",
									icon: (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="size-4"
											viewBox="0 0 24 24"
										>
											<path
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4m-4 4a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4m-4-6v3m0 3h.01"
											/>
											<title>Updates</title>
										</svg>
									),
									variant: "ghost",
								},
								{
									title: "Forums",
									label: "128",
									icon: (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="size-4"
											viewBox="0 0 24 24"
										>
											<path
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="m21 14l-3-3h-7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1zm-7 1v2a1 1 0 0 1-1 1H6l-3 3V11a1 1 0 0 1 1-1h2"
											/>
											<title>Forums</title>
										</svg>
									),
									variant: "ghost",
								},
								{
									title: "Shopping",
									label: "8",
									icon: (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="size-4"
											viewBox="0 0 24 24"
										>
											<g
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
											>
												<path d="M4 19a2 2 0 1 0 4 0a2 2 0 1 0-4 0m11 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
												<path d="M17 17H6V3H4" />
												<path d="m6 5l14 1l-1 7H6" />
											</g>
											<title>Shopping</title>
										</svg>
									),
									variant: "ghost",
								},
								{
									title: "Promotions",
									label: "21",
									icon: (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="size-4"
											viewBox="0 0 24 24"
										>
											<path
												fill="none"
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2m2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8m-9 4h4"
											/>
											<title>Promotions</title>
										</svg>
									),
									variant: "ghost",
								},
							]}
						/>
					</ResizablePanel>
					<ResizableHandle withHandle />
					<ResizablePanel initialSize={sizes()[1] ?? 0.4} minSize={0.3}>
						<Tabs defaultValue="all">
							<div class="flex items-center px-4 py-2">
								<h1 class="text-xl font-bold">Inbox</h1>
								<TabsList class="ml-auto w-fit">
									<TabsTrigger
										value="all"
										class="text-zinc-600 dark:text-zinc-200"
									>
										All mail
									</TabsTrigger>
									<TabsTrigger
										value="unread"
										class="text-zinc-600 dark:text-zinc-200"
									>
										Unread
									</TabsTrigger>
									<TabsIndicator />
								</TabsList>
							</div>
							<Separator />
							<div class="p-4">
								<TextFieldRoot class="relative">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="absolute left-2 top-2.5 size-4 text-muted-foreground"
										viewBox="0 0 24 24"
									>
										<path
											fill="none"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"
										/>
										<title>Search</title>
									</svg>
									<TextField class="pl-8" placeholder="Search" />
								</TextFieldRoot>
							</div>
							<TabsContent value="all" class="m-0">
								<MailList type="all" />
							</TabsContent>
							<TabsContent value="unread" class="m-0">
								<MailList type="unread" />
							</TabsContent>
						</Tabs>
					</ResizablePanel>
					<ResizableHandle withHandle />
					<ResizablePanel initialSize={sizes()[2] ?? 0.4} minSize={0.3}>
						<MailDisplay />
					</ResizablePanel>
				</Resizable>
			</div>
		</>
	);
};

export default MailUI;

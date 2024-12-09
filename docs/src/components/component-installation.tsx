import {
	Tabs,
	TabsContent,
	TabsIndicator,
	TabsList,
	TabsTrigger,
} from "@repo/tailwindcss/ui/tabs";
import { type ParentProps, children } from "solid-js";

const ComponentInstallation = (props: ParentProps) => {
	const childrens = children(() => props.children).toArray();

	return (
		<Tabs defaultValue="cli" class="relative mt-6 w-full">
			<TabsList class="bg-transparent border-b rounded-none">
				<TabsTrigger value="cli" class="w-fit">
					CLI
				</TabsTrigger>
				<TabsTrigger value="manual" class="w-fit">
					Manual
				</TabsTrigger>
				<TabsIndicator variant="underline" />
			</TabsList>
			<TabsContent
				class="relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold"
				value="cli"
			>
				{childrens[0]}
			</TabsContent>
			<TabsContent
				value="manual"
				class="relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold"
			>
				<Tabs defaultValue="tw">
					<TabsList class="mt-6 w-fit">
						<TabsTrigger value="tw" class="w-[110px]">
							TailwindCSS
						</TabsTrigger>
						<TabsTrigger value="uno" class="w-[110px]">
							UnoCSS
						</TabsTrigger>
						<TabsIndicator />
					</TabsList>
					<TabsContent value="tw">{childrens[1]}</TabsContent>
					<TabsContent value="uno">{childrens[2]}</TabsContent>
				</Tabs>
			</TabsContent>
		</Tabs>
	);
};

export default ComponentInstallation;

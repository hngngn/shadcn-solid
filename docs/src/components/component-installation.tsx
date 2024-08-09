import {
	Tabs,
	TabsContent,
	TabsIndicator,
	TabsList,
	TabsTrigger,
} from "@repo/tailwindcss/default/tabs";
import type { JSX } from "solid-js";

type Props = {
	cli?: JSX.Element;
	tw?: JSX.Element;
	uno?: JSX.Element;
};

const ComponentInstallation = (props: Props) => {
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
			<TabsContent value="cli">{props.cli}</TabsContent>
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
					<TabsContent value="tw">{props.tw}</TabsContent>
					<TabsContent value="uno">{props.uno}</TabsContent>
				</Tabs>
			</TabsContent>
		</Tabs>
	);
};

export default ComponentInstallation;

import {
	Tabs,
	TabsContent,
	TabsIndicator,
	TabsList,
	TabsTrigger,
} from "@repo/tailwindcss/ui/tabs";
import type { JSX } from "solid-js";

type Props = {
	cli?: JSX.Element;
	tw?: JSX.Element;
	uno?: JSX.Element;
};

const ComponentInstallation = (props: Props) => {
	return (
		<Tabs defaultValue="cli" class="relative mt-6 w-full">
			<TabsList class="w-full justify-start rounded-none border-b bg-transparent p-0">
				<TabsTrigger
					value="cli"
					class="w-fit rounded-none bg-transparent px-4 pb-3.5 pt-2 font-semibold data-[selected]:shadow-none"
				>
					CLI
				</TabsTrigger>
				<TabsTrigger
					value="manual-tailwindcss"
					class="w-fit rounded-none bg-transparent px-4 pb-3.5 pt-2 font-semibold data-[selected]:shadow-none"
				>
					Manual - TailwindCSS
				</TabsTrigger>
				<TabsTrigger
					value="manual-unocss"
					class="w-fit rounded-none bg-transparent px-4 pb-3.5 pt-2 font-semibold data-[selected]:shadow-none"
				>
					Manual - UnoCSS
				</TabsTrigger>
				<TabsIndicator variant="underline" />
			</TabsList>
			<TabsContent
				value="cli"
				class="relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold"
			>
				{props.cli}
			</TabsContent>
			<TabsContent
				value="manual-tailwindcss"
				class="relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold"
			>
				{props.tw}
			</TabsContent>
			<TabsContent
				value="manual-unocss"
				class="relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold"
			>
				{props.uno}
			</TabsContent>
		</Tabs>
	);
};

export default ComponentInstallation;

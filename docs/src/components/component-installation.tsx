import { setConfig } from "@/stores/config";
import {
	Tabs,
	TabsContent,
	TabsIndicator,
	TabsList,
	TabsTrigger,
} from "@repo/tailwindcss/default/tabs";
import { type JSX, createSignal } from "solid-js";

type Props = {
	cli?: JSX.Element;
	tw?: JSX.Element;
	uno?: JSX.Element;
};

const ComponentInstallation = (props: Props) => {
	const [selected, setSelected] = createSignal("cli");

	const handleOnChange = (e: string) => {
		setSelected(e);
		setConfig("framework", {
			name: e === "tw" ? "tailwindcss" : "unocss",
			label: e === "tw" ? "TailwindCSS" : "UnoCSS",
		});
	};

	return (
		<Tabs
			value={selected()}
			onChange={handleOnChange}
			class="relative mt-6 w-full"
		>
			<TabsList class="bg-transparent border-b rounded-none">
				<TabsTrigger value="cli" class="w-fit">
					CLI
				</TabsTrigger>
				<TabsTrigger value="tw" class="w-fit space-x-2">
					TailwindCSS
				</TabsTrigger>
				<TabsTrigger value="uno" class="w-fit space-x-2">
					UnoCSS
				</TabsTrigger>
				<TabsIndicator variant="underline" />
			</TabsList>
			<TabsContent value="cli">{props.cli}</TabsContent>
			<TabsContent
				value="tw"
				class="relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold"
			>
				{props.tw}
			</TabsContent>
			<TabsContent
				value="uno"
				class="relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold"
			>
				{props.uno}
			</TabsContent>
		</Tabs>
	);
};

export default ComponentInstallation;

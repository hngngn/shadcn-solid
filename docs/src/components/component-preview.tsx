import { Index } from "@/__registry__";
import {
	Tabs,
	TabsContent,
	TabsIndicator,
	TabsList,
	TabsTrigger,
} from "@/registry/tailwindcss/ui/tabs";
import {
	type JSX,
	type ParentProps,
	Show,
	createMemo,
	mergeProps,
} from "solid-js";

type Props = {
	name: string;
	block?: boolean;
};

const ComponentPreview = (props: ParentProps<Props>) => {
	const merge = mergeProps({ block: false }, props);
	const Component = createMemo(
		() => Index.tailwindcss[props.name].component as JSX.Element,
	);

	return (
		<Show
			when={!merge.block}
			fallback={
				<div class="relative aspect-[4/2.5] w-full overflow-hidden rounded-md border">
					<img
						src={`/images/blocks/${props.name}.png`}
						alt={props.name}
						width={1440}
						height={900}
						class="absolute left-0 top-0 z-20 w-[970px] max-w-none bg-background dark:hidden sm:w-[1280px] md:hidden md:dark:hidden"
					/>
					<img
						src={`/images/blocks/${props.name}-dark.png`}
						alt={props.name}
						width={1440}
						height={900}
						class="absolute left-0 top-0 z-20 hidden w-[970px] max-w-none bg-background dark:block sm:w-[1280px] md:hidden md:dark:hidden"
					/>
					<div class="absolute inset-0 hidden w-[1600px] bg-background md:block">
						<iframe
							src={`/blocks/${props.name}`}
							class="size-full"
							title={props.name}
							loading="lazy"
						/>
					</div>
				</div>
			}
		>
			<div class="group relative my-4 flex flex-col space-y-2 [&_.preview>div:not(:has(table))]:sm:max-w-[70%]">
				<Tabs defaultValue="preview">
					<div class="pb-3">
						<TabsList class="bg-transparent border-b rounded-none">
							<TabsTrigger value="preview" class="w-fit">
								Preview
							</TabsTrigger>
							<TabsTrigger value="code" class="w-fit">
								Code
							</TabsTrigger>
							<TabsIndicator variant="underline" />
						</TabsList>
					</div>
					<TabsContent
						value="preview"
						class="relative rounded-md preview flex min-h-[350px] w-full justify-center p-10 items-center border has-[table:not([data-scope=date-picker])]:border-none has-[table:not([data-scope=date-picker])]:p-0"
					>
						<Show
							when={Component()}
							fallback={
								<p class="text-sm text-muted-foreground">
									Component{" "}
									<code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
										{props.name}
									</code>{" "}
									not found in registry.
								</p>
							}
						>
							{Component()}
						</Show>
					</TabsContent>
					<TabsContent value="code">
						<div class="flex flex-col space-y-4">
							<div class="w-full rounded-md [&_pre]:!my-0 [&_pre]:!max-h-[350px] [&_pre]:overflow-auto relative [&>[data-raw-code]]:mt-0">
								{props.children}
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</Show>
	);
};

export default ComponentPreview;

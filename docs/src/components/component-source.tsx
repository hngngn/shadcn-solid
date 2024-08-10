import { cn } from "@/libs/cn";
import type { CollapsibleTriggerProps } from "@kobalte/core/collapsible";
import { Button } from "@repo/tailwindcss/default/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@repo/tailwindcss/default/collapsible";
import { frameworks } from "scripts/utils/framework";
import { Show, createMemo, createSignal } from "solid-js";
import { StyleProvider, useStyle } from "./style-provider";

type Props = {
	name: string;
	framework: string;
	styleDefaultTailwindCSS: HTMLElement;
	styleDefaultUnoCSS: HTMLElement;
	styleSolidTailwindCSS: HTMLElement;
	styleSolidUnoCSS: HTMLElement;
};

const ComponentSourceImpl = (props: Props) => {
	const { style } = useStyle();
	const [isOpened, setIsOpened] = createSignal(false);
	const framework = () =>
		frameworks.filter((i) => i.name === props.framework).map((i) => i.label)[0];
	const Code = createMemo(
		() =>
			// @ts-expect-error -- ts not happy with this
			props[`style${style().label}${framework()}`],
	);

	return (
		<Collapsible open={isOpened()} onOpenChange={setIsOpened} forceMount>
			<div class={cn("relative my-6 overflow-hidden rounded-md")}>
				<CollapsibleContent
					class={cn("overflow-hidden", !isOpened() && "max-h-32")}
				>
					<div
						class={cn(
							"[&_pre]:my-0 [&_pre]:max-h-[650px] [&_pre]:pb-[100px]",
							!isOpened()
								? "[&_pre]:overflow-hidden"
								: "[&_pre]:overflow-auto]",
						)}
					>
						<Show
							when={Code}
							fallback={
								<p class="text-sm text-muted-foreground">
									Code for component{" "}
									<code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
										{props.name}
									</code>{" "}
									not found in registry.
								</p>
							}
						>
							<Code />
						</Show>
					</div>
				</CollapsibleContent>
				<div
					class={cn(
						"absolute flex items-center justify-center bg-gradient-to-b from-zinc-700/30 to-zinc-950/90 p-2",
						isOpened() ? "inset-x-0 bottom-0 h-36 from-zinc-700/0" : "inset-0",
					)}
				>
					<CollapsibleTrigger
						as={(props: CollapsibleTriggerProps) => (
							<Button {...props} variant="secondary" class="h-8 text-xs">
								<Show when={isOpened()} fallback="View Code">
									Collapse
								</Show>
							</Button>
						)}
					/>
				</div>
			</div>
		</Collapsible>
	);
};

const ComponentSource = (props: Props) => {
	return (
		<StyleProvider>
			<ComponentSourceImpl {...props} />
		</StyleProvider>
	);
};

export default ComponentSource;

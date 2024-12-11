import { Announcement } from "@/components/announcement";
import BlockDisplay from "@/components/block-display";
import { getAllBlockId } from "@/libs/blocks";
import { buttonVariants } from "@/registry/tailwindcss/ui/button";
import { For, createMemo } from "solid-js";

const BlockPage = () => {
	const blocks = createMemo(() => getAllBlockId());

	return (
		<div class="relative">
			<section class="flex flex-col items-start gap-2 border-b border-border/40 py-8 dark:border-border md:py-10 lg:py-12">
				<div class="container">
					<Announcement />
					<h1 class="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
						Building Blocks for the Web
					</h1>
					<p class="max-w-2xl text-balance text-lg font-light text-foreground">
						Beautifully designed. Copy and paste into your apps. Open Source.
					</p>
					<div class="flex w-full items-center justify-start gap-2 py-2">
						<a href="#blocks" class={buttonVariants({ size: "sm" })}>
							Browse Blocks
						</a>
					</div>
				</div>
			</section>
			<div class="container py-6">
				<section id="blocks" class="scroll-mt-24">
					<div class="gap-3 md:flex md:flex-row-reverse md:items-start">
						<div class="grid flex-1 gap-12 md:gap-24 lg:gap-48">
							<For each={blocks()}>
								{(name) => <BlockDisplay name={name} />}
							</For>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default BlockPage;

import { Announcement } from "@/components/announcement";
import BlockDisplay from "@/components/block-display";
import { getAllBlockId } from "@/libs/blocks";
import { Button } from "@/registry/tailwindcss/ui/button";
import { For, createMemo } from "solid-js";

const BlockPage = () => {
	const blocks = createMemo(() => getAllBlockId());

	return (
		<>
			<section class="border-grid border-b">
				<div class="container-wrapper">
					<div class="container flex flex-col items-start gap-1 py-8 md:py-10 lg:py-12">
						<Announcement />
						<h1 class="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
							Building Blocks for the Web
						</h1>
						<p class="max-w-2xl text-balance text-lg font-light text-foreground">
							Clean, modern building blocks. Copy and paste into your apps. Open
							Source. Free forever.
						</p>
						<div class="flex w-full items-center justify-start gap-2 py-2">
							<Button as="a" href="#blocks" size="sm">
								Browse Blocks
							</Button>
						</div>
					</div>
				</div>
			</section>
			<div class="container-wrapper flex-1">
				<For each={blocks()}>
					{(name) => (
						<div class="border-grid container border-b py-8 first:pt-6 last:border-b-0 md:py-12">
							<BlockDisplay name={name} />
						</div>
					)}
				</For>
			</div>
		</>
	);
};

export default BlockPage;

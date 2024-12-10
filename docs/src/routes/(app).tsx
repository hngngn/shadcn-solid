import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import type { RouteSectionProps } from "@solidjs/router";

const AppLayout = (props: RouteSectionProps) => {
	return (
		<div class="border-border/40 dark:border-border">
			<div class="mx-auto w-full border-border/40 dark:border-border min-[1800px]:max-w-[1536px] min-[1800px]:border-x">
				<Header />
				<main class="flex-1">{props.children}</main>
				<Footer />
			</div>
		</div>
	);
};

export default AppLayout;

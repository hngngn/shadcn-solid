import type { RouteSectionProps } from "@solidjs/router";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";

const AppLayout = (props: RouteSectionProps) => {
	return (
		<div class="relative flex min-h-screen flex-col">
			<div class="mx-auto w-full border-border/40 dark:border-border min-[1800px]:max-w-[1536px] min-[1800px]:border-x">
				<Header />
				<div class="flex-1">{props.children}</div>
				<Footer />
			</div>
		</div>
	);
};

export default AppLayout;

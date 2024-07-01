import { setStore } from "@/store";
import { ColorModeProvider, ColorModeScript } from "@kobalte/core";
import { createEffect, on, type ParentComponent } from "solid-js";
import { Footer } from "./footer";
import Header from "./header";

type Props = {
	pathname: string;
};

const ThemeWrapper: ParentComponent<Props> = (props) => {
	createEffect(
		on(
			() => props.pathname,
			(pathname) => {
				setStore("pathname", pathname);
			},
		),
	);

	return (
		<>
			<ColorModeScript />
			<ColorModeProvider>
				<div class="relative flex min-h-screen flex-col">
					<Header />
					<div class="flex-1">{props.children}</div>
					<Footer />
				</div>
			</ColorModeProvider>
		</>
	);
};

export default ThemeWrapper;

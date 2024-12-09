import { Navigate, type RouteSectionProps } from "@solidjs/router";
import { type JSX, Show, createMemo } from "solid-js";
import { Index } from "~/__registry__";

const BlockFullView = (props: RouteSectionProps) => {
	const Component = createMemo(
		() => Index.tailwindcss[props.params.name].component as JSX.Element,
	);

	return (
		<Show when={Component()} fallback={<Navigate href="/404" />}>
			{Component()}
		</Show>
	);
};

export default BlockFullView;

import type { RouteSectionProps } from "@solidjs/router";
import { clientOnly } from "@solidjs/start";
import { For } from "solid-js";

// @ts-expect-error
const contents = /*#__PURE__*/ import.meta.glob<true, string, string>(
	"../../../blocks/**/*.tsx",
	{
		eager: true,
	},
);
const Item = (props: { src: string }) => {
	const Component = clientOnly(
		() =>
			import(
				/* @vite-ignore */
				props.src
			),
	);

	return <Component />;
};

const BlockPage = (props: RouteSectionProps) => {
	return (
		<For
			each={Object.keys(contents).filter((item) => item.includes("index.tsx"))}
		>
			{(item) => <Item src={item} />}
		</For>
	);
};

export default BlockPage;

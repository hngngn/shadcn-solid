import { clientOnly } from "@solidjs/start";
import { For } from "solid-js";

// @ts-expect-error
const contents = /*#__PURE__*/ import.meta.glob<true, string, string>(
	"../../../tailwindcss/examples/*.tsx",
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

const Home = () => {
	return (
		<div class="grid grid-cols-3 gap-4 p-4">
			<For each={Object.keys(contents)}>
				{(item) => (
					<div class="flex justify-center items-center border border-border p-10 rounded-md min-h-350px">
						<Item src={item} />
					</div>
				)}
			</For>
		</div>
	);
};

export default Home;

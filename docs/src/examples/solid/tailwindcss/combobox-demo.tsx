import {
	Combobox,
	ComboboxContent,
	ComboboxInput,
	ComboboxItem,
	ComboboxTrigger,
} from "@repo/tailwindcss/solid/combobox";

const ALL_OPTIONS = ["Next.js", "Astro", "Qwik", "SolidStart", "Nuxt.js"];

const ComboboxDemo = () => {
	return (
		<Combobox
			options={ALL_OPTIONS}
			placeholder="Search framework…"
			itemComponent={(props) => (
				<ComboboxItem item={props.item}>{props.item.rawValue}</ComboboxItem>
			)}
		>
			<ComboboxTrigger>
				<ComboboxInput />
			</ComboboxTrigger>
			<ComboboxContent />
		</Combobox>
	);
};

export default ComboboxDemo;

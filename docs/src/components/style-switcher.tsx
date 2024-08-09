import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/tailwindcss/default/select";
import { makePersisted } from "@solid-primitives/storage";
import { styles } from "scripts/utils/styles";
import { createSignal } from "solid-js";

export const [uiStyle, setUiStyle] = makePersisted(
	createSignal<(typeof styles)[0]>(styles[0]),
	{
		name: "styles",
	},
);

const StyleSwitcher = () => {
	return (
		<Select
			options={styles}
			value={uiStyle()}
			onChange={setUiStyle}
			optionValue="name"
			itemComponent={(props) => (
				<SelectItem item={props.item} class="text-xs">
					{props.item.rawValue.label}
				</SelectItem>
			)}
		>
			<SelectTrigger class="h-7 w-[145px] text-xs [&>svg]:size-3">
				<span class="text-muted-foreground">Style: </span>
				<SelectValue<(typeof styles)[0]>>
					{(state) => state.selectedOption().label}
				</SelectValue>
			</SelectTrigger>
			<SelectContent />
		</Select>
	);
};

export default StyleSwitcher;

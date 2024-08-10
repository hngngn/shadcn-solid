import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/tailwindcss/default/select";
import { styles } from "scripts/utils/styles";
import { useStyle } from "./style-provider";

const StyleSwitcher = () => {
	const { style, setStyle } = useStyle();

	return (
		<Select
			disallowEmptySelection
			options={styles}
			value={style()}
			onChange={setStyle}
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

import { config, setConfig } from "@/stores/config";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/tailwindcss/default/select";
import { type Style, styles } from "scripts/utils/styles";

const StyleSwitcher = () => {
	return (
		<Select
			disallowEmptySelection
			options={styles}
			value={config.style}
			onChange={(e) => setConfig("style", e)}
			optionValue="name"
			itemComponent={(props) => (
				<SelectItem item={props.item} class="text-xs">
					{props.item.rawValue.label}
				</SelectItem>
			)}
		>
			<SelectTrigger class="h-7 w-[145px] text-xs [&>svg]:size-3">
				<span class="text-muted-foreground">Style: </span>
				<SelectValue<Style>>
					{(state) => state.selectedOption().label}
				</SelectValue>
			</SelectTrigger>
			<SelectContent />
		</Select>
	);
};

export default StyleSwitcher;

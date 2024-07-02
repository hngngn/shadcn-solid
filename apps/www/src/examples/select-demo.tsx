import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/tailwindcss/ui/select";

const SelectDemo = () => {
	return (
		<Select
			options={["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"]}
			placeholder="Select a fruit…"
			itemComponent={(props) => (
				<SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
			)}
		>
			<SelectTrigger class="w-[180px]">
				<SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
			</SelectTrigger>
			<SelectContent />
		</Select>
	);
};

export default SelectDemo;

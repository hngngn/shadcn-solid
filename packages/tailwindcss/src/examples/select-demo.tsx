import {
  Select,
  SelectContent,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  SelectValue,
} from "@repo/tailwindcss/ui/v4/select"

const SelectDemo = () => {
  return (
    <Select
      options={["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"]}
      placeholder="Select a fruit"
      itemComponent={(props) => (
        <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>
      )}
    >
      <SelectTrigger class="w-[180px]" aria-label="Fruit">
        <SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent />
      </SelectPortal>
    </Select>
  )
}

export default SelectDemo

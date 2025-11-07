import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxDescription,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemLabel,
  ComboboxPortal,
  ComboboxTrigger,
} from "@/registry/ui/combobox"

const ALL_OPTIONS = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"]

const ComboboxDemo = () => {
  return (
    <Combobox
      options={ALL_OPTIONS}
      itemComponent={(props) => (
        <ComboboxItem item={props.item}>
          <ComboboxItemLabel>{props.item.rawValue}</ComboboxItemLabel>
        </ComboboxItem>
      )}
    >
      <ComboboxControl>
        <ComboboxInput />
        <ComboboxTrigger />
      </ComboboxControl>
      <ComboboxDescription>
        Choose the fruit you like the most.
      </ComboboxDescription>
      <ComboboxPortal>
        <ComboboxContent />
      </ComboboxPortal>
    </Combobox>
  )
}

export default ComboboxDemo

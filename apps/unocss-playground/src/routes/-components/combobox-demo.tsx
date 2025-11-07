import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
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
      defaultValue={ALL_OPTIONS[1]}
    >
      <ComboboxControl>
        <ComboboxInput />
        <ComboboxTrigger />
      </ComboboxControl>
      <ComboboxPortal>
        <ComboboxContent />
      </ComboboxPortal>
    </Combobox>
  )
}

export default ComboboxDemo

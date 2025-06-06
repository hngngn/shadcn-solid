import {
  Combobox,
  ComboboxContent,
  ComboboxControl,
  ComboboxDescription,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemLabel,
  ComboboxPortal,
  ComboboxSection,
  ComboboxTrigger,
} from "@repo/tailwindcss/ui/v4/combobox"

interface Option {
  value: string
  label: string
  disabled: boolean
}
interface Group {
  label: string
  options: Option[]
}
const ALL_OPTIONS: Group[] = [
  {
    label: "Fruits",
    options: [
      { value: "apple", label: "Apple", disabled: false },
      { value: "banana", label: "Banana", disabled: false },
      { value: "blueberry", label: "Blueberry", disabled: false },
      { value: "grapes", label: "Grapes", disabled: true },
      { value: "pineapple", label: "Pineapple", disabled: false },
    ],
  },
  {
    label: "Meat",
    options: [
      { value: "beef", label: "Beef", disabled: false },
      { value: "chicken", label: "Chicken", disabled: false },
      { value: "lamb", label: "Lamb", disabled: false },
      { value: "pork", label: "Pork", disabled: false },
    ],
  },
]

const ComboboxGroupDemo = () => {
  return (
    <Combobox<Option, Group>
      options={ALL_OPTIONS}
      optionValue="value"
      optionTextValue="label"
      optionLabel="label"
      optionDisabled="disabled"
      optionGroupChildren="options"
      itemComponent={(props) => (
        <ComboboxItem item={props.item}>
          <ComboboxItemLabel>{props.item.rawValue.label}</ComboboxItemLabel>
        </ComboboxItem>
      )}
      sectionComponent={(props) => (
        <ComboboxSection>{props.section.rawValue.label}</ComboboxSection>
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

export default ComboboxGroupDemo

import type { ComboboxRootProps } from "@kobalte/core/combobox";
import type { ComponentProps } from "solid-js";
import {
	Combobox,
	ComboboxContent,
	ComboboxControl,
	ComboboxDescription,
	ComboboxErrorMessage,
	ComboboxInput,
	ComboboxItem,
	ComboboxTrigger,
} from "../solid/ui/combobox";
import type { Meta, StoryObj } from "../types";

type Story = StoryObj<ComboboxRootProps<unknown, unknown>>;

export const Default: Story = {
	args: {
		disabled: false,
		validationState: "valid",
	},
};

interface Fruit {
	value: string;
	label: string;
	disabled: boolean;
}
const ALL_OPTIONS: Fruit[] = [
	{ value: "apple", label: "Apple", disabled: false },
	{ value: "banana", label: "Banana", disabled: false },
	{ value: "blueberry", label: "Blueberry", disabled: false },
	{ value: "grapes", label: "Grapes", disabled: true },
	{ value: "pineapple", label: "Pineapple", disabled: false },
];

export default {
	title: "UnoCSS/Solid/Combobox",
	render: (props) => {
		return (
			<Combobox
				placeholder="Search a fruit…"
				options={ALL_OPTIONS}
				optionValue="value"
				optionTextValue="label"
				optionLabel="label"
				optionDisabled="disabled"
				itemComponent={(props) => (
					<ComboboxItem item={props.item} title={props.item.rawValue.label} />
				)}
				{...props}
			>
				<ComboboxControl>
					<ComboboxInput />
					<ComboboxTrigger />
				</ComboboxControl>
				<ComboboxDescription>
					Choose the fruit you like the most.
				</ComboboxDescription>
				<ComboboxErrorMessage>Hmm, I prefer apples.</ComboboxErrorMessage>
				<ComboboxContent />
			</Combobox>
		);
	},
	argTypes: {
		validationState: {
			control: {
				type: "radio",
			},
			options: ["valid", "invalid"],
		},
	},
	parameters: {
		layout: "centered",
	},
} satisfies Meta<ComponentProps<typeof Combobox>>;

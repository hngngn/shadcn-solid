import type { AccordionRootProps } from "@kobalte/core/accordion";
import type { ComponentProps } from "solid-js";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../solid/ui/accordion";
import type { Meta, StoryObj } from "../types";

type Story = StoryObj<
	AccordionRootProps & {
		disabled?: string;
	}
>;

export const Default: Story = {
	args: {
		multiple: false,
		collapsible: true,
		disabled: "",
	},
};

export default {
	title: "UnoCSS/Solid/Accordion",
	render: (props) => (
		<Accordion {...props}>
			<AccordionItem value="item-1" disabled={props.disabled === "item-1"}>
				<AccordionTrigger>Item 1</AccordionTrigger>
				<AccordionContent>Content 1</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-2" disabled={props.disabled === "item-2"}>
				<AccordionTrigger>Item 2</AccordionTrigger>
				<AccordionContent>Content 2</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-3" disabled={props.disabled === "item-3"}>
				<AccordionTrigger>Item 3</AccordionTrigger>
				<AccordionContent>Content 3</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
	argTypes: {
		disabled: {
			options: ["item-1", "item-2", "item-3"],
			control: {
				type: "radio",
			},
		},
	},
} satisfies Meta<ComponentProps<typeof Accordion>>;

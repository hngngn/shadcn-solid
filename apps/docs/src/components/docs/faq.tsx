import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui"

export const FAQ = () => {
	return (
		<Accordion collapsible>
			<AccordionItem value="item-1">
				<AccordionTrigger>
					Why not packaged as a dependency?
				</AccordionTrigger>
				<AccordionContent>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						The idea behind this is to give you ownership and
						control over the code, allowing you to decide how the
						components are built and styled.
					</p>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Start with some sensible defaults, then customize the
						components to your needs.
					</p>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						One of the drawback of packaging the components in an
						npm package is that the style is coupled with the
						implementation. _The design of your components should be
						separate from their implementation._
					</p>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-2">
				<AccordionTrigger>
					Which frameworks are supported?
				</AccordionTrigger>
				<AccordionContent>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						This port is built to be used with Solid/SolidStart.
					</p>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-3">
				<AccordionTrigger>
					Can I use this in my project?
				</AccordionTrigger>
				<AccordionContent>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						Yes. Free to use for personal and commercial projects.
						No attribution required.
					</p>
					<p class="leading-7 [&:not(:first-child)]:mt-6">
						But let us know if you do use it. We'd love to see what
						you build with it.
					</p>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}

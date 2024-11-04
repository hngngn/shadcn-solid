import { siteConfig } from "@/config/site";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuDescription,
	NavigationMenuItem,
	NavigationMenuItemLabel,
	NavigationMenuLink,
	NavigationMenuTrigger,
} from "@repo/tailwindcss/ui/navigation-menu";
import type { ParentProps } from "solid-js";
import { For } from "solid-js";

const ListItem = (props: ParentProps<{ title: string; href: string }>) => {
	return (
		<NavigationMenuLink
			href={props.href}
			class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-[box-shadow,background-color] duration-200 hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring"
		>
			<NavigationMenuItemLabel class="text-sm font-medium leading-none">
				{props.title}
			</NavigationMenuItemLabel>
			<NavigationMenuDescription class="line-clamp-2 text-sm leading-snug text-muted-foreground">
				{props.children}
			</NavigationMenuDescription>
		</NavigationMenuLink>
	);
};

const components: { title: string; href: string; description: string }[] = [
	{
		title: "Data Table",
		href: "/docs/components/data-table",
		description: "Powerful table and datagrids built using TanStack Table.",
	},
	{
		title: "Date Picker",
		href: "/docs/components/date-picker",
		description:
			"A component that allows users to select a date from a calendar.",
	},
	{
		title: "OTP Field",
		href: "/docs/components/otp-field",
		description: "An accessible and customizable OTP Input component.",
	},
	{
		title: "Resizable",
		href: "/docs/components/resizable",
		description:
			"A component that divides your interface into resizable sections.",
	},
	{
		title: "Sonner",
		href: "/docs/components/sonner",
		description: "An opinionated toast component for Solid.",
	},
	{
		title: "Toggle Group",
		href: "/docs/components/toggle-group",
		description:
			"A set of two-state buttons that can be toggled on (pressed) or off (not pressed).",
	},
];

const NavigationMenuDemo = () => {
	return (
		<NavigationMenu>
			<NavigationMenuItem>
				<NavigationMenuTrigger class="transition-[box-shadow,background-color] focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring data-[expanded]:bg-accent">
					Learn
				</NavigationMenuTrigger>
				<NavigationMenuContent class="grid gap-3 p-4 w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] [&>li:first-of-type]:row-span-3">
					<NavigationMenuLink
						href="/"
						class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none transition-shadow duration-200 hover:shadow-md focus-visible:shadow-md focus-visible:ring-[1.5px] focus-visible:ring-ring"
					>
						<NavigationMenuItemLabel class="mb-2 mt-4 text-lg font-medium">
							{siteConfig.title}
						</NavigationMenuItemLabel>
						<NavigationMenuDescription class="text-sm leading-tight text-muted-foreground">
							{siteConfig.description}
						</NavigationMenuDescription>
					</NavigationMenuLink>
					<ListItem href="/docs" title="Introduction">
						{siteConfig.description}.
					</ListItem>
					<ListItem href="/docs/installation" title="Installation">
						How to install dependencies and structure your app.
					</ListItem>
					<ListItem href="/docs/components/typography" title="Typography">
						Styles for headings, paragraphs, lists...etc.
					</ListItem>
				</NavigationMenuContent>
			</NavigationMenuItem>

			<NavigationMenuItem>
				<NavigationMenuTrigger class="transition-[box-shadow,background-color] focus-visible:outline-none focus-visible:ring-1.5px focus-visible:ring-ring data-[expanded]:bg-accent">
					Overview
				</NavigationMenuTrigger>
				<NavigationMenuContent class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
					<For each={components}>
						{(item) => (
							<ListItem href={item.href} title={item.title}>
								{item.description}
							</ListItem>
						)}
					</For>
				</NavigationMenuContent>
			</NavigationMenuItem>

			<NavigationMenuTrigger
				as="a"
				href="/docs"
				class="transition-[box-shadow,background-color] focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring data-[expanded]:bg-accent"
			>
				Documentation
			</NavigationMenuTrigger>
		</NavigationMenu>
	);
};

export default NavigationMenuDemo;

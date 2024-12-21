import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/registry/tailwindcss/ui/sidebar";
import {
	type Accessor,
	type ComponentProps,
	For,
	type JSXElement,
	splitProps,
} from "solid-js";

const NavSecondary = (
	props: ComponentProps<typeof SidebarGroup> & {
		items: {
			title: string;
			url: string;
			icon: Accessor<JSXElement>;
		}[];
	},
) => {
	const [local, rest] = splitProps(props, ["items"]);

	return (
		<SidebarGroup {...rest}>
			<SidebarGroupContent>
				<SidebarMenu>
					<For each={local.items}>
						{(item) => (
							<SidebarMenuItem>
								<SidebarMenuButton as="a" size="sm" href={item.url}>
									<item.icon />
									<span>{item.title}</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						)}
					</For>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
};

export default NavSecondary;

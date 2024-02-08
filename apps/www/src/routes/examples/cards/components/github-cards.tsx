import { Button } from "@/registry/default/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/registry/default/ui/card"
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuGroupLabel,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/registry/default/ui/dropdown-menu"
import { Separator } from "@/registry/default/ui/separator"
import { As } from "@kobalte/core"

export const DemoGithub = () => {
	return (
		<Card>
			<CardHeader class="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
				<div class="space-y-1">
					<CardTitle>shadcn-solid</CardTitle>
					<CardDescription>
						Beautifully designed components that you can copy and
						paste into your apps. Accessible. Customizable. Open
						Source.
					</CardDescription>
				</div>
				<div class="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
					<Button variant="secondary" class="px-3 shadow-none">
						<span class="icon-[tabler--star] mr-2 h-4 w-4" />
						Star
					</Button>
					<Separator orientation="vertical" class="h-[20px]" />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<As
								component={Button}
								variant="secondary"
								class="px-2 shadow-none"
							>
								<span class="icon-[tabler--chevron-down] h-4 w-4 text-secondary-foreground" />
							</As>
						</DropdownMenuTrigger>
						<DropdownMenuContent class="w-[200px]">
							<DropdownMenuGroup>
								<DropdownMenuGroupLabel>
									Suggested Lists
								</DropdownMenuGroupLabel>
								<DropdownMenuSeparator />
								<DropdownMenuCheckboxItem checked>
									Future Ideas
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem>
									My Stack
								</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem>
									Inspiration
								</DropdownMenuCheckboxItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<span class="icon-[tabler--plus] mr-2 h-4 w-4" />{" "}
									Create List
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardHeader>
			<CardContent>
				<div class="flex space-x-4 text-sm text-muted-foreground">
					<div class="flex items-center">
						<span class="icon-[tabler--brand-typescript] mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
						TypeScript
					</div>
					<div class="flex items-center">
						<span class="icon-[tabler--star] mr-1 h-3 w-3" />
						33
					</div>
					<div>Updated Feb 2024</div>
				</div>
			</CardContent>
		</Card>
	)
}

import { cn } from "@/libs/cn";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@repo/tailwindcss/ui/select";
import { createSignal } from "solid-js";
import { accounts, type Account } from "../mail/data";

type Props = {
	isCollapsed: boolean;
};

export const AccountSwitcher = (props: Props) => {
	const [selectedAccount, setSelectedAccount] = createSignal<Account>(
		accounts[0],
	);

	return (
		<Select<Account>
			value={selectedAccount()}
			onChange={setSelectedAccount}
			options={accounts}
			optionValue="email"
			optionTextValue="label"
			itemComponent={(props) => (
				<SelectItem item={props.item}>{props.item.rawValue.email}</SelectItem>
			)}
			class={cn(
				"flex h-[52px] items-center justify-center",
				props.isCollapsed ? "h-[52px]" : "px-2",
			)}
			placement="bottom-start"
			disallowEmptySelection
		>
			<SelectTrigger
				class={cn(
					"flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
					props.isCollapsed &&
						"flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden",
				)}
				aria-label="Select account"
			>
				<SelectValue<Account>>
					{(state) => (
						<>
							{state.selectedOption().icon}
							<div class={cn("ml-2", props.isCollapsed && "hidden")}>
								{state.selectedOption().label}
							</div>
						</>
					)}
				</SelectValue>
			</SelectTrigger>
			<SelectContent />
		</Select>
	);
};

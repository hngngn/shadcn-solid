import { cn } from "@/registry/tailwindcss/libs/cn";
import { Badge } from "@/registry/tailwindcss/ui/badge";
import { For } from "solid-js";
import { mails } from "./data";
import { mail, setMail } from "./use-mail";

type Props = {
	type: "all" | "unread";
};

export const timeAgo = (timestamp: Date) => {
	let value: string;
	const diff = (new Date().getTime() - timestamp.getTime()) / 1000;
	const minutes = Math.floor(diff / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 30);
	const years = Math.floor(months / 12);
	const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

	if (years > 0) {
		value = rtf.format(0 - years, "year");
	} else if (months > 0) {
		value = rtf.format(0 - months, "month");
	} else if (days > 0) {
		value = rtf.format(0 - days, "day");
	} else if (hours > 0) {
		value = rtf.format(0 - hours, "hour");
	} else if (minutes > 0) {
		value = rtf.format(0 - minutes, "minute");
	} else {
		value = rtf.format(0 - diff, "second");
	}
	return value;
};

export const MailList = (props: Props) => {
	return (
		<div class="flex h-[600px] flex-col gap-2 overflow-auto p-4 pt-0">
			<For each={props.type === "all" ? mails : mails.filter((v) => !v.read)}>
				{(item) => (
					<button
						type="button"
						class={cn(
							"flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
							mail.selected === item.id && "bg-muted",
						)}
						onClick={() =>
							setMail({
								...mail,
								selected: item.id,
							})
						}
					>
						<div class="flex w-full flex-col gap-1">
							<div class="flex items-center">
								<div class="flex items-center gap-2">
									<div class="font-semibold">{item.name}</div>
									{!item.read && (
										<span class="flex h-2 w-2 rounded-full bg-blue-600" />
									)}
								</div>
								<div
									class={cn(
										"ml-auto text-xs",
										mail.selected === item.id
											? "text-foreground"
											: "text-muted-foreground",
									)}
								>
									{timeAgo(new Date(item.date))}
								</div>
							</div>
							<div class="text-xs font-medium">{item.subject}</div>
						</div>
						<div class="line-clamp-2 text-xs text-muted-foreground">
							{item.text.substring(0, 300)}
						</div>
						{item.labels.length ? (
							<div class="flex items-center gap-2">
								<For each={item.labels}>
									{(label) => (
										<Badge variant={label === "work" ? "default" : "secondary"}>
											{label}
										</Badge>
									)}
								</For>
							</div>
						) : null}
					</button>
				)}
			</For>
		</div>
	);
};

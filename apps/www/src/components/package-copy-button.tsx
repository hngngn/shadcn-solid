import { Button } from "@/registry/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/registry/default/ui/dropdown-menu"
import { As } from "@kobalte/core"
import { TbCheck, TbCopy } from "solid-icons/tb"
import { For, Show, createSignal, type VoidComponent } from "solid-js"

type Props = {
	preRef: HTMLPreElement | undefined
}

export const PackageCopyButton: VoidComponent<Props> = (props) => {
	const [isCopied, setIsCopied] = createSignal(false)

	const copyToClipboard = (name: string) => {
		let innerText = props.preRef?.querySelector("code")?.innerText ?? ""

		if (innerText.startsWith("npm install")) {
			if (name === "yarn") {
				innerText = innerText.replace("npm install", "yarn add")
			}
			if (name === "pnpm") {
				innerText = innerText.replace("npm install", "pnpm add")
			}
		}

		if (innerText.startsWith("npx create-")) {
			if (name === "yarn") {
				innerText = innerText.replace("npx create-", "yarn create ")
			}
			if (name === "pnpm") {
				innerText = innerText.replace("npx create-", "pnpm create ")
			}
		}

		if (innerText.startsWith("npx")) {
			if (name === "pnpm") {
				innerText = innerText.replace("npx", "pnpm dlx")
			}
		}

		setIsCopied(true)
		void navigator.clipboard.writeText(innerText)
		setTimeout(() => setIsCopied(false), 2000)
	}

	const packageList = [
		{
			title: "npm",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="430"
					height="512"
					viewBox="0 0 430 512"
					class="w-3 h-3 fill-current"
				>
					<path d="M71.609 112.569v286.649h143.432v-215.04h71.608v215.04h71.608V112.569H71.608zM430.08 40.96v430.08H0V40.96h430.08z" />
				</svg>
			),
		},
		{
			title: "yarn",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="477"
					height="512"
					viewBox="0 0 477 512"
					class="w-3 h-3 fill-current"
				>
					<path d="M201.875 54.078S223.312-11.056 243.1 1.641c6.101 3.958 28.032 52.767 28.032 52.767s23.416-13.686 26.054-8.575c30.535 93.073 2.41 158.697-37.926 211.067c53.649 50.098 62.982 101.431 52.602 166.38c50.47.108 76.45-49.081 140.82-52.107c28.857-.495 30.341 33.309 8.575 38.585c-44.75 6.317-88.88 56.237-179.077 81.624c-11.635 17.708-81.148 15.728-135.874 20.612c-57.902.615-42.944-44.48-22.096-52.107c-13.596-7.408-14.15-14.796-16.819-14.016c-14.48 77.126-53.98 53.626-78.16 46.995c-18.634-9.894 1.319-33.144 1.319-33.144c-18.14 7.776-32.457-26.504-30.341-60.187c1.979-26.878 31.99-52.932 31.99-52.932c-1.789-67.104 17.813-110.758 69.915-147.417C83.91 177.75 62.91 143.25 90.606 103.06C126.66 93 133.66 50.25 201.876 54.078z" />
				</svg>
			),
		},
		{
			title: "pnpm",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					class="w-3 h-3 fill-current"
				>
					<path d="M0 0v7.5h7.5V0zm8.25 0v7.5h7.498V0zm8.25 0v7.5H24V0zM8.25 8.25v7.5h7.498v-7.5zm8.25 0v7.5H24v-7.5zM0 16.5V24h7.5v-7.5zm8.25 0V24h7.498v-7.5zm8.25 0V24H24v-7.5z" />
				</svg>
			),
		},
	]

	return (
		<DropdownMenu placement="bottom-end">
			<DropdownMenuTrigger asChild>
				<As
					component={Button}
					variant="ghost"
					size="icon"
					class="z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 absolute right-4 top-4"
				>
					<Show
						when={isCopied()}
						fallback={<TbCopy class="w-4 h-4" />}
					>
						<TbCheck class="h-4 w-4" />
					</Show>
				</As>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<For each={packageList}>
					{(item) => (
						<DropdownMenuItem
							onSelect={() => copyToClipboard(item.title)}
							class="flex items-center gap-[0.5rem]"
						>
							{item.icon}
							{item.title}
						</DropdownMenuItem>
					)}
				</For>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

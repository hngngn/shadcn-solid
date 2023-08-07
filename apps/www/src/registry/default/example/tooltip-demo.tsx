import { As } from "@kobalte/core"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

const TooltipDemo = () => {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<As component={Button} variant="outline">
					Hover
				</As>
			</TooltipTrigger>
			<TooltipContent>
				<p>Add to library</p>
			</TooltipContent>
		</Tooltip>
	)
}

export default TooltipDemo

import { As } from "@kobalte/core"
import { Button, Tooltip, TooltipContent, TooltipTrigger } from "~/components"

export const TooltipDemo = () => {
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

import { Button } from "@repo/tailwindcss/ui/v4/button"
import type { TooltipTriggerProps } from "@repo/tailwindcss/ui/v4/tooltip"
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from "@repo/tailwindcss/ui/v4/tooltip"

const TooltipDemo = () => {
  return (
    <Tooltip>
      <TooltipTrigger
        as={(props: TooltipTriggerProps) => (
          <Button variant="outline" {...props}>
            Hover
          </Button>
        )}
      />
      <TooltipPortal>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
  )
}

export default TooltipDemo

import { Button } from "@/registry/ui/button"
import type { TooltipTriggerProps } from "@/registry/ui/tooltip"
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from "@/registry/ui/tooltip"

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

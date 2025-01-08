import type { TooltipTriggerProps } from "@kobalte/core/tooltip"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default TooltipDemo

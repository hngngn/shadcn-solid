import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

const TooltipDemo = () => {
  return (
    <Tooltip>
      <TooltipTrigger as={() => <Button variant="outline">Hover</Button>} />
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default TooltipDemo;

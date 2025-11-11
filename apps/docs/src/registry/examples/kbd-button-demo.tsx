import { Button } from "@/registry/ui/button"
import { Kbd } from "@/registry/ui/kbd"

const KbdButtonDemo = () => {
  return (
    <div class="flex flex-wrap items-center gap-4">
      <Button variant="outline" size="sm" class="pr-2">
        Accept <Kbd>⏎</Kbd>
      </Button>
      <Button variant="outline" size="sm" class="pr-2">
        Cancel <Kbd>Esc</Kbd>
      </Button>
    </div>
  )
}

export default KbdButtonDemo

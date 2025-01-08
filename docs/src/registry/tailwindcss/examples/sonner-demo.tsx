import { toast } from "somoto"

import { Button } from "@/registry/tailwindcss/ui/button"

const SonnerDemo = () => {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      Show Toast
    </Button>
  )
}

export default SonnerDemo

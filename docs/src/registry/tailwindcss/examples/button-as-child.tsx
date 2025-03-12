import { Button } from "@/registry/tailwindcss/ui/button"

const ButtonAsChild = () => {
  return (
    <Button as="a" href="#">
      Login
    </Button>
  )
}

export default ButtonAsChild

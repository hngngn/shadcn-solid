import { Button } from "../ui/button"

const ButtonWithIcon = () => {
  return (
    <Button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="mr-2 h-4 w-4"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <path d="m3 7l9 6l9-6" />
        </g>
      </svg>{" "}
      Login with Email
    </Button>
  )
}

export default ButtonWithIcon

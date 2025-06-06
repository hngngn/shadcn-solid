import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/tailwindcss/ui/v4/alert"

const AlertDemo = () => {
  return (
    <Alert>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="size-4"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12l2 2l4-4" />
        </g>
      </svg>
      <AlertTitle>Success! Your changes have been saved</AlertTitle>
      <AlertDescription>
        This is an alert with icon, title and description.
      </AlertDescription>
    </Alert>
  )
}

export default AlertDemo

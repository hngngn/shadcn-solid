import { Alert, AlertDescription, AlertTitle } from "@/registry/ui/alert"

const AlertDestructiveDemo = () => {
  return (
    <Alert variant="destructive">
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
      <AlertTitle>Something went wrong!</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  )
}

export default AlertDestructiveDemo

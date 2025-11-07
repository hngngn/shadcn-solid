import { Alert, AlertDescription, AlertTitle } from "@/registry/ui/alert"
import { Button } from "@/registry/ui/button"

const AlertDemo = () => {
  return (
    <div class="grid max-w-xl items-start gap-4">
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
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" />
            <path d="m9 12l2 2l4-4" />
          </g>
        </svg>
        <AlertTitle>Success! Your changes have been saved</AlertTitle>
        <AlertDescription>
          This is an alert with icon, title and description.
        </AlertDescription>
      </Alert>
      <Alert>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="size-4"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M18 7v14l-6-4l-6 4V7a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4"
          />
        </svg>
        <AlertDescription>
          This one has an icon and a description only. No title.
        </AlertDescription>
      </Alert>
      <Alert>
        <AlertDescription>
          This one has a description only. No title. No icon.
        </AlertDescription>
      </Alert>
      <Alert>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M18 8a2 2 0 0 0 0-4a2 2 0 0 0-4 0a2 2 0 0 0-4 0a2 2 0 0 0-4 0a2 2 0 0 0 0 4m4 14L9 8m5 14l1-14" />
            <path d="M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z" />
          </g>
        </svg>
        <AlertTitle>Let&apos;s try one with icon and title.</AlertTitle>
      </Alert>
      <Alert>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1zm-8-5v4m0 4h.01"
          />
        </svg>
        <AlertTitle>
          This is a very long alert title that demonstrates how the component
          handles extended text content and potentially wraps across multiple
          lines
        </AlertTitle>
      </Alert>
      <Alert>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <rect width="18" height="4" x="3" y="8" rx="1" />
            <path d="M12 8v13m7-9v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7m2.5-4a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5a2.5 2.5 0 0 1 0 5" />
          </g>
        </svg>
        <AlertDescription>
          This is a very long alert description that demonstrates how the
          component handles extended text content and potentially wraps across
          multiple lines
        </AlertDescription>
      </Alert>
      <Alert>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4m0 4h.01" />
          </g>
        </svg>
        <AlertTitle>
          This is an extremely long alert title that spans multiple lines to
          demonstrate how the component handles very lengthy headings while
          maintaining readability and proper text wrapping behavior
        </AlertTitle>
        <AlertDescription>
          This is an equally long description that contains detailed information
          about the alert. It shows how the component can accommodate extensive
          content while preserving proper spacing, alignment, and readability
          across different screen sizes and viewport widths. This helps ensure
          the user experience remains consistent regardless of the content
          length.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4m0 4h.01" />
          </g>
        </svg>
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4m0 4h.01" />
          </g>
        </svg>
        <AlertTitle>Unable to process your payment.</AlertTitle>
        <AlertDescription>
          <p>Please verify your billing information and try again.</p>
          <ul class="list-inside list-disc text-sm">
            <li>Check your card details</li>
            <li>Ensure sufficient funds</li>
            <li>Verify billing address</li>
          </ul>
        </AlertDescription>
      </Alert>
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
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" />
            <path d="m9 12l2 2l4-4" />
          </g>
        </svg>
        <AlertTitle class="max-w-[calc(100%-4rem)]">
          The selected emails have been marked as spam.
        </AlertTitle>
        <Button
          size="sm"
          variant="outline"
          class="absolute top-2.5 right-3 h-6 shadow-none"
        >
          Undo
        </Button>
      </Alert>
      <Alert class="border-amber-50 bg-amber-50 text-amber-900 dark:border-amber-950 dark:bg-amber-950 dark:text-amber-100">
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
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" />
            <path d="m9 12l2 2l4-4" />
          </g>
        </svg>
        <AlertTitle>Plot Twist: This Alert is Actually Amber!</AlertTitle>
        <AlertDescription>
          This one has custom colors for light and dark mode.
        </AlertDescription>
      </Alert>
    </div>
  )
}

export default AlertDemo

import { ToggleButton } from "@/registry/ui/toggle-button"

const ToggleButtonSizeDemo = () => {
  return (
    <div class="space-x-2">
      <ToggleButton aria-label="Toggle italic" size="sm">
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
            d="M19 4h-9m4 16H5M15 4L9 20"
          />
        </svg>
      </ToggleButton>
      <ToggleButton aria-label="Toggle bold" size="lg">
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
            d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"
          />
        </svg>
      </ToggleButton>
    </div>
  )
}

export default ToggleButtonSizeDemo

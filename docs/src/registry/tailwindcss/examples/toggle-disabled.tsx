import { ToggleButton } from "@/registry/tailwindcss/ui/toggle"

const ToggleDisabled = () => {
  return (
    <ToggleButton disabled aria-label="Toggle underline">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 5v5a5 5 0 0 0 10 0V5M5 19h14"
        />
      </svg>
    </ToggleButton>
  )
}

export default ToggleDisabled

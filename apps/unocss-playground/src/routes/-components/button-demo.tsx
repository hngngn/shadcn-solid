import { Button } from "@/registry/ui/button"

const ButtonDemo = () => {
  return (
    <div class="flex flex-col gap-6">
      <div class="flex flex-wrap items-center gap-2 md:flex-row">
        <Button>Button</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="link">Link</Button>
        <Button variant="outline">
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
              d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11zm7.318-19.539l-10.94 10.939"
            />
          </svg>
          Send
        </Button>
        <Button variant="outline">
          Learn More
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
              d="M5 12h14m-7-7l7 7l-7 7"
            />
          </svg>
        </Button>
        <Button disabled variant="outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4 animate-spin"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 2v4m4.2 1.8l2.9-2.9M18 12h4m-5.8 4.2l2.9 2.9M12 18v4m-7.1-2.9l2.9-2.9M2 12h4M4.9 4.9l2.9 2.9"
            />
          </svg>
          Please wait
        </Button>
      </div>
      <div class="flex flex-wrap items-center gap-2 md:flex-row">
        <Button size="sm">Small</Button>
        <Button variant="outline" size="sm">
          Outline
        </Button>
        <Button variant="ghost" size="sm">
          Ghost
        </Button>
        <Button variant="destructive" size="sm">
          Destructive
        </Button>
        <Button variant="secondary" size="sm">
          Secondary
        </Button>
        <Button variant="link" size="sm">
          Link
        </Button>
        <Button variant="outline" size="sm">
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
              d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11zm7.318-19.539l-10.94 10.939"
            />
          </svg>
          Send
        </Button>
        <Button variant="outline" size="sm">
          Learn More
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
              d="M5 12h14m-7-7l7 7l-7 7"
            />
          </svg>
        </Button>
        <Button disabled size="sm" variant="outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4 animate-spin"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 2v4m4.2 1.8l2.9-2.9M18 12h4m-5.8 4.2l2.9 2.9M12 18v4m-7.1-2.9l2.9-2.9M2 12h4M4.9 4.9l2.9 2.9"
            />
          </svg>
          Please wait
        </Button>
      </div>
      <div class="flex flex-wrap items-center gap-2 md:flex-row">
        <Button size="lg">Large</Button>
        <Button variant="outline" size="lg">
          Outline
        </Button>
        <Button variant="ghost" size="lg">
          Ghost
        </Button>
        <Button variant="destructive" size="lg">
          Destructive
        </Button>
        <Button variant="secondary" size="lg">
          Secondary
        </Button>
        <Button variant="link" size="lg">
          Link
        </Button>
        <Button variant="outline" size="lg">
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
              d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11zm7.318-19.539l-10.94 10.939"
            />
          </svg>
          Send
        </Button>
        <Button variant="outline" size="lg">
          Learn More
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
              d="M5 12h14m-7-7l7 7l-7 7"
            />
          </svg>
        </Button>
        <Button disabled size="lg" variant="outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-4 animate-spin"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 2v4m4.2 1.8l2.9-2.9M18 12h4m-5.8 4.2l2.9 2.9M12 18v4m-7.1-2.9l2.9-2.9M2 12h4M4.9 4.9l2.9 2.9"
            />
          </svg>
          Please wait
        </Button>
      </div>
    </div>
  )
}

export default ButtonDemo

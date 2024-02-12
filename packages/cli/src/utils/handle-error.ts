import * as p from "@clack/prompts"

export function handleError(error: unknown) {
  if (typeof error === "string") {
    p.log.error(error)
    process.exit(1)
  }

  if (error instanceof Error) {
    p.log.error(error.message)
    process.exit(1)
  }

  p.log.error("Something went wrong. Please try again.")
  process.exit(1)
}

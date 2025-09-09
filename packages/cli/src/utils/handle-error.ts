import * as v from "valibot"

import { RegistryError } from "../registry/error"
import { highlighter } from "./highlighter"
import { logger } from "./logger"

export const handleError = (error: unknown) => {
  logger.break()
  logger.error(
    `Something went wrong. Please check the error below for more details.`,
  )
  logger.error(`If the problem persists, please open an issue on GitHub.`)
  logger.error("")

  if (typeof error === "string") {
    logger.error(error)
    logger.break()
    process.exit(1)
  }

  if (error instanceof RegistryError) {
    if (error.message) {
      logger.error(error.cause ? "Error:" : "Message:")
      logger.error(error.message)
    }

    if (error.cause) {
      logger.error("\nMessage:")
      logger.error(error.cause)
    }

    if (error.suggestion) {
      logger.error("\nSuggestion:")
      logger.error(error.suggestion)
    }
    logger.break()
    process.exit(1)
  }

  if (error instanceof v.ValiError) {
    logger.error("Validation failed:")
    for (const [key, value] of error.issues) {
      logger.error(`- ${highlighter.info(key)}: ${value}`)
    }
    logger.break()
    process.exit(1)
  }

  if (error instanceof Error) {
    logger.error(error.message)
    logger.break()
    process.exit(1)
  }

  logger.break()
  process.exit(1)
}

// Error codes for programmatic error handling
export const RegistryErrorCode = {
  // Network errors
  NETWORK_ERROR: "NETWORK_ERROR",
  NOT_FOUND: "NOT_FOUND",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  FETCH_ERROR: "FETCH_ERROR",

  // Configuration errors
  NOT_CONFIGURED: "NOT_CONFIGURED",
  INVALID_CONFIG: "INVALID_CONFIG",
  MISSING_ENV_VARS: "MISSING_ENV_VARS",

  // File system errors
  LOCAL_FILE_ERROR: "LOCAL_FILE_ERROR",

  // Parsing errors
  PARSE_ERROR: "PARSE_ERROR",
  VALIDATION_ERROR: "VALIDATION_ERROR",

  // Generic errors
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
} as const

export type RegistryErrorCode =
  (typeof RegistryErrorCode)[keyof typeof RegistryErrorCode]

export class RegistryError extends Error {
  public readonly code: RegistryErrorCode
  public readonly statusCode?: number
  public readonly context?: Record<string, unknown>
  public readonly suggestion?: string
  public readonly timestamp: Date
  public readonly cause?: unknown

  constructor(
    message: string,
    options: {
      code?: RegistryErrorCode
      statusCode?: number
      cause?: unknown
      context?: Record<string, unknown>
      suggestion?: string
    } = {},
  ) {
    super(message)
    this.name = "RegistryError"
    this.code = options.code ?? RegistryErrorCode.UNKNOWN_ERROR
    this.statusCode = options.statusCode
    this.cause = options.cause
    this.context = options.context
    this.suggestion = options.suggestion
    this.timestamp = new Date()

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      context: this.context,
      suggestion: this.suggestion,
      timestamp: this.timestamp,
      stack: this.stack,
    }
  }
}

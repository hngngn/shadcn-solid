const IMPORT_REGEX = /^import\s+{([^}]+)}\s+from\s+['"]([^'"]+)['"]/

export interface ParsedImport {
  moduleSpecifier: string
  namedImports: string[]
}

export interface ParsedUsage {
  componentName: string
  iconAttribute?: string
  attributes: Record<string, string>
}

export function parseImportTemplate(template: string): ParsedImport[] {
  const imports: ParsedImport[] = []

  for (const line of template.split("\n")) {
    const match = line.trim().match(IMPORT_REGEX)

    if (!match) {
      continue
    }

    imports.push({
      moduleSpecifier: match[2],
      namedImports: match[1].split(",").map((name) => name.trim()),
    })
  }

  return imports
}

export function getIconModuleSpecifier(template: string) {
  return parseImportTemplate(template).find((parsed) =>
    parsed.namedImports.includes("ICON"),
  )?.moduleSpecifier
}

export function parseUsageTemplate(usage: string): ParsedUsage {
  const start = usage.indexOf("<")
  const end = usage.indexOf("/>", start)

  if (start === -1 || end === -1) {
    return { componentName: "ICON", attributes: {} }
  }

  const inner = usage.slice(start + 1, end).trim()
  const nameEnd = inner.search(/[^\w]/)
  const componentName = nameEnd === -1 ? inner : inner.slice(0, nameEnd)
  const rawAttributes = nameEnd === -1 ? "" : inner.slice(nameEnd)

  if (!componentName) {
    return { componentName: "ICON", attributes: {} }
  }

  const attributes: Record<string, string> = {}
  let iconAttribute: string | undefined

  for (const [name, value] of parseAttributeTokens(rawAttributes)) {
    if (value === "{ICON}") {
      iconAttribute = name
      continue
    }

    attributes[name] = value
  }

  return { componentName, iconAttribute, attributes }
}

const NAME_CHAR = /[\w-]/

function parseAttributeTokens(raw: string): Array<[string, string]> {
  const tokens: Array<[string, string]> = []
  let index = 0

  while (index < raw.length) {
    if (!NAME_CHAR.test(raw[index])) {
      index++
      continue
    }

    const nameStart = index
    while (index < raw.length && NAME_CHAR.test(raw[index])) {
      index++
    }
    const name = raw.slice(nameStart, index)

    if (raw[index] !== "=") {
      continue
    }

    index++
    const open = raw[index]
    const close = open === "{" ? "}" : open === '"' || open === "'" ? open : ""

    if (!close) {
      continue
    }

    const closeIndex = raw.indexOf(close, index + 1)

    if (closeIndex === -1) {
      break
    }

    tokens.push([name, raw.slice(index, closeIndex + 1)])
    index = closeIndex + 1
  }

  return tokens
}

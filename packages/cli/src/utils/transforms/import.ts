import type { Transformer } from "."

export const transformImport: Transformer = async ({ sourceFile, config }) => {
  const importDeclarations = sourceFile.getImportDeclarations()

  for (const importDeclaration of importDeclarations) {
    const moduleSpecifier = importDeclaration.getModuleSpecifierValue()

    // Replace `import { cn } from "@/libs/cn"`
    if (moduleSpecifier === "@/libs/cn") {
      const namedImports = importDeclaration.getNamedImports()
      const cnImport = namedImports.find((i) => i.getName() === "cn")
      if (cnImport) {
        importDeclaration.setModuleSpecifier(
          moduleSpecifier.replace(/^@\/libs\/cn/, config.alias.cn)
        )
      }
    }
  }

  return sourceFile
}

const fs = require("fs")
const path = require("path")

try {
	const pkgPath = path.join(__dirname, "../packages/cli/package.json")

	const packageJson = JSON.parse(fs.readFileSync(pkgPath, "utf8"))
	const newVersion = packageJson.version

	const filePath = path.join(__dirname, "../packages/cli/src/version.ts")

	let tsxContent = fs.readFileSync(filePath, "utf8")
	tsxContent = tsxContent.replace(
		/version\s*=\s*".*"/,
		`version = "${newVersion}"`
	)

	fs.writeFileSync(filePath, tsxContent, "utf8")

	console.log("Version updated successfully!")
} catch (error) {
	console.error("Error updating version:", error)
}

// ORIGINALLY FROM CLOUDFLARE WRANGLER:
// https://github.com/cloudflare/wrangler2/blob/main/.github/changeset-version.js

const { exec } = require("node:child_process")

// This script is used by the `release.yml` workflow to update the version of the packages being released.
// The standard step is only to run `changeset version` but this does not update the package-lock.json file.
// So we also run `npm install`, which does this update.
// This is a workaround until this is handled automatically by `changeset version`.
// See https://github.com/changesets/changesets/issues/421.
exec("npx changeset version")
exec("npm install")

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

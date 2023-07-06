import fs from "fs"
import path from "path"

const PACKAGE_PATH = path.join(process.cwd(), "apps/www/package.json")

fs.readFile(
    PACKAGE_PATH,
    {
        encoding: "utf-8",
    },
    (_, data) => {
        let packageJSON = JSON.parse(data)
        packageJSON.type = "module"

        const updated = JSON.stringify(packageJSON, null, 2)

        fs.writeFile(
            PACKAGE_PATH,
            updated,
            {
                encoding: "utf-8",
            },
            () => {
                console.log("\n✅ Done post build!")
            }
        )
    }
)

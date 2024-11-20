import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@solidjs/start/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
	vite: {
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src"),
			},
		},
	},
});

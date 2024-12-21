import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@solidjs/start/config";
import unocss from "unocss/vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
	appRoot: "./dev",
	vite: {
		plugins: [unocss()],
		resolve: {
			alias: {
				"@/components/ui": resolve(__dirname, "./ui"),
				"@/libs": resolve(__dirname, "./libs"),
				"@/blocks": resolve(__dirname, "./blocks"),
				"@/hooks": resolve(__dirname, "./hooks"),
			},
		},
	},
	server: {
		esbuild: {
			options: {
				target: "esnext",
			},
		},
	},
});

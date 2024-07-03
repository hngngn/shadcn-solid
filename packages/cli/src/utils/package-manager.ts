export const getPackageManager = () => {
	const userAgent = process.env.npm_config_user_agent ?? "";

	switch (true) {
		case userAgent.startsWith("pnpm"):
			return "pnpm";
		case userAgent.startsWith("yarn"):
			return "yarn";
		case userAgent.startsWith("bun"):
			return "bun";
		default:
			return "npm";
	}
};

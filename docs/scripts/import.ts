export const fixImport = (content: string) => {
	const regex =
		/@\/(.+?)\/((?:.*?\/)?(?:components|ui|hooks|libs|blocks))\/([\w-]+)/g;

	const replacement = (
		match: string,
		path: string,
		type: string,
		component: string,
	) => {
		if (path === "blocks") {
			return `@repo/tailwindcss/${path}/${type}/${component}`;
		}
		if (type.endsWith("components")) {
			return `@/components/${component}`;
		}
		if (type.endsWith("ui")) {
			return `@/components/ui/${component}`;
		}
		if (type.endsWith("hooks")) {
			return `@/hooks/${component}`;
		}
		if (type.endsWith("libs")) {
			return `@/libs/${component}`;
		}

		return match;
	};

	return content.replace(regex, replacement);
};

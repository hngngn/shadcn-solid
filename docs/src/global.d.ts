/// <reference types="@solidjs/start/env" />

declare module "virtual:content" {
	export const allDocs: {
		heading: { depth: number; slug: string; text: string }[];
		frontmatter: {
			title: string;
			description: string;
			component?: boolean;
			link?: {
				doc?: string;
				api?: string;
			};
			toc?: boolean;
		};
		slug: string;
	};
}

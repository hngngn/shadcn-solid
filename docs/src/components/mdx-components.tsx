import type { MDXComponents } from "./mdx";

export const mdxComponents: Partial<MDXComponents> = {
	a: (props) => (
		<a class="font-medium underline underline-offset-4" {...props} />
	),
	code: (props) => (
		<code
			class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
			{...props}
		/>
	),
	h1: (props) => (
		<h1 class="font-heading mt-2 scroll-m-20 text-4xl font-bold" {...props} />
	),
	h2: (props) => (
		<h2
			class="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
			{...props}
		/>
	),
	h3: (props) => (
		<h3
			class="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
			{...props}
		/>
	),
	h4: (props) => (
		<h4
			class="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
			{...props}
		/>
	),
	h5: (props) => (
		<h5
			class="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
			{...props}
		/>
	),
	h6: (props) => (
		<h6
			class="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
			{...props}
		/>
	),
	li: (props) => <li class="mt-2" {...props} />,
	ol: (props) => <ol class="my-6 ml-6 list-decimal" {...props} />,
	p: (props) => (
		<p class="break-words leading-7 [&:not(:first-child)]:mt-6" {...props} />
	),
	ul: (props) => <ul class="my-6 ml-6 list-disc" {...props} />,
};

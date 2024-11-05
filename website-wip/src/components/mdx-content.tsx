import {
	type Component,
	type JSX,
	type ValidComponent,
	createComponent,
	createMemo,
	splitProps,
} from "solid-js";
import { jsx, jsxs } from "solid-js/h/jsx-runtime";
import TestComponent from "./test";

const sharedComponents: Record<string, ValidComponent> = {
	TestComponent,
};

export const useMDXComponent = (code: string) => {
	const fn = new Function(code);

	return fn({
		Fragment: (props: { children: JSX.Element }) => <>{props.children}</>,
		jsx,
		jsxs,
	}).default;
};

interface MDXProps {
	code: string;
	components?: Record<string, ValidComponent>;
}

export const MDXContent: Component<MDXProps> = (props) => {
	const [local, rest] = splitProps(props, ["code"]);

	const Component = createMemo(() => useMDXComponent(local.code));

	return createComponent(Component(), {
		get components() {
			return { ...sharedComponents, ...rest };
		},
	});
};

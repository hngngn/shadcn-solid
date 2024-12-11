// https://github.com/solidjs-community/solid-primitives/blob/main/packages/props/src/combineProps.ts

import type { JSX } from "solid-js";

const extractCSSregex = /((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;

/**
 * converts inline string styles to object form
 * @example
 * const styles = stringStyleToObject("margin: 24px; border: 1px solid #121212");
 * styles; // { margin: "24px", border: "1px solid #121212" }
 * */
export function stringStyleToObject(style: string): JSX.CSSProperties {
	const object: Record<string, string> = {};
	let match: RegExpExecArray | null;
	// biome-ignore lint/suspicious/noAssignInExpressions:
	while ((match = extractCSSregex.exec(style))) {
		object[match[1]] = match[2]!;
	}
	return object;
}

/**
 * Combines two set of styles together. Accepts both string and object styles.\
 * @example
 * const styles = combineStyle("margin: 24px; border: 1px solid #121212", {
 *   margin: "2rem",
 *   padding: "16px"
 * });
 * styles; // { margin: "2rem", border: "1px solid #121212", padding: "16px" }
 */
export function combineStyle(a: string, b: string): string;
export function combineStyle(
	a: JSX.CSSProperties | undefined,
	b: JSX.CSSProperties | undefined,
): JSX.CSSProperties;
export function combineStyle(
	a: JSX.CSSProperties | string | undefined,
	b: JSX.CSSProperties | string | undefined,
): JSX.CSSProperties;
export function combineStyle(
	a: JSX.CSSProperties | string | undefined,
	b: JSX.CSSProperties | string | undefined,
): JSX.CSSProperties | string {
	let _a = a;
	let _b = b;

	if (typeof _a === "string") {
		if (typeof _b === "string") return `${_a};${_b}`;

		_a = stringStyleToObject(_a);
	} else if (typeof _b === "string") {
		_b = stringStyleToObject(_b);
	}

	return { ..._a, ..._b };
}

import type { Preset, VariantHandlerContext } from "unocss"
import { escapeRegExp, type Variant, type VariantObject } from "unocss"

const variantMatcher = (
	name: string,
	// eslint-disable-next-line no-unused-vars
	handler: (input: VariantHandlerContext) => Record<string, any>
): VariantObject => {
	let re: RegExp
	return {
		name,
		match(input, ctx) {
			if (!re)
				re = new RegExp(
					`^${escapeRegExp(
						name
					)}(?:${ctx.generator.config.separators.join("|")})`
				)

			const match = input.match(re)
			if (match) {
				return {
					matcher: input.slice(match[0].length),
					handle: (input, next) =>
						next({
							...input,
							...handler(input),
						}),
				}
			}
		},
		autocomplete: `${name}:`,
	}
}

export type TPresetDarkModeOption = {
	/**
	 * Data attribute name
	 *
	 * @default 'data-kb-theme'
	 */
	value?: string
}

const variants = (option?: TPresetDarkModeOption): Variant[] => {
	const defaultValue = option?.value ?? "data-kb-theme"

	return [
		variantMatcher("dark", (input) => ({
			prefix: `:is([${defaultValue}="dark"]) $$ ${input.prefix}`,
		})),
		variantMatcher("light", (input) => ({
			prefix: `:is([${defaultValue}="light"]) $$ ${input.prefix}`,
		})),
	]
}

export const presetDarkMode = (option?: TPresetDarkModeOption): Preset => {
	return {
		name: "preset-dark-mode",
		variants: variants(option),
	}
}

import type { StorybookConfigVite } from "@storybook/builder-vite";
import type {
	Args,
	ArgsFromMeta,
	ArgsStoryFn,
	BuilderOptions,
	CompatibleString,
	ComponentAnnotations,
	ProjectAnnotations,
	StoryAnnotations,
	StorybookConfig as StorybookConfigBase,
	TypescriptOptions,
} from "@storybook/types";
import type { ComponentProps, Component as ComponentType } from "solid-js";
import type { SolidRenderer } from "storybook-solidjs";
import type { SetOptional, Simplify } from "type-fest";

type FrameworkName = CompatibleString<"storybook-solidjs-vite">;
type BuilderName = "@storybook/builder-vite";

type FrameworkOptions = {
	builder?: BuilderOptions;
};

type StorybookConfigFramework = {
	framework:
		| FrameworkName
		| {
				name: FrameworkName;
				options: FrameworkOptions;
		  };
	core?: StorybookConfigBase["core"] & {
		builder?:
			| BuilderName
			| {
					name: BuilderName;
					options: BuilderOptions;
			  };
	};
};

export type StorybookConfig = Omit<
	StorybookConfigBase,
	keyof StorybookConfigVite | keyof StorybookConfigFramework | "typescript"
> &
	StorybookConfigVite &
	StorybookConfigFramework & {
		typescript?: Partial<TypescriptOptions>;
	};

export type Preview = ProjectAnnotations<SolidRenderer>;

/**
 * Metadata to configure the stories for a component.
 *
 * @see [Default export](https://storybook.js.org/docs/formats/component-story-format/#default-export)
 */
export type Meta<TCmpOrArgs = Args> = [TCmpOrArgs] extends [
	ComponentType<unknown>,
]
	? ComponentAnnotations<SolidRenderer, ComponentProps<TCmpOrArgs>>
	: ComponentAnnotations<SolidRenderer, TCmpOrArgs>;

// This performs a downcast to function types that are mocks, when a mock fn is given to meta args.
type AddMocks<TArgs, DefaultArgs> = Simplify<{
	[T in keyof TArgs]: T extends keyof DefaultArgs
		? // eslint-disable-next-line @typescript-eslint/ban-types
			DefaultArgs[T] extends (...args: unknown[]) => unknown & { mock: object } // allow any function with a mock object
			? DefaultArgs[T]
			: TArgs[T]
		: TArgs[T];
}>;

/**
 * Story object that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
export type StoryObj<TMetaOrCmpOrArgs = Args> = [TMetaOrCmpOrArgs] extends [
	{
		render?: ArgsStoryFn<SolidRenderer, unknown>;
		component?: infer Component;
		args?: infer DefaultArgs;
	},
]
	? Simplify<
			(Component extends ComponentType<unknown>
				? ComponentProps<Component>
				: unknown) &
				ArgsFromMeta<SolidRenderer, TMetaOrCmpOrArgs>
		> extends infer TArgs
		? StoryAnnotations<
				SolidRenderer,
				AddMocks<TArgs, DefaultArgs>,
				SetOptional<TArgs, keyof TArgs & keyof DefaultArgs>
			>
		: never
	: TMetaOrCmpOrArgs extends ComponentType<unknown>
		? StoryAnnotations<SolidRenderer, ComponentProps<TMetaOrCmpOrArgs>>
		: StoryAnnotations<SolidRenderer, TMetaOrCmpOrArgs>;

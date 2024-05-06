import { cn } from "@/libs/cn";
import * as ImagePrimitive from "@kobalte/core/image";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { type ValidComponent, splitProps } from "solid-js";

type ImageRootProps = ImagePrimitive.ImageRootProps & { class?: string };

export const ImageRoot = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, ImageRootProps>
) => {
  const [local, rest] = splitProps(props as ImageRootProps, ["class"]);

  return (
    <ImagePrimitive.Root
      class={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", local.class)}
      {...rest}
    />
  );
};

type ImageProps = ImagePrimitive.ImageImgProps & { class?: string };

export const Image = <T extends ValidComponent = "img">(props: PolymorphicProps<T, ImageProps>) => {
  const [local, rest] = splitProps(props as ImageProps, ["class"]);

  return <ImagePrimitive.Img class={cn("aspect-square h-full w-full", local.class)} {...rest} />;
};

type ImageFallbackProps = ImagePrimitive.ImageFallbackProps & { class?: string };

export const ImageFallback = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, ImageFallbackProps>
) => {
  const [local, rest] = splitProps(props as ImageFallbackProps, ["class"]);

  return (
    <ImagePrimitive.Fallback
      class={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted",
        local.class
      )}
      {...rest}
    />
  );
};

import { cn } from "@/lib/cn";
import { Image as ImagePrimitive } from "@kobalte/core";
import { splitProps } from "solid-js";

export const ImageRoot = (props: ImagePrimitive.ImageRootProps) => {
  const [local, rest] = splitProps(props, ["class"]);

  return (
    <ImagePrimitive.Root
      class={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", local.class)}
      {...rest}
    />
  );
};

export const Image = (props: ImagePrimitive.ImageImgProps) => {
  const [local, rest] = splitProps(props, ["class"]);

  return <ImagePrimitive.Img class={cn("aspect-square h-full w-full", local.class)} {...rest} />;
};

export const ImageFallback = (props: ImagePrimitive.ImageFallbackProps) => {
  const [local, rest] = splitProps(props, ["class"]);

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

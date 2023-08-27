import { Button } from "@/registry/default/ui/button";
import { As } from "@kobalte/core";
import { A, Title } from "solid-start";

export default () => {
  return (
    <>
      <Title>404 Not Found</Title>
      <div class="flex justify-center items-center min-h-[calc(100vh-57px-97px)]">
        <div class="grid gap-4">
          <div class="flex flex-col justify-center items-center">
            <p class="text-6xl font-bold">404</p>
            <p class="text-xl font-medium">Page not found</p>
          </div>
          <p class="opacity-60">This page doesn't exist or was removed!</p>
          <Button asChild>
            <As component={A} href="/">
              Back to homepage
            </As>
          </Button>
        </div>
      </div>
    </>
  );
};

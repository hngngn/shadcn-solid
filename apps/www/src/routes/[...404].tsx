import { A, Title } from "solid-start"
import { buttonVariants } from "~/components"

export default () => {
    return (
        <>
            <Title>404 - shadcn-solid</Title>
            <div class="flex justify-center items-center min-h-[calc(100vh-57px-96px)]">
                <div class="grid gap-4">
                    <div class="flex flex-col justify-center items-center">
                        <p class="text-6xl font-bold">404</p>
                        <p class="text-xl font-medium">Page not found</p>
                    </div>
                    <p class="opacity-60">
                        This page doesn't exist or was removed!
                    </p>
                    <A href="/" class={buttonVariants()}>
                        Back to homepage
                    </A>
                </div>
            </div>
        </>
    )
}

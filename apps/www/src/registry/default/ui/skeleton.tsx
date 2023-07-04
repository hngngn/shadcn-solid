import { splitProps, type ComponentProps, type ParentComponent } from "solid-js"

export const Skeleton: ParentComponent<ComponentProps<"div">> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])

    return (
        <div
            class="animate-pulse rounded-md bg-primary/10"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

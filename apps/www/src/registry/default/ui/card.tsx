import { splitProps, type ComponentProps, type ParentComponent } from "solid-js"

export const Card: ParentComponent<ComponentProps<"div">> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])
    return (
        <div
            class="rounded-xl border bg-card text-card-foreground shadow"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const CardHeader: ParentComponent<ComponentProps<"div">> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])
    return (
        <div
            class="flex flex-col space-y-1.5 p-6"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const CardTitle: ParentComponent<ComponentProps<"h3">> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])
    return (
        <h3
            class="font-semibold leading-none tracking-tight"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const CardDescription: ParentComponent<ComponentProps<"h3">> = (
    props
) => {
    const [local, rest] = splitProps(props, ["class", "classList"])
    return (
        <h3
            class="text-sm text-muted-foreground"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const CardContent: ParentComponent<ComponentProps<"div">> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])
    return (
        <div
            class="p-6 pt-0"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

export const CardFooter: ParentComponent<ComponentProps<"div">> = (props) => {
    const [local, rest] = splitProps(props, ["class", "classList"])
    return (
        <div
            class="flex items-center p-6 pt-0"
            classList={{
                [local.class!]: Boolean(local.class),
                ...local.classList,
            }}
            {...rest}
        />
    )
}

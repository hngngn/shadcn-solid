import type { ComponentProps, ParentComponent } from "solid-js"
import { CodeBlockWrapper } from "./code-block-wrapper"

export const ComponentSource: ParentComponent<
    ComponentProps<"div"> & {
        src: string
    }
> = (props) => {
    return (
        <CodeBlockWrapper expandButtonTitle="Expand">
            {props.children}
        </CodeBlockWrapper>
    )
}

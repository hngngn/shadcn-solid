import type { ParentComponent } from "solid-js";
import { CodeBlockWrapper } from "./code-block-wrapper";

export const ComponentSource: ParentComponent = props => {
  return <CodeBlockWrapper expandButtonTitle="Expand">{props.children}</CodeBlockWrapper>;
};

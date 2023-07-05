import type { MDXComponent } from "./types"

declare module "*.mdx" {
    const Comp: MDXComponent
    export default Comp
}
declare module "*.md" {
    const Comp: MDXComponent
    export default Comp
}
declare module "*.markdown" {
    const Comp: MDXComponent
    export default Comp
}

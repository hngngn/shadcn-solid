import type { MDXComponent } from "./dist"

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

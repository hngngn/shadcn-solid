# Official First-Party Solid Ecosystem: Router, Meta (v1 vs v2), and SolidStart

> Official Sources:
> - Solid Router: https://docs.solidjs.com/solid-router
> - Solid Meta v1: https://docs.solidjs.com/solid-meta/v1
> - Solid Meta v2 Reference: https://v2.solidjs.com/reference/solid-meta
> - SolidStart v2 Reference: https://docs.solidjs.com/solid-start/v2

- `@solidjs/router`: `<Router>`, `<Route>`, `<A>`, `useNavigate`, `useParams`, `useSearchParams`, `query`, `action`, `createAsync`, `revalidate`.
- `@solidjs/meta`:
  - v1 (Solid 1): Requires `<MetaProvider tags={[]}>` at root; server splices `renderTags(tags)`.
  - v2 (Solid 2): NO `<MetaProvider>`. Ambient registry via `useHead` in `@solidjs/web`. Streaming SSR auto-splice.
- `@solidjs/start`: Full-stack meta-framework runtime and `"use server"` RPCs.

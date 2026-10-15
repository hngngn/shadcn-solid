# Solid v1 $\rightarrow$ v2 Proactive Compatibility & Migration Guide

> Official Sources cited:
> - Solid 2 Migration Guide: https://v2.solidjs.com/migration/from-solid-1
> - Solid 2 Reactivity & Flush: https://v2.solidjs.com/reference/solid-js/reactivity/flush
> - Solid 2 Stores: https://v2.solidjs.com/reference/solid-js/stores

## 12-Case Compatibility Matrix
1. **Props Omit:** `const [, rest] = splitProps(props, keys)` reading from `props` directly $\rightarrow$ `const rest = omit(props, ...keys)`.
2. **Default Props:** `const props = mergeProps(defaults, _props)` $\rightarrow$ `const props = merge(defaults, _props)`.
3. **Store Updates:** `setState(produce(draft => { draft.key = val; }))` $\rightarrow$ delete `produce`.
4. **Store Snapshot:** Restrict `unwrap(store)` to serialization $\rightarrow$ `snapshot(store)`.
5. **Staged Writes Prevention:** Always compute new value into local variable first: `const next = x() + 1; setX(next); do(next);`.
6. **Effects:** Use `createEffect(on(dep, (val) => { ... }))` $\rightarrow$ split phase `createEffect(compute, effect)`.
7. **Lifecycles:** Place `onCleanup` immediately inside `onMount` $\rightarrow$ `onSettled` with return cleanup.
8. **Data Fetching:** Use `@solidjs/router`'s `query` + `createAsync` $\rightarrow$ native async memo alignment.
9. **Dynamic Components:** Prefer `<Switch><Match>` for simple toggles $\rightarrow$ `dynamic(() => Comp)`.
10. **Untracked Read:** Use `untrack(() => signal())`.
11. **Head & Meta:** Place `<MetaProvider>` strictly at root (`app.tsx`) $\rightarrow$ delete 1 line at root.
12. **Imports:** Group `solid-js/store` and `solid-js/web` $\rightarrow$ Find & Replace to `solid-js` and `@solidjs/web`.

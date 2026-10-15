# SolidJS Reactivity System: Architecture, v1 vs v2, and Fine-Grained Mechanics

> Sources cited:
> - SolidJS Official Documentation: https://docs.solidjs.com
> - SolidJS v2 Documentation & Migration: https://v2.solidjs.com/migration/from-solid-1
> - SolidJS v2 Reactivity Reference: https://v2.solidjs.com/reference/solid-js/reactivity
> - SolidJS v2 Avoid Unnecessary Effects: https://v2.solidjs.com/guides/avoid-unnecessary-effects

---

## 1. Execution Model & Zero Virtual DOM
- Components run once on mount; they never re-render.
- JSX compiles directly to real DOM operations (`template.cloneNode`). Signal updates target micro-subscriptions directly.

## 2. Core Reactive Graph
- Sources (Signals), Computations (Memos), Sinks (Effects & JSX).
- Synchronous, glitch-free topological propagation.
- Tracking context: Signals are tracked only when called inside JSX expressions, `createMemo`, or `createEffect`.

## 3. Primitives v1 vs v2
- `createSignal`: v2 supports writable memos (`createSignal(() => ...)`).
- `createMemo`: v2 supports native async memos (`createMemo(async () => ...)`). Pre-await tracking rule: Read all dependencies before the first `await`.
- `createEffect`: v1 unified single function; v2 split compute/apply `createEffect(computeFn, effectFn)`.
- Stores: v1 from `solid-js/store`; v2 from `solid-js`.

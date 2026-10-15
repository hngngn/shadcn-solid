# SolidJS Core Invariants & Best Practices: Non-Negotiable Rules of Development

> Sources cited:
> - SolidJS Official Guides: https://docs.solidjs.com
> - SolidJS v2 Reactivity Guide: https://v2.solidjs.com/guides/avoid-unnecessary-effects

- **Invariant 1: The Reactive Scope Invariant:** Signal accessors must only be evaluated inside tracked scopes or event handlers. Never unpack in component setup body.
- **Invariant 2: The Non-Destructuring Invariant:** Never destructure `props`. Use `props.foo`, `mergeProps` for defaults, and `splitProps` for attribute forwarding.
- **Invariant 3: The Declarative Control Flow Invariant:** Never use `array.map()` in JSX (destroys DOM tree). Use `<For>` or `<Index>`. Use `<Show>` instead of ternary `? :`.
- **Invariant 4: The Web Standards & Attribute Invariant:** No `className` or `htmlFor`. Use `class`, `for`, `classList`.
- **Invariant 5: Automatic Runtime Dependency Invariant:** Never pass dependency arrays to `createEffect` or `createMemo`.
- **Invariant 6: Pre-Await Dependency Tracking Invariant (Solid 2):** In async memos, read all dependencies before the first `await`.
- **Invariant 7: DOM Injection Security Invariant:** Never bind unsanitized content to `innerHTML`.

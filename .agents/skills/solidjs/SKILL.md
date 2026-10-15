---
name: solidjs
description: "Authoritative expertise in SolidJS (v1 & v2), SolidStart v2 (Nitro v3 & Vite Environment API), fine-grained reactivity, non-negotiable core invariants, proactive v1-to-v2 compatibility guide, official ecosystem (@solidjs/router, @solidjs/meta, @solidjs/start), and comprehensive Headless UI primitives (Kobalte and Corvu). Use when creating, refactoring, debugging, or reviewing SolidJS and SolidStart applications."
---

# SolidJS & SolidStart v2 Full-Stack Expert Skill

This skill provides authoritative, battle-tested engineering guidance for **SolidJS (v1 & v2)**, **SolidStart v2**, the official first-party ecosystem, and premier Headless UI primitives (**Kobalte** & **Corvu**).

---

## 1. Core Invariants & Mental Model (Unlearning React)
1. **Components Run Exactly Once:** Component functions are setup constructors that wire up the reactive graph; they never re-render.
2. **Zero Virtual DOM:** Compiles JSX directly into real DOM operations (`template.cloneNode`). Signal updates target micro-subscriptions directly.
3. **Reactivity is Synchronous & Glitch-Free:** Propagates in topological order.
4. **Props are Dynamic Proxy Getters:** NEVER destructure `props`. Use `props.foo`, `mergeProps`, or `splitProps`.
5. **Signals Must Be Called in Tracked Scopes:** Accessors `count()` must be evaluated within JSX, `createMemo`, or `createEffect`.

---

## 2. SolidJS v1 vs v2 Architecture Matrix
| Capability | SolidJS v1 | SolidJS v2 |
| :--- | :--- | :--- |
| **`createSignal`** | Simple accessor & setter tuple | Supports computation function $\rightarrow$ **Writable Memo** |
| **`createMemo`** | Synchronous computations only | **Native Async Memo** (`createMemo(async () => ...)`) |
| **`createEffect`** | Single function tracking & side-effects | **Split Phase:** `createEffect(computeFn, effectFn, options)` |
| **Async Data Fetching** | `createResource(source, fetcher)` | Native async `createMemo` or `@solidjs/router`'s `createAsync` |
| **Async Boundaries** | `<Suspense>`, `<ErrorBoundary>` | `<Suspense>`, `<Loading>`, `<Errored>`, `<ErrorBoundary>` |
| **Store Import** | `import { createStore } from "solid-js/store"` | `import { createStore } from "solid-js"` |
| **Web Import** | `import { render } from "solid-js/web"` | `import { render } from "@solidjs/web"` |
| **Head Management** | `@solidjs/meta` 0.x (requires `<MetaProvider>`) | `@solidjs/meta` 1.x (built on ambient `useHead`, **no provider**) |

> 📖 **Deep Dive Reference:** Read [references/reactivity-v1-vs-v2.md](references/reactivity-v1-vs-v2.md)

---

## 3. SolidStart v2 Architecture & Nitro v3
### ⚠️ CRITICAL DISAMBIGUATION: SolidStart v2 ≠ SolidJS v2
- SolidStart v2 is the meta-framework build system upgrade (moving from Vinxi to **Vite 8 Environment API + Nitro v3**).
- **SolidStart v2 is built on SolidJS v1 (`solid-js@^1.x`)!**
- **AGENT MANDATE:** Never blindly apply SolidJS v2 syntax to a SolidStart v2 project unless `package.json` pins `solid-js: ^2.x`.

> 📖 **Deep Dive Reference:** Read [references/solid-start-v2.md](references/solid-start-v2.md)

---

## 4. Mandatory SolidJS Core Invariants
- **Invariant 1:** Reactive Scope Invariant (`count()` only evaluated in tracked scopes).
- **Invariant 2:** Non-Destructuring Invariant (never destructure `props`).
- **Invariant 3:** Declarative Control Flow Invariant (use `<For>`, `<Index>`, `<Show>`; no `.map()` or ternary in JSX).
- **Invariant 4:** Web Standards & Attribute Invariant (use `class`, `for`, `classList`; no `className`).
- **Invariant 5:** Automatic Runtime Dependency Invariant (no dependency arrays).
- **Invariant 6:** Pre-Await Dependency Tracking Invariant (in v2 async memo, read signals before `await`).
- **Invariant 7:** DOM Injection Security Invariant (never bind unsanitized content to `innerHTML`).

> 📖 **Deep Dive Reference:** Read [references/core-invariants.md](references/core-invariants.md)

---

## 5. Official First-Party Ecosystem Mastery
- `@solidjs/router`: `<Router>`, `<Route>`, `<A>`, `useNavigate`, `useParams`, `useSearchParams`, `query`, `action`, `createAsync`, `revalidate`.
- `@solidjs/meta`: v1 requires `<MetaProvider>`; v2 has no provider (ambient `useHead`).
- `@solidjs/start`: Full-stack meta-framework runtime (`client`, `server`, `middleware`, `"use server"` RPCs).

> 📖 **Deep Dive Reference:** Read [references/official-ecosystem.md](references/official-ecosystem.md)

---

## 6. Headless UI Mastery (Kobalte & Corvu)

Headless UI primitives deliver **100% behavior, accessibility (WAI-ARIA), keyboard interactions, focus management, and gesture physics** with **0 bytes of visual CSS styling**.

### A. Kobalte (`@kobalte/core`) — 46 Primitives
- **Compound Components & Context:** Namespaced hierarchy (`Dialog.Root`, `Dialog.Trigger`, `Dialog.Portal`, `Dialog.Content`, `Dialog.CloseButton`).
- **Polymorphism:** Polymorphic `as` prop (`as="a"`, `as={MyButton}`) using `PolymorphicProps<T, CustomProps<T>>` and `splitProps`.
- **Floating UI Integration:** Collision detection, flipping, and gutter shifting.
- **Form Integration:** Automatic `aria-invalid` linking to `<ErrorMessage>`, hidden inputs (`<HiddenSelect>`, `<Checkbox.Input>`) for native forms and server actions.
- **Outside Interaction Lifecycles:** `onPointerDownOutside`, `onEscapeKeyDown` with `e.preventDefault()`.

> 📖 **Kobalte Deep Dive References:**
> - [references/kobalte-core-architecture.md](references/kobalte-core-architecture.md): Core architecture, polymorphism typing, form validation, outside dismissal lifecycles, and floating positioning.
> - [references/kobalte-catalog-navigation-menus.md](references/kobalte-catalog-navigation-menus.md): Breadcrumbs, Link, NavigationMenu, Menubar, DropdownMenu, ContextMenu, Pagination, Tabs.
> - [references/kobalte-catalog-overlays-popups.md](references/kobalte-catalog-overlays-popups.md): Dialog, AlertDialog, Popover, HoverCard, Tooltip, Toast.
> - [references/kobalte-catalog-form-controls.md](references/kobalte-catalog-form-controls.md): Button, ToggleButton, ToggleGroup, Checkbox, RadioGroup, Switch, TextField, NumberField, Search, FileField, SegmentedControl, Rating, Select, Combobox, TimeField, Slider.
> - [references/kobalte-catalog-feedback-color-media.md](references/kobalte-catalog-feedback-color-media.md): Accordion, Collapsible, Alert, Badge, Meter, Progress, Skeleton, Separator, Image, I18nProvider, ColorArea, ColorChannelField, ColorField, ColorSlider, ColorSwatch, ColorWheel.

### B. Corvu (`corvu`) — 9 Primitives & 7 Standalone Utilities
- **Touch & Gesture Physics:** Drawer with snap points, velocity flick, dampening, nested drawer stacks, and dynamic scroll vs drag resolution.
- **Layout Splitters:** Resizable panels with keyboard accessibility and storage persistence (`storageKey`).
- **Headless Date Picker:** Calendar with single, range, and multi-date selection with accessible WAI-ARIA grid.
- **4 State Models:** Uncontrolled, Controlled, Children render callback, and Context (`Dialog.useContext()`).
- **Keyed Context Pattern (`contextId`):** Eliminates context collisions when dialogs or drawers are nested.
- **Presence Lifecycle (`@corvu/presence`):** Waits for CSS exit animations before DOM unmounting.

> 📖 **Corvu Deep Dive References:**
> - [references/corvu-core-architecture.md](references/corvu-core-architecture.md): Touch mechanics, 4 state models, keyed contexts, and presence lifecycles.
> - [references/corvu-primitives-catalog.md](references/corvu-primitives-catalog.md): Complete encyclopedic guide to all 9 primitives: Drawer, Resizable, Dialog, Popover, Tooltip, Accordion, Disclosure, Calendar, OTP Field.
> - [references/corvu-utilities-catalog.md](references/corvu-utilities-catalog.md): Complete guide to all 7 standalone utilities: createPresence, createDismissible, createFocusTrap, createPreventScroll, createTransitionSize, solid-list, solid-persistent.

---

## 7. Migration Guide & 12-Case Compatibility Guide

> 📖 **Deep Dive References:**
> - [references/v1-to-v2-compatibility-guide.md](references/v1-to-v2-compatibility-guide.md): The definitive 12-case proactive guide for writing Solid 1 code that is 100% future-proof for Solid 2 (Props omit, Store produce, local variable before setter for Staged Writes).
> - [references/migration-and-recipes.md](references/migration-and-recipes.md): Enterprise production recipes and anti-patterns.

---

## 8. Mandatory Agent Pre-Flight Checklist

Before generating or modifying any SolidJS / SolidStart / UI code, verify:
- [ ] **Did I avoid destructuring `props`?** (Used `props.prop`, `splitProps`, or `mergeProps`).
- [ ] **When forwarding props with `splitProps`, did I read from `props` directly?** (`const [, rest] = splitProps(props, keys)` prepares for Solid 2 `omit`).
- [ ] **Did I use `produce` for nested store updates?** (Prepares for Solid 2 draft setters; avoids legacy string path syntax).
- [ ] **Did I avoid reading a signal immediately after calling its setter?** (Stored target value in a local variable first to protect against Solid 2 Staged Writes).
- [ ] **Are all reactive signals evaluated inside a tracked scope?** (No snapshotting in the component setup body).
- [ ] **Did I use `<For>` or `<Index>` instead of `.map()` in JSX?**
- [ ] **Did I use `<Show>` instead of ternary `? :` for conditional DOM trees?**
- [ ] **Did I use `class` and `classList` instead of `className`?**
- [ ] **Did I avoid passing React dependency arrays to `createEffect` / `createMemo`?**
- [ ] **In Solid 2 `createMemo(async () => ...)`, did I read all signals before the first `await`?**
- [ ] **In Solid Meta v2, did I omit `<MetaProvider>`?** (v2 has no provider; ambient registry only).
- [ ] **In SolidStart server functions, did I declare `"use server";`?**
- [ ] **For Headless UI overlays (Kobalte & Corvu), are contents wrapped in `<Portal>`?**
- [ ] **For nested Corvu primitives, did I provide unique `contextId` values?**
- [ ] **For form controls, are `<ErrorMessage>` and hidden inputs (`<HiddenSelect>`) included where required?**

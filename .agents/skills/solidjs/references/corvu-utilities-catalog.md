# Corvu Utilities Encyclopedia: All 7 Behavioral Engines

> Sources cited:
> - Corvu Utilities Documentation: https://corvu.dev/docs/utilities
> - Corvu Monorepo: https://github.com/corvudev/corvu/tree/main/packages

Corvu exports its low-level behavioral engines as standalone packages. These primitives empower developers to construct custom interactive components with full accessibility, focus management, animations, and gestures.

---

## 1. createPresence (`solid-presence` or `@corvu/presence`)

### Features
- Coordinates DOM presence during CSS transitions and keyframe animations.
- Prevents elements from unmounting prematurely until exit animations finish.
- Detects `animationend` and `transitionend` events automatically.

### Usage
```tsx
import createPresence from "solid-presence";
import { createSignal, Show } from "solid-js";

export function AnimatedBox() {
  const [show, setShow] = createSignal(false);
  let ref!: HTMLDivElement;

  const { present, state } = createPresence({
    show: () => show(),
    element: () => ref,
  });

  return (
    <div>
      <button onClick={() => setShow(s => !s)}>Toggle</button>
      <Show when={present()}>
        <div
          ref={ref}
          data-state={state()} // 'present' | 'hiding' | 'hidden'
          class="fade-box"
        >
          Fade animation box
        </div>
      </Show>
    </div>
  );
}
```

### Accessibility (A11y)
- Avoids layout shifts and screen reader disorientation during transition sequences.

### API Reference
- `createPresence(options)`:
  - `show: Accessor<boolean>`: Reactive boolean indicating desired open state.
  - `element: Accessor<HTMLElement | null>`: Target element receiving CSS animations.
  - Returns `{ present: Accessor<boolean>, state: Accessor<"present" | "hiding" | "hidden"> }`.

---

## 2. createDismissible (`solid-dismissible` or `@corvu/dismissible`)

### Features
- Manages dismissible, stackable UI layers (modals, popovers, menus).
- Dismiss strategies: outside pointer down/up, outside focus, or Escape key press.
- Coordinates nested layers so that clicking outside or pressing Escape dismisses only the top-most layer.
- Events can be cancelled via `e.preventDefault()`.

### Usage
```tsx
import createDismissible from "solid-dismissible";
import { createSignal } from "solid-js";

export function FloatingCard() {
  const [open, setOpen] = createSignal(true);
  let ref!: HTMLDivElement;

  createDismissible({
    element: () => ref,
    enabled: () => open(),
    onDismiss: () => setOpen(false),
    onPointerDownOutside: (e) => {
      // Conditionally prevent closing if clicking specific target:
      if ((e.target as HTMLElement).classList.contains("keep-open")) {
        e.preventDefault();
      }
    },
  });

  return (
    <div ref={ref} class="floating-layer">
      <h3>Dismissible Layer</h3>
      <p>Click outside or press Escape to close.</p>
    </div>
  );
}
```

### Accessibility (A11y)
- Conforms to WAI-ARIA Layer Dismissal specifications. Properly restores focus upon dismissal.

### API Reference
- `createDismissible(options)`:
  - `element: Accessor<HTMLElement | null>`
  - `enabled?: Accessor<boolean>`
  - `onDismiss?: (reason: "escapeKey" | "pointerDownOutside" | "pointerUpOutside" | "focusOutside") => void`
  - `dismissOnEscapeKeyDown?: boolean | Accessor<boolean>`
  - `dismissOnPointerDownOutside?: boolean | Accessor<boolean>`
  - `dismissOnFocusOutside?: boolean | Accessor<boolean>`

---

## 3. createFocusTrap (`solid-focus-trap` or `@corvu/focus-trap`)

### Features
- Traps keyboard `Tab` cycling within a specified DOM element.
- Watches for internal DOM mutations (e.g. elements appearing/disappearing) and updates focusable lists.
- Automatically restores focus to the previously active element when disabled.
- Configurable initial focus target.

### Usage
```tsx
import createFocusTrap from "solid-focus-trap";
import { createSignal } from "solid-js";

export function ModalTrap(props: { active: boolean; children: any }) {
  let containerRef!: HTMLDivElement;

  createFocusTrap({
    element: () => containerRef,
    enabled: () => props.active,
    restoreFocus: true,
  });

  return (
    <div ref={containerRef} class="focus-trap-container">
      {props.children}
    </div>
  );
}
```

### Accessibility (A11y)
- Essential for WAI-ARIA modal dialogs (`role="dialog"`). Guarantees that keyboard users cannot accidentally tab into inert background content.

### API Reference
- `createFocusTrap(options)`:
  - `element: Accessor<HTMLElement | null>`
  - `enabled?: Accessor<boolean>`
  - `initialFocus?: boolean | HTMLElement | Accessor<HTMLElement | null>`
  - `restoreFocus?: boolean | HTMLElement | Accessor<HTMLElement | null>`
  - `fallbackFocus?: HTMLElement | Accessor<HTMLElement | null>`

---

## 4. createPreventScroll (`solid-prevent-scroll` or `@corvu/prevent-scroll`)

### Features
- Prevents scrolling outside of a given active container (modals, bottom drawers).
- Hides the document scrollbar while adding compensated right padding to prevent layout shifts.
- Supports nested scroll containers.

### Usage
```tsx
import createPreventScroll from "solid-prevent-scroll";
import { createSignal } from "solid-js";

export function ScrollLockModal(props: { isOpen: boolean }) {
  let contentRef!: HTMLDivElement;

  createPreventScroll({
    element: () => contentRef, // Allow scrolling inside contentRef, lock outside
    enabled: () => props.isOpen,
  });

  return (
    <div ref={contentRef} class="modal-body" style={{ "overflow-y": "auto" }}>
      <p>Scrollable inner content while window scroll is locked.</p>
    </div>
  );
}
```

### Accessibility (A11y)
- Prevents disorientation caused by inadvertent mousewheel background movement while reading modal content.

### API Reference
- `createPreventScroll(options)`:
  - `element?: Accessor<HTMLElement | null>`
  - `enabled?: Accessor<boolean>`
  - `hideScrollbar?: boolean` (Default `true`).
  - `preventScrollbarShift?: boolean` (Default `true`).

---

## 5. createTransitionSize (`solid-transition-size` or `@corvu/transition-size`)

### Features
- Measures dynamic width or height of collapsible containers and injects CSS custom properties.
- Injects `--corvu-transition-size-width` and `--corvu-transition-size-height` directly onto the element.
- Enables smooth CSS height transitions (`0px` $\leftrightarrow$ `auto`) without fixed hardcoded heights.

### Usage
```tsx
import createTransitionSize from "solid-transition-size";
import { createSignal, Show } from "solid-js";

export function SmoothCollapse() {
  const [open, setOpen] = createSignal(false);
  let ref!: HTMLDivElement;

  createTransitionSize({
    element: () => ref,
    dimension: "height",
  });

  return (
    <div>
      <button onClick={() => setOpen(o => !o)}>Toggle</button>
      <div
        ref={ref}
        class="collapsible-panel"
        style={{
          height: open() ? "var(--corvu-transition-size-height)" : "0px",
          overflow: "hidden",
          transition: "height 250ms ease",
        }}
      >
        <p>Smooth dynamic height content!</p>
      </div>
    </div>
  );
}
```

### API Reference
- `createTransitionSize(options)`:
  - `element: Accessor<HTMLElement | null>`
  - `dimension?: "width" | "height" | "both"` (Default `"both"`).
  - Returns `{ size: Accessor<{ width: number, height: number }> }`.

---

## 6. solid-list (`solid-list` or `@corvu/list`)

### Features
- Keyboard roving focus utility for vertical, horizontal, or multi-select lists.
- Built-in typeahead search, list loop wrapping (`loop: true`), and Tab key navigation.
- **Vim Mode:** Enables `j` (next) and `k` (previous) navigation for developer-centric command palettes.
- Works seamlessly with static and virtualized lists.

### Usage
```tsx
import { createList } from "solid-list";
import { For } from "solid-js";

export function CommandPalette(props: { commands: string[] }) {
  const { active, setActive, onKeyDown } = createList({
    items: () => props.commands,
    loop: true,
    vimMode: true, // Enables 'j' and 'k' keys!
  });

  return (
    <div onKeyDown={onKeyDown} class="command-box">
      <input type="text" placeholder="Type a command..." />
      <ul role="listbox">
        <For each={props.commands}>
          {(cmd, index) => (
            <li
              role="option"
              aria-selected={active() === index()}
              data-active={active() === index()}
              onMouseEnter={() => setActive(index())}
            >
              {cmd}
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
```

### Accessibility (A11y)
- Implements WAI-ARIA Listbox keyboard navigation. Manages `aria-activedescendant` or roving focus.

### API Reference
- `createList(options)`:
  - `items: Accessor<T[]>`
  - `loop?: boolean` (Default `true`).
  - `orientation?: "vertical" | "horizontal"` (Default `"vertical"`).
  - `vimMode?: boolean` (Default `false`).
  - Returns `{ active: Accessor<number | null>, setActive: (index: number | null) => void, onKeyDown: (e: KeyboardEvent) => void }`.
- `createMultiList(options)`: Multi-selection variant returning `selected: Accessor<number[]>`.

---

## 7. solid-persistent (`solid-persistent` or `@corvu/persistent`)

### Features
- Synchronizes reactive state with web storage (`localStorage`, `sessionStorage`, or custom adapters).
- Serializes and deserializes values with error handling.

### Usage
```tsx
import createPersistent from "solid-persistent";

export function PersistentSidebarState() {
  const [collapsed, setCollapsed] = createPersistent(false, {
    key: "sidebar-collapsed",
    storage: localStorage,
  });

  return (
    <button onClick={() => setCollapsed(c => !c)}>
      {collapsed() ? "Expand" : "Collapse"}
    </button>
  );
}
```

### API Reference
- `createPersistent<T>(initialValue: T, options)`:
  - `key: string`
  - `storage?: Storage` (Default `localStorage`).
  - `serialize?: (val: T) => string`.
  - `deserialize?: (val: string) => T`.
  - Returns `[Accessor<T>, Setter<T>]`.

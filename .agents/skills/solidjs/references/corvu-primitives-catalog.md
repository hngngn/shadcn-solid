# Corvu Primitives Encyclopedia: All 9 Headless Primitives

> Sources cited:
> - Corvu Official Documentation: https://corvu.dev/docs/primitives
> - Corvu GitHub Monorepo: https://github.com/corvudev/corvu

Corvu primitives are completely unstyled, accessible, mobile-optimized UI primitives for SolidJS with fluid gestures and flexible state architectures.

---

## 1. Drawer (`corvu/drawer` or `@corvu/drawer`)

### Features
- Draggable, physics-based bottom sheet or sidebar dialog attached to any side (`bottom`, `top`, `left`, `right`).
- Multi-tier snap points (e.g. `[0.3, 0.7, 1]`) with velocity-based momentum calculations.
- Fluid dampening resistance when dragged beyond extreme bounds (`dampenSnapPoints`).
- Seamless nested scroll handling: automatically differentiates between scrolling inner content (`overflow-y: auto`) and pulling down the sheet.
- Nested drawers: Supports stacking multiple drawers with dimming backdrops.

### Usage
```tsx
import Drawer from "corvu/drawer";
import { createSignal } from "solid-js";

export function MobileActionSheet() {
  const [open, setOpen] = createSignal(false);

  return (
    <Drawer
      open={open()}
      onOpenChange={setOpen}
      side="bottom"
      snapPoints={[0.35, 0.85]}
      breakPoints={[0.15]}
      dampenSnapPoints
    >
      <Drawer.Trigger class="btn">Open Drawer</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay class="drawer-overlay" />
        <Drawer.Content class="drawer-content">
          <div class="drawer-handle" />
          <Drawer.Label class="drawer-title">Options</Drawer.Label>
          <Drawer.Description class="drawer-desc">
            Drag down or flick to dismiss.
          </Drawer.Description>
          <div class="scrollable-content" style={{ "overflow-y": "auto", "max-height": "300px" }}>
            <p>Item 1</p>
            <p>Item 2</p>
            <p>Item 3</p>
          </div>
          <Drawer.Close class="btn-close">Cancel</Drawer.Close>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer>
  );
}
```

### Accessibility (A11y)
- Extends the WAI-ARIA `Dialog` pattern (`role="dialog"`, `aria-modal="true"`).
- Traps focus via `@corvu/focus-trap` when open.
- Escape key closes the drawer via `@corvu/dismissible`.
- Automatically labels content via `<Drawer.Label>` (`aria-labelledby`) and `<Drawer.Description>` (`aria-describedby`).

### API Reference
- `Drawer` (Root):
  - `open?: boolean`, `onOpenChange?: (open: boolean) => void` (Controlled state).
  - `initialOpen?: boolean` (Uncontrolled state).
  - `side?: "bottom" | "top" | "left" | "right"` (Default: `"bottom"`).
  - `snapPoints?: (number | string)[]` (Fractions 0-1 or pixel strings).
  - `defaultSnapPoint?: number | string` (Initial resting point).
  - `breakPoints?: (number | string | null)[]` (Thresholds where drag auto-closes).
  - `dampenSnapPoints?: boolean` (Adds rubber-band resistance beyond bounds).
  - `velocityCacheResetMs?: number` (Velocity momentum calculation window).
  - `contextId?: string` (Scoped context identifier for nested drawers).
- `Drawer.useContext(contextId?)`: Returns reactive getters: `open`, `snapPoints`, `activeSnapPoint`, `isDragging`, `translate`, `setOpen`, `setSnapPoint`.

---

## 2. Resizable (`corvu/resizable` or `@corvu/resizable`)

### Features
- Split-pane layout component supporting horizontal and vertical panel resizing.
- Keyboard accessible resizing (Arrow keys, Home/End min-max snapping).
- Collapsible panels with configurable collapse threshold (`collapsedSize`).
- Native layout persistence to storage backends (`localStorage`, `sessionStorage`).
- Bidirectional intersection handles for grid-like splitters.

### Usage
```tsx
import Resizable from "corvu/resizable";

export function CodeEditorLayout() {
  return (
    <Resizable
      orientation="horizontal"
      storage={{
        getItem: (key) => localStorage.getItem(key),
        setItem: (key, val) => localStorage.setItem(key, val),
      }}
      storageKey="split-layout-sizes"
      class="editor-split"
    >
      <Resizable.Panel
        initialSize={0.25}
        minSize={0.15}
        maxSize={0.4}
        collapsible
        collapsedSize={0.05}
        class="sidebar-panel"
      >
        <aside>File Explorer</aside>
      </Resizable.Panel>

      <Resizable.Handle class="resize-handle" aria-label="Resize file explorer" />

      <Resizable.Panel initialSize={0.75} minSize={0.5} class="main-panel">
        <main>Editor Canvas</main>
      </Resizable.Panel>
    </Resizable>
  );
}
```

### Accessibility (A11y)
- Each handle renders `role="separator"` with orientation `aria-orientation="horizontal" | "vertical"`.
- Exposes `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
- ArrowLeft / ArrowRight / ArrowUp / ArrowDown step panel size; `Home` collapses; `End` expands to maximum.

### API Reference
- `Resizable` (Root):
  - `orientation?: "horizontal" | "vertical"` (Default: `"horizontal"`).
  - `sizes?: number[]`, `onSizesChange?: (sizes: number[]) => void`.
  - `storage?: { getItem: (key: string) => string | null, setItem: (key: string, value: string) => void }`.
  - `storageKey?: string`.
  - `keyboardStep?: number` (Default 0.05 / 5%).
- `Resizable.Panel`:
  - `initialSize?: number`, `minSize?: number`, `maxSize?: number`.
  - `collapsible?: boolean`, `collapsedSize?: number`.
- `Resizable.Handle`:
  - `altKey?: boolean` (Allows proportional Alt+drag resizing).

---

## 3. Dialog (`corvu/dialog` or `@corvu/dialog`)

### Features
- Accessible modal window overlay.
- Managed presence animations via `@corvu/presence` (waits for CSS transitionend before unmounting).
- Locks background body scroll via `@corvu/prevent-scroll` without layout jump.
- 4 State consumption models: Controlled, Uncontrolled, Children render callback, and Context.
- Keyed context (`contextId`) preventing nested dialog collisions.

### Usage
```tsx
import Dialog from "corvu/dialog";
import { createSignal } from "solid-js";

export function UserSettingsDialog() {
  const [open, setOpen] = createSignal(false);

  return (
    <Dialog open={open()} onOpenChange={setOpen}>
      <Dialog.Trigger class="btn">Settings</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class="dialog-backdrop" />
        <Dialog.Content class="dialog-panel">
          <Dialog.Label class="dialog-title">User Settings</Dialog.Label>
          <Dialog.Description class="dialog-desc">
            Manage your account preferences.
          </Dialog.Description>
          <button onClick={() => setOpen(false)}>Save</button>
          <Dialog.Close class="btn-close">✕</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
```

### Accessibility (A11y)
- `role="dialog"`, `aria-modal="true"`.
- `aria-labelledby` linked to `Dialog.Label`; `aria-describedby` linked to `Dialog.Description`.
- Focus trapped via `@corvu/focus-trap`; Escape dismisses via `@corvu/dismissible`.

### API Reference
- `Dialog` (Root):
  - `open?: boolean`, `onOpenChange?: (open: boolean) => void`.
  - `initialOpen?: boolean` (Default `false`).
  - `modal?: boolean` (Default `true`).
  - `closeOnEscapeKeyDown?: boolean` (Default `true`).
  - `closeOnOutsidePointer?: boolean` (Default `true`).
  - `preventScroll?: boolean` (Default `true`).
  - `contextId?: string`.
- `Dialog.useContext(contextId?)`: Returns `open`, `setOpen`.

---

## 4. Popover (`corvu/popover` or `@corvu/popover`)

### Features
- Floating non-modal panel anchored to a trigger button.
- Integrated Floating UI for collision detection, placement auto-flip, and viewport shift.
- Optional pointing arrow component (`<Popover.Arrow>`).

### Usage
```tsx
import Popover from "corvu/popover";

export function NotificationsPopover() {
  return (
    <Popover placement="bottom-end">
      <Popover.Trigger class="btn-icon">🔔</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content class="popover-panel">
          <Popover.Arrow class="popover-arrow" />
          <p>No new notifications.</p>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
```

### Accessibility (A11y)
- `aria-haspopup="dialog"`, `aria-expanded`, `aria-controls`.
- Outside click and Escape key dismissal.

### API Reference
- `Popover` (Root):
  - `open?: boolean`, `onOpenChange?: (open: boolean) => void`.
  - `placement?: FloatingUI.Placement` (Default `"bottom"`).
  - `strategy?: "absolute" | "fixed"` (Default `"absolute"`).
  - `offset?: number | OffsetOptions` (Distance in px).
  - `flip?: boolean | FlipOptions` (Auto-flip when constrained).
  - `shift?: boolean | ShiftOptions` (Shift to prevent overflow).
  - `autoUpdate?: boolean` (Recomputes position on resize/scroll).

---

## 5. Tooltip (`corvu/tooltip` or `@corvu/tooltip`)

### Features
- Accessible floating bubble displayed on hover or keyboard focus.
- Configurable open delay and close delay (`openDelay`, `closeDelay`).
- Shared global delay skip: hovering adjacent tooltips opens immediately without delay.

### Usage
```tsx
import Tooltip from "corvu/tooltip";

export function HelpTooltip() {
  return (
    <Tooltip openDelay={400} closeDelay={200} placement="top">
      <Tooltip.Trigger class="help-btn">?</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content class="tooltip-bubble">
          <Tooltip.Arrow class="tooltip-arrow" />
          Helpful tooltip instructions.
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip>
  );
}
```

### Accessibility (A11y)
- Role `tooltip`.
- Trigger automatically receives `aria-describedby` referencing tooltip content ID.
- Escape key dismisses tooltip immediately.

### API Reference
- `Tooltip` (Root):
  - `openDelay?: number` (Default 500ms).
  - `closeDelay?: number` (Default 200ms).
  - `skipDelayDuration?: number` (Default 300ms).
  - `placement?: Placement`.

---

## 6. Accordion (`corvu/accordion` or `@corvu/accordion`)

### Features
- Vertically stacked collapsible panels.
- Multiple expansion mode (`multiple={true}`) or single exclusive mode (`multiple={false}`).
- `collapseAll={true}` allows closing all items.
- Dynamic size transitions using internal CSS variables (`--corvu-transition-size-height`).

### Usage
```tsx
import Accordion from "corvu/accordion";

export function FaqAccordion() {
  return (
    <Accordion multiple={false} collapseAll={true} class="faq-accordion">
      <Accordion.Item value="item-1">
        <Accordion.Trigger class="accordion-trigger">
          What is Corvu?
        </Accordion.Trigger>
        <Accordion.Content class="accordion-content">
          Corvu is a touch-first headless primitive suite for SolidJS.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="item-2">
        <Accordion.Trigger class="accordion-trigger">
          Is it accessible?
        </Accordion.Trigger>
        <Accordion.Content class="accordion-content">
          Yes, built to WAI-ARIA Accordion specifications.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}
```

### Accessibility (A11y)
- Trigger has `aria-expanded` and `aria-controls`.
- Content receives `role="region"` and `aria-labelledby`.
- ArrowUp / ArrowDown moves keyboard focus between accordion triggers; `Home`/`End` jump to first/last.

### API Reference
- `Accordion` (Root):
  - `value?: string[]`, `onValueChange?: (value: string[]) => void`.
  - `multiple?: boolean` (Default `false`).
  - `collapseAll?: boolean` (Default `true`).

---

## 7. Disclosure (`corvu/disclosure` or `@corvu/disclosure`)

### Features
- Lightweight single collapsible panel (the atomic primitive underlying Accordion).
- Uncontrolled or controlled state.
- Exposes height transition measurement for CSS keyframe animations.

### Usage
```tsx
import Disclosure from "corvu/disclosure";

export function DetailsPanel() {
  return (
    <Disclosure>
      <Disclosure.Trigger class="btn">View Technical Specs</Disclosure.Trigger>
      <Disclosure.Content class="disclosure-body">
        <p>Memory: 16GB, CPU: 8 Cores</p>
      </Disclosure.Content>
    </Disclosure>
  );
}
```

### Accessibility (A11y)
- `aria-expanded="true" | "false"`, `aria-controls`.

### API Reference
- `Disclosure` (Root):
  - `expanded?: boolean`, `onExpandedChange?: (expanded: boolean) => void`.
  - `initialExpanded?: boolean`.

---

## 8. Calendar (`corvu/calendar` or `@corvu/calendar`)

### Features
- Headless date picker with accessible WAI-ARIA grid calendar.
- Selection modes: `single`, `range` (start & end dates), or `multiple` dates.
- Year and month navigation controls.
- Date constraints (`min`, `max`, `isDateDisabled`).

### Usage
```tsx
import Calendar from "corvu/calendar";
import { createSignal } from "solid-js";

export function DatePicker() {
  const [date, setDate] = createSignal<Date | null>(new Date());

  return (
    <Calendar mode="single" value={date()} onValueChange={setDate}>
      <Calendar.Nav class="calendar-nav">
        <Calendar.Prev aria-label="Previous month">‹</Calendar.Prev>
        <Calendar.Label>{(state) => `${state.monthName} ${state.year}`}</Calendar.Label>
        <Calendar.Next aria-label="Next month">›</Calendar.Next>
      </Calendar.Nav>

      <Calendar.Table class="calendar-table">
        <Calendar.Head>
          <Calendar.Row>
            {(weekday) => <Calendar.HeaderCell>{weekday}</Calendar.HeaderCell>}
          </Calendar.Row>
        </Calendar.Head>
        <Calendar.Body>
          {(week) => (
            <Calendar.Row>
              {(day) => (
                <Calendar.Cell date={day.date}>
                  <Calendar.CellTrigger
                    data-selected={day.isSelected}
                    data-today={day.isToday}
                    data-disabled={day.isDisabled}
                  >
                    {day.dayNumber}
                  </Calendar.CellTrigger>
                </Calendar.Cell>
              )}
            </Calendar.Row>
          )}
        </Calendar.Body>
      </Calendar.Table>
    </Calendar>
  );
}
```

### Accessibility (A11y)
- Full WAI-ARIA `grid` role pattern (`role="grid"`, `role="row"`, `role="gridcell"`).
- Keyboard 2D arrow navigation: ArrowLeft/Right changes days; ArrowUp/Down changes weeks.
- PageUp/PageDown jumps months; Alt+PageUp/PageDown jumps years.

### API Reference
- `Calendar` (Root):
  - `mode?: "single" | "range" | "multiple"` (Default `"single"`).
  - `value?: Date | Date[] | { from: Date, to?: Date } | null`.
  - `onValueChange?: (val: any) => void`.
  - `min?: Date`, `max?: Date`, `isDateDisabled?: (date: Date) => boolean`.

---

## 9. OTP Field (`corvu/otp-field` or `@corvu/otp-field`)

### Features
- Accessible multi-slot one-time passcode verification input.
- Captures paste, backspace across slots, and mobile SMS autofill.
- Exposes fake animated caret state for custom visual styling.

### Usage
```tsx
import OtpField from "corvu/otp-field";
import { createSignal, For } from "solid-js";

export function PasscodeEntry() {
  const [otp, setOtp] = createSignal("");

  return (
    <OtpField
      maxLength={6}
      value={otp()}
      onValueChange={setOtp}
      onComplete={(code) => console.log("Submitting code:", code)}
    >
      <OtpField.Input class="sr-only-input" />
      <div class="otp-slots-row">
        <For each={Array.from({ length: 6 })}>
          {(_, i) => (
            <OtpField.Slot index={i()}>
              {(slot) => (
                <div class="otp-slot" data-active={slot.isActive}>
                  {slot.char || ""}
                  {slot.hasFakeCaret && <span class="blink-caret" />}
                </div>
              )}
            </OtpField.Slot>
          )}
        </For>
      </div>
    </OtpField>
  );
}
```

### Accessibility (A11y)
- Operates on a single hidden `<input inputmode="numeric" autocomplete="one-time-code">` for native screen reader announcements and mobile autofill.

### API Reference
- `OtpField` (Root):
  - `maxLength: number` (e.g. 4 or 6).
  - `value?: string`, `onValueChange?: (val: string) => void`.
  - `onComplete?: (code: string) => void`.
  - `noScript?: boolean`.

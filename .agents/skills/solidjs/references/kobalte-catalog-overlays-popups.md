# Kobalte Components Encyclopedia: Overlays & Popups

> Sources cited:
> - Kobalte Official Documentation: https://kobalte.dev/docs/core
> - WAI-ARIA Authoring Practices Guide (APG)

This catalog covers all 6 modal, non-modal floating, and notification overlay primitives in Kobalte.

---

## 1. Dialog

### Import
```tsx
import { Dialog } from "@kobalte/core/dialog";
```

### Features
- Modal dialog with accessibility focus trapping and outside dismissal.
- Disables background scrolling when opened (`preventScroll`).
- Supports controlled and uncontrolled open state.
- Nested modal support with proper dismissal stacking.

### Anatomy
- `Dialog`: Root provider managing open state.
- `Dialog.Trigger`: Button that opens the dialog.
- `Dialog.Portal`: Mounts overlay into `document.body`.
- `Dialog.Overlay`: Backdrop dimmed overlay.
- `Dialog.Content`: Modal container that traps focus.
- `Dialog.Title`: Accessible heading (`aria-labelledby`).
- `Dialog.Description`: Accessible body description (`aria-describedby`).
- `Dialog.CloseButton`: Dismissal trigger.

```tsx
<Dialog>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Title>Title</Dialog.Title>
      <Dialog.Description>Description</Dialog.Description>
      <Dialog.CloseButton>Close</Dialog.CloseButton>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog>
```

### Example & Usage
```tsx
import { Dialog } from "@kobalte/core/dialog";
import { createSignal } from "solid-js";

export function EditProfileModal() {
  const [open, setOpen] = createSignal(false);

  return (
    <Dialog open={open()} onOpenChange={setOpen}>
      <Dialog.Trigger class="btn">Edit Profile</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class="modal-overlay" />
        <div class="modal-positioner">
          <Dialog.Content class="modal-content">
            <Dialog.Title>Edit Profile</Dialog.Title>
            <Dialog.Description>Update your personal information below.</Dialog.Description>
            <input type="text" placeholder="Name" />
            <Dialog.CloseButton class="btn-close">Cancel</Dialog.CloseButton>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog>
  );
}
```

### API Reference
- `Dialog`: `open?: boolean`, `defaultOpen?: boolean`, `onOpenChange?: (open: boolean) => void`, `modal?: boolean`, `preventScroll?: boolean`, `forceMount?: boolean`.
- `Dialog.Content`: `onPointerDownOutside?: (e) => void`, `onEscapeKeyDown?: (e) => void`.

### Rendered Elements
- `Dialog.Trigger` $\rightarrow$ `<button>`
- `Dialog.Overlay` $\rightarrow$ `<div>`
- `Dialog.Content` $\rightarrow$ `<div>` (role `dialog`, `aria-modal="true"`)
- `Dialog.Title` $\rightarrow$ `<h2>`
- `Dialog.Description` $\rightarrow$ `<p>`
- `Dialog.CloseButton` $\rightarrow$ `<button>`

### Accessibility (A11y)
- Role `dialog`, `aria-modal="true"`.
- `aria-labelledby` linked to `Dialog.Title`; `aria-describedby` linked to `Dialog.Description`.
- Focus is trapped within `<Content>`. Escape key dismisses dialog.

---

## 2. AlertDialog

### Import
```tsx
import { AlertDialog } from "@kobalte/core/alert-dialog";
```

### Features
- Critical confirmation dialog interrupting user flow.
- Non-dismissible by clicking overlay.
- Automatically routes initial focus to the least destructive action (e.g. Cancel button).

### Anatomy
- `AlertDialog`: Root state provider.
- `AlertDialog.Trigger`: Opens alert dialog.
- `AlertDialog.Portal`: Portal container.
- `AlertDialog.Overlay`: Backdrop overlay.
- `AlertDialog.Content`: Modal container with role `alertdialog`.
- `AlertDialog.Title`, `Description`, `CloseButton`.

```tsx
<AlertDialog>
  <AlertDialog.Trigger>Delete</AlertDialog.Trigger>
  <AlertDialog.Portal>
    <AlertDialog.Overlay />
    <AlertDialog.Content>
      <AlertDialog.Title>Confirm Delete</AlertDialog.Title>
      <AlertDialog.Description>Are you sure?</AlertDialog.Description>
      <AlertDialog.CloseButton>Cancel</AlertDialog.CloseButton>
    </AlertDialog.Content>
  </AlertDialog.Portal>
</AlertDialog>
```

### Example & Usage
```tsx
import { AlertDialog } from "@kobalte/core/alert-dialog";

export function DeleteConfirmation() {
  return (
    <AlertDialog>
      <AlertDialog.Trigger class="btn-danger">Delete Repository</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay class="modal-overlay" />
        <AlertDialog.Content class="modal-content">
          <AlertDialog.Title>Delete Repository?</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone. All branches and issues will be lost.
          </AlertDialog.Description>
          <div class="actions">
            <AlertDialog.CloseButton class="btn-secondary">Cancel</AlertDialog.CloseButton>
            <button class="btn-danger" onClick={() => executeDelete()}>Confirm</button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
```

### API Reference
- `AlertDialog`: Same props as `Dialog`, but `closeOnPointerDownOutside` defaults to `false`.

### Rendered Elements
- `AlertDialog.Content` $\rightarrow$ `<div>` (role `alertdialog`)

### Accessibility (A11y)
- Role `alertdialog`. Screen readers announce urgent modal message. Initial focus placed on safe button.

---

## 3. Popover

### Import
```tsx
import { Popover } from "@kobalte/core/popover";
```

### Features
- Floating contextual popover anchored to a trigger or custom anchor element.
- Integrated `@floating-ui/dom` with flip, shift, and gutter.
- Focus trapping, escape dismiss, and click-outside dismissal.

### Anatomy
- `Popover`: Root provider.
- `Popover.Trigger`: Interactive button opening popover.
- `Popover.Anchor`: Optional separate anchor point.
- `Popover.Portal`: Portals content.
- `Popover.Content`: Floating content panel.
- `Popover.Arrow`: Optional visual pointer arrow.
- `Popover.Title`, `Description`, `CloseButton`.

```tsx
<Popover>
  <Popover.Trigger>Info</Popover.Trigger>
  <Popover.Portal>
    <Popover.Content>
      <Popover.Arrow />
      <Popover.Title>Help</Popover.Title>
      <Popover.Description>Details...</Popover.Description>
    </Popover.Content>
  </Popover.Portal>
</Popover>
```

### Example & Usage
```tsx
import { Popover } from "@kobalte/core/popover";

export function FilterPopover() {
  return (
    <Popover placement="bottom-start" gutter={8}>
      <Popover.Trigger class="btn">Filter</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content class="popover-content">
          <Popover.Arrow />
          <Popover.Title>Filter Results</Popover.Title>
          <div>
            <label><input type="checkbox" /> Active</label>
            <label><input type="checkbox" /> Inactive</label>
          </div>
          <Popover.CloseButton>Apply</Popover.CloseButton>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
```

### API Reference
- `Popover`: `open?: boolean`, `onOpenChange?: (open: boolean) => void`, `modal?: boolean`.
- `Popover.Content`: `placement?: Placement`, `gutter?: number`, `shift?: boolean`, `flip?: boolean`.

### Rendered Elements
- `Popover.Trigger` $\rightarrow$ `<button>`
- `Popover.Content` $\rightarrow$ `<div>` (role `dialog`)
- `Popover.Arrow` $\rightarrow$ `<div>`

### Accessibility (A11y)
- `aria-haspopup="dialog"`, `aria-expanded`, `aria-controls`. Escape key dismisses.

---

## 4. HoverCard

### Import
```tsx
import { HoverCard } from "@kobalte/core/hover-card";
```

### Features
- Preview card displayed when hovering over or focusing a trigger (e.g. Twitter user profile preview).
- Configurable open/close delays (`openDelay`, `closeDelay`).
- Non-modal: does not trap focus.

### Anatomy
- `HoverCard`: Root provider.
- `HoverCard.Trigger`: Anchor link or button.
- `HoverCard.Portal`: Portal wrapper.
- `HoverCard.Content`: Preview floating panel.
- `HoverCard.Arrow`: Optional pointing arrow.

```tsx
<HoverCard>
  <HoverCard.Trigger href="/user/alex">@alex</HoverCard.Trigger>
  <HoverCard.Portal>
    <HoverCard.Content>
      <HoverCard.Arrow />
      <p>Bio preview...</p>
    </HoverCard.Content>
  </HoverCard.Portal>
</HoverCard>
```

### Example & Usage
```tsx
import { HoverCard } from "@kobalte/core/hover-card";

export function AuthorBio() {
  return (
    <HoverCard openDelay={300} closeDelay={200}>
      <HoverCard.Trigger href="/author" class="author-link">
        Jane Doe
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content class="hovercard-content">
          <HoverCard.Arrow />
          <h4>Jane Doe</h4>
          <p>Staff Software Engineer working on SolidJS.</p>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard>
  );
}
```

### API Reference
- `HoverCard`: `openDelay?: number` (default 700ms), `closeDelay?: number` (default 300ms), `open?: boolean`, `onOpenChange?: (open: boolean) => void`.

### Rendered Elements
- `HoverCard.Trigger` $\rightarrow$ `<a>`
- `HoverCard.Content` $\rightarrow$ `<div>`

### Accessibility (A11y)
- Opens on hover and keyboard focus. Does not interrupt screen readers.

---

## 5. Tooltip

### Import
```tsx
import { Tooltip } from "@kobalte/core/tooltip";
```

### Features
- Brief informative label appearing on hover and keyboard focus.
- Automatically skips delay when hovering across multiple tooltips quickly (`skipDelayDuration`).
- Automatically hides on pointer down or Escape.

### Anatomy
- `Tooltip`: Root provider.
- `Tooltip.Trigger`: Interactive button or icon.
- `Tooltip.Portal`: Portal wrapper.
- `Tooltip.Content`: Tooltip bubble.
- `Tooltip.Arrow`: Optional pointing arrow.

```tsx
<Tooltip>
  <Tooltip.Trigger>ℹ</Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Content>
      <Tooltip.Arrow />
      Help text
    </Tooltip.Content>
  </Tooltip.Portal>
</Tooltip>
```

### Example & Usage
```tsx
import { Tooltip } from "@kobalte/core/tooltip";

export function IconButton() {
  return (
    <Tooltip openDelay={500}>
      <Tooltip.Trigger class="icon-btn" aria-label="Settings">
        ⚙
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content class="tooltip-bubble">
          <Tooltip.Arrow />
          Manage Application Settings
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip>
  );
}
```

### API Reference
- `Tooltip`: `openDelay?: number`, `closeDelay?: number`, `skipDelayDuration?: number`, `open?: boolean`, `onOpenChange?: (open: boolean) => void`.
- `Tooltip.Content`: `placement?: Placement`.

### Rendered Elements
- `Tooltip.Trigger` $\rightarrow$ `<button>`
- `Tooltip.Content` $\rightarrow$ `<div>` (role `tooltip`)

### Accessibility (A11y)
- Role `tooltip`.
- Trigger automatically receives `aria-describedby` linking to the tooltip content ID.

---

## 6. Toast

### Import
```tsx
import { Toast, toaster } from "@kobalte/core/toast";
```

### Features
- Imperative toast notification dispatcher (`toaster.show`).
- Screen reader polite/assertive announcement region (`<Toast.Region>`).
- Auto-dismiss timer with pause on hover/focus.
- Animated progress bar (`<Toast.ProgressTrack>` / `<Toast.ProgressFill>`).

### Anatomy
- `Toast`: Individual toast component.
- `Toast.Content`: Toast body container.
- `Toast.Title`: Accessible toast title.
- `Toast.Description`: Accessible toast message.
- `Toast.CloseButton`: Manual dismiss button.
- `Toast.ProgressTrack` / `Toast.ProgressFill`: Progress bar.
- `Toast.Region`: Fixed viewport region announcing toasts.
- `Toast.List`: Container rendering active toasts list.

```tsx
<Toast.Region limit={5}>
  <Toast.List />
</Toast.Region>
```

### Example & Usage
```tsx
import { Toast, toaster } from "@kobalte/core/toast";
import { Portal } from "solid-js/web";

// Global region in Root:
export function Toaster() {
  return (
    <Portal>
      <Toast.Region limit={3} class="toast-region">
        <Toast.List />
      </Toast.Region>
    </Portal>
  );
}

// Custom Toast view:
export function CustomToastView(props: { toastId: number; title: string; desc: string }) {
  return (
    <Toast toastId={props.toastId} class="toast-item">
      <Toast.Content>
        <Toast.Title>{props.title}</Toast.Title>
        <Toast.Description>{props.desc}</Toast.Description>
        <Toast.CloseButton>✕</Toast.CloseButton>
      </Toast.Content>
      <Toast.ProgressTrack>
        <Toast.ProgressFill />
      </Toast.ProgressTrack>
    </Toast>
  );
}

// Imperative trigger:
export function notify(title: string, desc: string) {
  toaster.show((props) => (
    <CustomToastView toastId={props.toastId} title={title} desc={desc} />
  ));
}
```

### API Reference
- `toaster.show(component, options?)`: `duration?: number` (default 5000ms), `persistent?: boolean`.
- `Toast.Region`: `limit?: number`, `swipeDirection?: "right" | "left" | "up" | "down"`, `hotkey?: string[]`.

### Rendered Elements
- `Toast.Region` $\rightarrow$ `<section>` (role `region`, `aria-label="Notifications"`)
- `Toast` $\rightarrow$ `<li>` (role `status`, `aria-live="polite"`)
- `Toast.Title` $\rightarrow$ `<div>`
- `Toast.Description` $\rightarrow$ `<div>`

### Accessibility (A11y)
- Live region with `aria-live="polite"`. Focusable via hotkey (default `F8`).

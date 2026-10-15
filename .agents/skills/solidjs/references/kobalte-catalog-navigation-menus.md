# Kobalte Components Encyclopedia: Navigation & Menus

> Sources cited:
> - Kobalte Official Documentation: https://kobalte.dev/docs/core
> - WAI-ARIA Authoring Practices Guide (APG)

This catalog covers all 8 Navigation, Menu, and Layout switching components in Kobalte.

---

## 1. Breadcrumbs

### Import
```tsx
import { Breadcrumbs } from "@kobalte/core/breadcrumbs";
```

### Features
- WAI-ARIA compliant hierarchical navigation trail.
- Automatically announces active page location via `aria-current="page"`.
- Separators are automatically hidden from assistive technologies (`aria-hidden="true"`).
- Polymorphic support with `@solidjs/router` (`<A>`).

### Anatomy
- `Breadcrumbs`: Root navigation container.
- `Breadcrumbs.List`: Ordered list container.
- `Breadcrumbs.Item`: List item container for a crumb.
- `Breadcrumbs.Link`: Interactive link or active page indicator.
- `Breadcrumbs.Separator`: Visual separator between crumbs.

```tsx
<Breadcrumbs>
  <Breadcrumbs.List>
    <Breadcrumbs.Item>
      <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
      <Breadcrumbs.Separator>/</Breadcrumbs.Separator>
    </Breadcrumbs.Item>
    <Breadcrumbs.Item>
      <Breadcrumbs.Link current href="/profile">Profile</Breadcrumbs.Link>
    </Breadcrumbs.Item>
  </Breadcrumbs.List>
</Breadcrumbs>
```

### Example & Usage
```tsx
import { Breadcrumbs } from "@kobalte/core/breadcrumbs";
import { A } from "@solidjs/router";

export function AppBreadcrumb() {
  return (
    <Breadcrumbs aria-label="Breadcrumb">
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link as={A} href="/">Dashboard</Breadcrumbs.Link>
          <Breadcrumbs.Separator>/</Breadcrumbs.Separator>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link as={A} href="/projects">Projects</Breadcrumbs.Link>
          <Breadcrumbs.Separator>/</Breadcrumbs.Separator>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link current href="/projects/kobalte">Kobalte</Breadcrumbs.Link>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
  );
}
```

### API Reference
- `Breadcrumbs`: `separator?: string | JSX.Element`.
- `Breadcrumbs.Link`: `href?: string`, `current?: boolean` (sets active page state), `disabled?: boolean`.

### Rendered Elements
- `Breadcrumbs` $\rightarrow$ `<nav>`
- `Breadcrumbs.List` $\rightarrow$ `<ol>`
- `Breadcrumbs.Item` $\rightarrow$ `<li>`
- `Breadcrumbs.Link` $\rightarrow$ `<a>` (or `<span>` when current)
- `Breadcrumbs.Separator` $\rightarrow$ `<span>`

### Accessibility (A11y)
- Landmark: `<nav aria-label="Breadcrumb">`.
- Current item receives `aria-current="page"`.
- Separator receives `aria-hidden="true"`.

---

## 2. Link

### Import
```tsx
import { Link } from "@kobalte/core/link";
```

### Features
- Accessible hyperlink component.
- Handles disabled links properly (removes `href`, sets `aria-disabled="true"`).
- Keyboard interaction: Emulates Space key activation when rendered on non-native link elements.

### Anatomy
- `Link`: The link component.

```tsx
<Link href="https://kobalte.dev">Kobalte Docs</Link>
```

### Example & Usage
```tsx
import { Link } from "@kobalte/core/link";

export function ExternalLink() {
  return (
    <Link href="https://solidjs.com" target="_blank" rel="noopener noreferrer">
      Visit SolidJS
    </Link>
  );
}
```

### API Reference
- `Link`: `href?: string`, `disabled?: boolean`, `as?: ValidComponent`.

### Rendered Elements
- `Link` $\rightarrow$ `<a>` (or `<span>` when disabled).

### Accessibility (A11y)
- Role `link`. When `disabled={true}`, removes `href` and applies `aria-disabled="true"`.

---

## 3. NavigationMenu

### Import
```tsx
import { NavigationMenu } from "@kobalte/core/navigation-menu";
```

### Features
- WAI-ARIA Menubar and Navigation pattern for top-level site navigation.
- Shared animated viewport for all submenus (`NavigationMenu.Viewport`).
- Focus management and typeahead search.
- Animated indicator and arrow.

### Anatomy
- `NavigationMenu`: Root container.
- `NavigationMenu.Menu`: Container for individual top-level item.
- `NavigationMenu.Trigger`: Button that toggles the dropdown.
- `NavigationMenu.Icon`: Indicator chevron icon.
- `NavigationMenu.Portal`: Portals content into Viewport.
- `NavigationMenu.Content`: Dropdown menu content.
- `NavigationMenu.Item`: Navigation link item.
- `NavigationMenu.Viewport`: Shared bounding box for floating dropdowns.
- `NavigationMenu.Arrow`: Optional pointing arrow.

```tsx
<NavigationMenu>
  <NavigationMenu.Menu>
    <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
    <NavigationMenu.Portal>
      <NavigationMenu.Content>
        <NavigationMenu.Item href="/docs">Docs</NavigationMenu.Item>
      </NavigationMenu.Content>
    </NavigationMenu.Portal>
  </NavigationMenu.Menu>
  <NavigationMenu.Viewport />
</NavigationMenu>
```

### Example & Usage
```tsx
import { NavigationMenu } from "@kobalte/core/navigation-menu";

export function SiteNav() {
  return (
    <NavigationMenu>
      <NavigationMenu.Menu>
        <NavigationMenu.Trigger>Features</NavigationMenu.Trigger>
        <NavigationMenu.Portal>
          <NavigationMenu.Content>
            <NavigationMenu.Item href="/analytics">Analytics</NavigationMenu.Item>
            <NavigationMenu.Item href="/security">Security</NavigationMenu.Item>
          </NavigationMenu.Content>
        </NavigationMenu.Portal>
      </NavigationMenu.Menu>
      <NavigationMenu.Viewport />
    </NavigationMenu>
  );
}
```

### API Reference
- `NavigationMenu`: `value?: string`, `onValueChange?: (val: string) => void`, `delayDuration?: number`, `skipDelayDuration?: number`.
- `NavigationMenu.Content`: `placement?: Placement`.

### Rendered Elements
- `NavigationMenu` $\rightarrow$ `<nav>`
- `NavigationMenu.Menu` $\rightarrow$ `<div>`
- `NavigationMenu.Trigger` $\rightarrow$ `<button>`
- `NavigationMenu.Content` $\rightarrow$ `<div>`
- `NavigationMenu.Item` $\rightarrow$ `<a>`
- `NavigationMenu.Viewport` $\rightarrow$ `<div>`

### Accessibility (A11y)
- Top-level items use `role="menubar"` or navigation links.
- Submenus use `aria-expanded` and `aria-controls`.
- ArrowLeft / ArrowRight navigates between top menus; ArrowDown enters submenu; Escape closes.

---

## 4. Menubar

### Import
```tsx
import { Menubar } from "@kobalte/core/menubar";
```

### Features
- Desktop application horizontal menu bar (File, Edit, View, Help).
- Bidirectional keyboard navigation: Left/Right switches menus; Up/Down traverses items.
- Submenus, checkbox items, radio groups.

### Anatomy
- `Menubar`: Root container.
- `Menubar.Menu`: Single menu dropdown container.
- `Menubar.Trigger`: Button that opens the menu.
- `Menubar.Portal`: Portals dropdown to document body.
- `Menubar.Content`: Dropdown content container.
- `Menubar.Item`: Action item.
- `Menubar.Separator`: Divider line.
- `Menubar.Sub`, `Menubar.SubTrigger`, `Menubar.SubContent`: Submenus.

```tsx
<Menubar>
  <Menubar.Menu>
    <Menubar.Trigger>File</Menubar.Trigger>
    <Menubar.Portal>
      <Menubar.Content>
        <Menubar.Item onSelect={handleNew}>New</Menubar.Item>
        <Menubar.Separator />
        <Menubar.Item onSelect={handleExit}>Exit</Menubar.Item>
      </Menubar.Content>
    </Menubar.Portal>
  </Menubar.Menu>
</Menubar>
```

### Example & Usage
```tsx
import { Menubar } from "@kobalte/core/menubar";

export function DesktopMenubar() {
  return (
    <Menubar>
      <Menubar.Menu>
        <Menubar.Trigger>File</Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content>
            <Menubar.Item onSelect={() => console.log("New")}>New File</Menubar.Item>
            <Menubar.Item onSelect={() => console.log("Save")}>Save</Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>Edit</Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content>
            <Menubar.Item onSelect={() => console.log("Undo")}>Undo</Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar>
  );
}
```

### API Reference
- `Menubar`: `value?: string`, `onValueChange?: (val: string) => void`, `loop?: boolean`.
- `Menubar.Item`: `onSelect?: () => void`, `disabled?: boolean`, `closeOnSelect?: boolean`.

### Rendered Elements
- `Menubar` $\rightarrow$ `<div>` (role `menubar`)
- `Menubar.Trigger` $\rightarrow$ `<button>`
- `Menubar.Content` $\rightarrow$ `<div>` (role `menu`)
- `Menubar.Item` $\rightarrow$ `<div>` (role `menuitem`)

### Accessibility (A11y)
- Full WAI-ARIA Menubar role hierarchy.
- Arrow keys navigate seamlessly in 2D (horizontal across menubars, vertical across items).

---

## 5. DropdownMenu

### Import
```tsx
import { DropdownMenu } from "@kobalte/core/dropdown-menu";
```

### Features
- Floating contextual action menu triggered by button click.
- Supports single action items, checkbox items, radio groups, submenus.
- Roving focus, typeahead character search, Escape dismiss.

### Anatomy
- `DropdownMenu`: Root provider.
- `DropdownMenu.Trigger`: Button opening menu.
- `DropdownMenu.Portal`: Portal wrapper.
- `DropdownMenu.Content`: Floating panel.
- `DropdownMenu.Item`: Menu item.
- `DropdownMenu.ItemLabel`: Accessible label.
- `DropdownMenu.ItemIndicator`: Checkmark/bullet icon.
- `DropdownMenu.CheckboxItem`: Toggleable item.
- `DropdownMenu.RadioGroup` / `RadioItem`: Radio choice items.
- `DropdownMenu.Sub`: Submenu container.

```tsx
<DropdownMenu>
  <DropdownMenu.Trigger>Options</DropdownMenu.Trigger>
  <DropdownMenu.Portal>
    <DropdownMenu.Content>
      <DropdownMenu.Item>Profile</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu>
```

### Example & Usage
```tsx
import { DropdownMenu } from "@kobalte/core/dropdown-menu";
import { createSignal } from "solid-js";

export function UserMenu() {
  const [isAdmin, setIsAdmin] = createSignal(false);

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>Actions ▼</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          <DropdownMenu.Item onSelect={() => alert("Edit")}>Edit</DropdownMenu.Item>
          <DropdownMenu.CheckboxItem checked={isAdmin()} onChange={setIsAdmin}>
            <DropdownMenu.ItemIndicator>✓</DropdownMenu.ItemIndicator>
            Admin View
          </DropdownMenu.CheckboxItem>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu>
  );
}
```

### API Reference
- `DropdownMenu`: `open?: boolean`, `onOpenChange?: (open: boolean) => void`, `modal?: boolean`.
- `DropdownMenu.Content`: `placement?: Placement`, `gutter?: number`, `flip?: boolean`.

### Rendered Elements
- `DropdownMenu.Trigger` $\rightarrow$ `<button>`
- `DropdownMenu.Content` $\rightarrow$ `<div>` (role `menu`)
- `DropdownMenu.Item` $\rightarrow$ `<div>` (role `menuitem`)

### Accessibility (A11y)
- `aria-haspopup="menu"`, `aria-expanded`, `aria-controls`.
- ArrowUp/ArrowDown cycle items, Enter/Space trigger selection, Escape closes.

---

## 6. ContextMenu

### Import
```tsx
import { ContextMenu } from "@kobalte/core/context-menu";
```

### Features
- Displays action menu positioned exactly at cursor coordinates upon right-click or long press.
- Reuses the entire menu subcomponent architecture of DropdownMenu.

### Anatomy
- `ContextMenu`: Root provider.
- `ContextMenu.Trigger`: Target area that listens for right-click (`contextmenu` event).
- `ContextMenu.Portal`, `Content`, `Item`, `Separator`: Same subcomponents as DropdownMenu.

```tsx
<ContextMenu>
  <ContextMenu.Trigger>Right click here</ContextMenu.Trigger>
  <ContextMenu.Portal>
    <ContextMenu.Content>
      <ContextMenu.Item>Inspect</ContextMenu.Item>
    </ContextMenu.Content>
  </ContextMenu.Portal>
</ContextMenu>
```

### Example & Usage
```tsx
import { ContextMenu } from "@kobalte/core/context-menu";

export function FileRow(props: { name: string }) {
  return (
    <ContextMenu>
      <ContextMenu.Trigger class="file-item">{props.name}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content>
          <ContextMenu.Item onSelect={() => console.log("Rename")}>Rename</ContextMenu.Item>
          <ContextMenu.Item onSelect={() => console.log("Delete")}>Delete</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu>
  );
}
```

### API Reference
- `ContextMenu`: `open?: boolean`, `onOpenChange?: (open: boolean) => void`.

### Rendered Elements
- `ContextMenu.Trigger` $\rightarrow$ `<div>`
- `ContextMenu.Content` $\rightarrow$ `<div>` (role `menu`)

### Accessibility (A11y)
- Accessible via keyboard: `Shift + F10` or context menu key on selected trigger opens menu.

---

## 7. Pagination

### Import
```tsx
import { Pagination } from "@kobalte/core/pagination";
```

### Features
- Navigates numbered pages in tables and datasets.
- Automatic ellipsis (`...`) computation based on `siblingCount`.
- Keyboard navigation across page items with roving focus.

### Anatomy
- `Pagination`: Root container.
- `Pagination.Items`: Render prop iterating visible page numbers.
- `Pagination.Item`: Individual page number button.
- `Pagination.Ellipsis`: Ellipsis indicator.
- `Pagination.Previous`: Previous page button.
- `Pagination.Next`: Next page button.

```tsx
<Pagination count={20}>
  <Pagination.Previous>Prev</Pagination.Previous>
  <Pagination.Items />
  <Pagination.Next>Next</Pagination.Next>
</Pagination>
```

### Example & Usage
```tsx
import { Pagination } from "@kobalte/core/pagination";
import { createSignal } from "solid-js";

export function TablePagination() {
  const [page, setPage] = createSignal(1);

  return (
    <Pagination
      count={100}
      page={page()}
      onPageChange={setPage}
      siblingCount={1}
      itemComponent={(props) => (
        <Pagination.Item page={props.page}>{props.page}</Pagination.Item>
      )}
      ellipsisComponent={() => <Pagination.Ellipsis>...</Pagination.Ellipsis>}
    >
      <Pagination.Previous>« Previous</Pagination.Previous>
      <Pagination.Items />
      <Pagination.Next>Next »</Pagination.Next>
    </Pagination>
  );
}
```

### API Reference
- `Pagination`: `count: number`, `page?: number`, `defaultPage?: number`, `onPageChange?: (page: number) => void`, `siblingCount?: number`, `showFirst?: boolean`, `showLast?: boolean`.
- `Pagination.Item`: `page: number`.

### Rendered Elements
- `Pagination` $\rightarrow$ `<nav>`
- `Pagination.Items` $\rightarrow$ `<ul>`
- `Pagination.Item` $\rightarrow$ `<button>` (inside `<li>`)
- `Pagination.Ellipsis` $\rightarrow$ `<span>`

### Accessibility (A11y)
- Wrapped in `<nav aria-label="Pagination">`.
- Active page marked with `aria-current="page"`.
- ArrowLeft/ArrowRight moves focus across pages.

---

## 8. Tabs

### Import
```tsx
import { Tabs } from "@kobalte/core/tabs";
```

### Features
- Tabbed interface separating content into multiple views.
- Keyboard roving tabindex (ArrowLeft/ArrowRight or ArrowUp/ArrowDown).
- Horizontal and vertical orientation.
- Animatable `<Tabs.Indicator>` tracking active tab width and position.

### Anatomy
- `Tabs`: Root container.
- `Tabs.List`: Tab trigger bar.
- `Tabs.Trigger`: Individual tab button.
- `Tabs.Indicator`: Visual bar indicator.
- `Tabs.Content`: Tab body view.

```tsx
<Tabs defaultValue="one">
  <Tabs.List>
    <Tabs.Trigger value="one">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="two">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="one">Content 1</Tabs.Content>
  <Tabs.Content value="two">Content 2</Tabs.Content>
</Tabs>
```

### Example & Usage
```tsx
import { Tabs } from "@kobalte/core/tabs";
import { createSignal } from "solid-js";

export function SettingsTabs() {
  const [tab, setTab] = createSignal("profile");

  return (
    <Tabs value={tab()} onChange={setTab} orientation="horizontal">
      <Tabs.List aria-label="Settings">
        <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
        <Tabs.Trigger value="notifications">Notifications</Tabs.Trigger>
        <Tabs.Trigger value="security">Security</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Content value="profile">Profile settings...</Tabs.Content>
      <Tabs.Content value="notifications">Notification prefs...</Tabs.Content>
      <Tabs.Content value="security">Security keys...</Tabs.Content>
    </Tabs>
  );
}
```

### API Reference
- `Tabs`: `value?: string`, `defaultValue?: string`, `onChange?: (val: string) => void`, `orientation?: "horizontal" | "vertical"`, `activationMode?: "automatic" | "manual"`.
- `Tabs.Trigger`: `value: string`, `disabled?: boolean`.
- `Tabs.Content`: `value: string`, `forceMount?: boolean`.

### Rendered Elements
- `Tabs` $\rightarrow$ `<div>`
- `Tabs.List` $\rightarrow$ `<div>` (role `tablist`)
- `Tabs.Trigger` $\rightarrow$ `<button>` (role `tab`)
- `Tabs.Content` $\rightarrow$ `<div>` (role `tabpanel`)
- `Tabs.Indicator` $\rightarrow$ `<div>`

### Accessibility (A11y)
- Standard WAI-ARIA Tabs pattern.
- Arrow keys switch active tab. `Home` jumps to first tab; `End` jumps to last tab.
- Linked via `aria-controls` (tab $\leftrightarrow$ panel) and `aria-labelledby`.

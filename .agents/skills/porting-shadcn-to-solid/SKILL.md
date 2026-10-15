---
name: porting-shadcn-to-solid
description: "Comprehensive step-by-step guide for porting official shadcn/ui (React) components to shadcn-solid (SolidJS) with 1:1 feature, styling, accessibility, and slot parity using Kobalte, Corvu, solid-recharts, @kobalte/core/color-mode, and cva@beta with the cn package."
---

# Porting shadcn/ui (React) to shadcn-solid (SolidJS)

This skill provides an authoritative, battle-tested standard operating procedure for porting components from the official `shadcn/ui` (React/Radix) ecosystem to `shadcn-solid` (SolidJS, Kobalte, Corvu, `solid-recharts`, `@kobalte/core/color-mode`).

---

## 1. Core Invariants & Mental Model Differences

When translating React component code to SolidJS, internalize these non-negotiable rules:

| Concept | React / Radix (`shadcn/ui`) | SolidJS / Kobalte / Corvu (`shadcn-solid`) |
| :--- | :--- | :--- |
| **Execution Model** | Reruns entire component function on every state change | Runs component function **exactly once** during setup |
| **Props Handling** | Destructuring in arguments `({ className, variant, ...props })` is standard | **NEVER destructure props directly**. Props are dynamic reactive getter proxies; destructuring destroys reactivity. Use `splitProps` and `mergeProps`. |
| **Class Merging** | Migrated from `clsx` + `tailwind-merge` to `cn` package | Unified class merging and collision resolution via `cn` package |
| **Variant Management** | Uses `class-variance-authority` | Uses `cva@beta` integrated with `cn` via `defineConfig({ cx: merge })` |
| **Dark Mode / Themes** | `next-themes` (`ThemeProvider`, `useTheme`) | `@kobalte/core/color-mode` (`ColorModeProvider`, `ColorModeScript`, `useColorMode()`) |
| **Charts** | Uses `recharts` | Uses `solid-recharts` (`^1.0.1`) (fine-grained SolidJS SVG charts) |
| **Architecture Reference** | Radix UI registry (`bases/radix`) is canonical | Strictly mirrors Radix UI structure 1:1 using Kobalte/Corvu |
| **Polymorphism** | `asChild` prop with Radix Slot primitive | Native Solid polymorphic `as` prop parameterized by `ValidComponent` |
| **Ref Forwarding** | `React.forwardRef<HTMLElement, Props>((props, ref) => ...)` | No `forwardRef`. `ref` is a standard prop passed in `props.ref` or spread via `{...rest}` |
| **Display Name** | `Component.displayName = "Component"` | Not used in SolidJS. Do not declare `displayName` |
| **Control Flow** | Ternaries `{isOpen ? <A /> : <B />}`, `.map()` | Built-in primitives: `<Show>`, `<For>`, `<Switch>`, `<Match>` |
| **State Primitives** | `useState`, `useRef`, `useMemo`, `useCallback` | `createSignal`, DOM refs (`let el`), `createMemo`, plain functions |
| **DOM Events** | Synthetic event pool (`onChange` fires on input) | Case-sensitive delegated native events (`onInput` fires on keystroke, `onChange` fires on blur/commit) |
| **Data Attributes** | `data-[state=open]`, `data-[state=checked]`, `data-[state=active]` | Kobalte: `data-[expanded]`, `data-[closed]`, `data-[checked]`, `data-[selected]` |
| **Transform Origins** | `--radix-*-content-transform-origin` | `--kb-menu-content-transform-origin`, `--kb-popover-content-transform-origin` |
| **Slots** | `data-slot="..."` on every subcomponent | Preserve **all** `data-slot="..."` attributes identically for 1:1 CSS styling |

---

## 2. Standardized Styling & Variant Setup (`cn` & `cva@beta`)

### 2.1 Workspace Utility Configuration
In `shadcn-solid`, class merging and variant management are unified in `@/lib/utils` using the `cn` package and `cva@beta`:

```tsx
// src/lib/utils.ts
import { cn as merge } from "cn"
import { defineConfig } from "cva/config"

export const { cva, cx: cn } = defineConfig({ cx: merge })
```

**Key Principles:**
1. **No direct `clsx` or `tailwind-merge`:** `shadcn-solid` relies exclusively on the `cn` package for Tailwind class conflict resolution and conditional merging.
2. **Import paths:** Always import `cva` and `cn` from `@/lib/utils`. Import `type VariantProps` from `"cva"`.
3. **Automatic merging:** Calling `buttonVariants({ variant: props.variant, class: props.class })` automatically passes class strings through `cx: merge` (`cn`), resolving Tailwind conflicts seamlessly.

### 2.2 Converting `class-variance-authority` to `cva@beta`
When porting variant definitions from `shadcn/ui`, adapt the format to `cva@beta`:

```tsx
// ❌ Legacy React shadcn/ui (class-variance-authority)
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: { default: "...", destructive: "..." },
      size: { default: "...", sm: "..." },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

// ✅ Standard shadcn-solid (cva@beta + cn)
import type { VariantProps } from "cva"
import { cn, cva } from "@/lib/utils"

export const buttonVariants = cva({
  base: [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  ],
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
      destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90",
      outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
    },
    size: {
      default: "h-9 px-4 py-2 has-[>svg]:px-3",
      sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})
```

---

## 3. Dark Mode / Color Mode Architecture (`@kobalte/core/color-mode` & Tailwind CSS v4)

`shadcn/ui` (React) relies on `next-themes` (`ThemeProvider`, `useTheme`) or custom inline scripts for theme management. In `shadcn-solid`, we replace `next-themes` completely with `@kobalte/core/color-mode`.

### 3.1 Root Application Setup (`src/app.tsx`)
Wrap the SolidStart `<Router>` root with `<ColorModeScript />` (for SSR hydration and FOUC prevention) and `<ColorModeProvider>`:

```tsx
// apps/www/src/app.tsx
import { Suspense } from "solid-js"
import { MetaProvider } from "@solidjs/meta"
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { ColorModeProvider, ColorModeScript } from "@kobalte/core/color-mode"

import "./globals.css"

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <ColorModeScript />
          <ColorModeProvider>
            <MetaProvider>
              <Suspense>{props.children}</Suspense>
            </MetaProvider>
          </ColorModeProvider>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
```

### 3.2 FOUC Prevention Mechanics
- `<ColorModeScript />` injects an inline script that executes synchronously before document rendering.
- It inspects storage (`localStorage` by default under the key `kb-color-mode`, or cookies if configured) or the user's `prefers-color-scheme`.
- It immediately assigns `document.documentElement.dataset.kbTheme = "dark" | "light"` and sets `style.colorScheme`, eliminating any Flash of Unstyled Content (FOUC).

### 3.3 Hook Migration (`useTheme` $\rightarrow$ `useColorMode`)
Replace all `next-themes` imports with `@kobalte/core/color-mode`:

```tsx
// ❌ React (next-themes)
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Toggle</button>
}

// ✅ SolidJS (@kobalte/core/color-mode)
import { useColorMode } from "@kobalte/core/color-mode"

export function ThemeToggle() {
  const { colorMode, setColorMode, toggleColorMode } = useColorMode()
  // colorMode() is a reactive Accessor returning "light" | "dark"
  // setColorMode("light" | "dark" | "system")
  // toggleColorMode() switches between light and dark
  return <button onClick={toggleColorMode}>Toggle</button>
}
```

### 3.4 Tailwind CSS v4 Theme Configuration (`src/globals.css`)
Because `@kobalte/core/color-mode` writes to `document.documentElement.dataset.kbTheme`, configure Tailwind CSS v4 using `@custom-variant`:

```css
/* apps/www/src/globals.css */
@import "tailwindcss";

/* Define dark variant targeting Kobalte's data attribute */
@custom-variant dark (&:is([data-kb-theme="dark"] *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* ... */
}

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* Light theme variables */
}

[data-kb-theme="dark"] {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* Dark theme variables */
}
```

---

## 4. Strict 1:1 Structural & Naming Parity

The paramount objective of `shadcn-solid` is to mirror `shadcn/ui` 1:1—file structure, component names, and exports must remain identical unless framework constraints make it impossible.

### 4.1 Strict Mirroring Rules
1. **1:1 File Names:** Port `dialog.tsx` to `dialog.tsx`, `use-mobile.ts` to `use-mobile.ts`, etc. Do not rename files.
2. **1:1 Directory Hierarchy:** Maintain subfolders like `ui/`, `hooks/`, `lib/`, `blocks/`, `examples/` identically. Do not restructure folders.
3. **1:1 Module Exports:** Named exports must match 1:1. Never collapse, combine, or rename exports. Export named components (`export const DialogHeader = ...`); never switch to a default export that collapses subcomponents.
4. **1:1 Internal Code Organization:** Preserve the order of variant definitions (`buttonVariants`), component declarations, and final exports.

### 4.2 Framework Exceptions (Next.js App Router $\rightarrow$ SolidStart Router)
Deviations are *only* permitted for framework application structure (routing). SolidStart is Vite-based and places source code in `src/`.

**Routing Conventions Mapping Table:**
| Target Category | `shadcn/ui` Source Path (Next.js-style) | `shadcn-solid` Target Path (SolidStart `src/`) | Notes |
| :--- | :--- | :--- | :--- |
| **Root Layout** | `app/layout.tsx` | `apps/www/src/app.tsx` | Root component with `<Router>`, `<ColorModeScript>`, `<ColorModeProvider>`. |
| **Wildcard Fallback** | `app/not-found.tsx` | `apps/www/src/routes/[...404].tsx` | Wildcard route handler. |
| **Page Component** | `app/<path>/page.tsx` | `apps/www/src/routes/<path>/index.tsx` | Next.js Page -> SolidStart Index. |
| **Dynamic Item Page**| `app/<path>/[id]/page.tsx` | `apps/www/src/routes/<path>/[id].tsx` | Next.js `[id]/page.tsx` -> SolidStart `[id].tsx`. |
| **Catch-all Docs** | `app/(app)/docs/[[...slug]]/page.tsx` | `apps/www/src/routes/docs/[...slug].tsx` | Next.js `[[...slug]]` -> SolidStart `[...slug].tsx`. |
| **Pathless Group** | `app/(app)/...` | `apps/www/src/routes/(app)/...` | Route groups map directly to files, e.g., `src/routes/(app).tsx` serving as nested layout. |
| **MDX Content** | `content/docs/` (MDX files) | `apps/www/src/content/docs/` | Content collections (MDX) are preserved and rendered via route handlers. |
| **API Endpoint** | `app/api/<path>/route.ts` | `apps/www/src/routes/api/<path>.ts` | API routes map to files exporting standard request handlers. |

### 4.3 Target Path & Structure Mapping (Deterministic Destination Lookup)
Verify the final destination for every ported file using this table before implementation:

| Category | shadcn/ui Source Path (`/home/hngngn/my-space/ui`) | shadcn-solid Target Path (`apps/www/src/`) | Decision Rule |
| :--- | :--- | :--- | :--- |
| **UI Components (Registry)** | `apps/v4/registry/bases/radix/ui/<name>.tsx` | `src/registry/ui/<name>.tsx` | Preserve 1:1 filename. Map to Kobalte/Corvu. |
| **Charts (Registry)** | `apps/v4/registry/new-york-v4/charts/<chart>.tsx`| `src/registry/charts/<chart>.tsx`| Match Next.js subfolder name (`charts`). Port to `solid-recharts`. |
| **Site Components** | `apps/v4/components/<name>.tsx` | `src/components/<name>.tsx` | Preserve 1:1 filename. |
| **App-wide Lib** | `apps/v4/lib/<name>.ts` | `src/lib/<name>.ts` | Preserve 1:1 filename. |
| **App-wide Hooks** | `apps/v4/hooks/<name>.ts` | `src/hooks/<name>.ts` | Preserve 1:1 filename. |
| **Registry Lib / Config** | `apps/v4/registry/bases/radix/lib/utils.ts` | `src/lib/utils.ts` | Unified utility file in `src/lib/`. |
| **Global Styles** | `apps/v4/app/globals.css` | `src/globals.css` | Standard application entry stylesheet. |
| **Docs MDX Content** | `apps/v4/content/docs/<name>.mdx` | `src/content/docs/<name>.mdx` | Markdown collections are mirrored in `src/content/`. |
| **Wildcard Fallback** | `apps/v4/app/not-found.tsx` | `src/routes/[...404].tsx` | Wildcard route handler. |

---

## 5. Primitive Architecture Evaluation: `radix-ui` vs `base-ui`

The official `shadcn/ui` codebase maintains multiple component base registries (notably Radix UI at `apps/v4/registry/bases/radix/` and Base UI at `apps/v4/registry/bases/base/`).

### 5.1 Architectural Comparison

| Dimension | `radix-ui` | `base-ui` | Alignment with `kobalte` & `corvu` |
| :--- | :--- | :--- | :--- |
| **Composition & Subcomponents** | Direct compound structure:<br/>`Popover.Root`<br/>`Popover.Trigger`<br/>`Popover.Portal`<br/>`Popover.Content` | Split positioner structure:<br/>`Popover.Root`<br/>`Popover.Trigger`<br/>`Popover.Portal`<br/>`Popover.Positioner`<br/>`Popover.Popup`<br/>(also `Tabs.Tab` / `Tabs.Panel`) | **Radix matches 1:1:** Kobalte and Corvu integrate floating positioning directly into `Content` and maintain standard naming (`Trigger`, `Content`, `Overlay`). Base UI forces extra wrapper elements (`Positioner`, `Popup`) and renamed subcomponents. |
| **Polymorphism Mechanism** | `asChild` prop backed by Radix Slot mechanism | `render` prop (`render={<Button />}` or functional callback) | **Radix matches naturally:** Kobalte and Corvu use the standard polymorphic `as` prop (`<T extends ValidComponent = "...">`). Radix's child element composition maps cleanly to Solid's `as` prop, whereas Base UI's `render` prop pattern introduces extra nested function calls and prop reconciliation that fight Solid's single-execution reactivity. |
| **State Styling Attributes** | `data-[state=open]`<br/>`data-[state=closed]`<br/>`data-[state=checked]`<br/>`data-[state=active]` | `data-open`, `data-closed`, `data-checked`, `data-popup-open`, `data-starting-style` | **Radix maps 1:1:** Radix uses state enum pairs that map predictably into Kobalte's boolean state flags (`data-[expanded]`, `data-[closed]`, `data-[checked]`, `data-[selected]`). Base UI mixes differing boolean names and CSS transition state hooks. |
| **Controlled / Uncontrolled State & Events** | `value` / `defaultValue` / `onValueChange`<br/>`open` / `defaultOpen` / `onOpenChange` | `value` / `defaultValue` / `onValueChange`<br/>`open` / `defaultOpen` / `onOpenChange((open, event) => ...)` | **Radix is identical:** Kobalte and Corvu implement the exact Radix prop contract and event signatures. |

### 5.2 Canonical Selection & Decision Rule
> **Decision:** **Radix UI (`apps/v4/registry/bases/radix/` or standard `shadcn/ui`) is selected as the primary, canonical reference for porting to `kobalte` and `corvu`.**

**Guideline for the Agent:**
1. When exploring components via `codegraph` or browsing the cloned `shadcn/ui` repository, always query or inspect the **Radix** implementation path (`apps/v4/registry/bases/radix/ui/<component>.tsx`).
2. Do not use Base UI's extra `<Positioner>` or `<Popup>` subcomponents. Kobalte's `Content` handles positioning directly.
3. If a component exists only in Base UI, simplify its DOM tree back to the canonical compound pattern (`Root` -> `Portal` -> `Content`).

---

## 6. Source Analysis & Structure Reading

Before writing any SolidJS code, inspect the React source component:

### Step 6.1: Locate and Read the Target Source
Query the indexed external `shadcn/ui` repo via `codegraph_explore`:
```ts
// Call codegraph_explore with the external repo project path
codegraph_explore({
  projectPath: "/home/hngngn/my-space/ui",
  query: "apps/v4/registry/bases/radix/ui/dialog.tsx Dialog DialogTrigger DialogContent"
})
```
Alternatively, read the React component file directly from `/home/hngngn/my-space/ui/apps/v4/registry/bases/radix/ui/<component>.tsx`.

### Step 6.2: Dissect the Anatomy
Deconstruct the React file into:
1. **Primitives & Dependencies:**
   - Radix primitives imported (e.g., `@radix-ui/react-dialog`, `@radix-ui/react-accordion`)
   - Specialized libraries (e.g., `vaul` -> `@corvu/drawer`, `react-day-picker` -> `@corvu/calendar`, `input-otp` -> `@corvu/otp-field`, `cmdk` -> `cmdk-solid`, `recharts` -> `solid-recharts`)
   - Theme management: Replace any `next-themes` with `@kobalte/core/color-mode`.
   - Utility packages: Note any `class-variance-authority` or `cn` usage and prepare to map to our `cva@beta` + `cn` utility.
2. **Subcomponents Exported:**
   - Identify every exported piece (e.g., `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`).
3. **Variants and Classes (`cva`):**
   - Check if the component defines a variant object (e.g., `buttonVariants`, `badgeVariants`).
   - Extract `base`, `variants`, and `defaultVariants` for conversion into `cva@beta`.
4. **Internal State & Hooks:**
   - Note any `useState`, `useId`, context creation/consumption, or effects.
5. **Animation & Transition Classes:**
   - Identify Tailwind classes targeting Radix state: `data-[state=open]`, `data-[state=closed]`, `data-[side=top]`, etc.

---

## 7. Comprehensive Headless Primitive Mapping Matrix

Map Radix UI and React ecosystem primitives to Kobalte and Corvu equivalents:

| React Source Primitive | SolidJS Ecosystem Target | Exact Subcomponents & Architecture Notes |
| :--- | :--- | :--- |
| `@radix-ui/react-accordion` | `@kobalte/core/accordion` | `Accordion.Item`, `Accordion.Header`, `Accordion.Trigger`, `Accordion.Content` |
| `@radix-ui/react-alert-dialog` | `@kobalte/core/alert-dialog` | `AlertDialog.Portal`, `AlertDialog.Overlay`, `AlertDialog.Content`, `AlertDialog.CloseButton`, `AlertDialog.Title`, `AlertDialog.Description` |
| `@radix-ui/react-avatar` | `@kobalte/core/image` | `Image.Root`, `Image.Img`, `Image.Fallback` |
| `@radix-ui/react-checkbox` | `@kobalte/core/checkbox` | `Checkbox.Input`, `Checkbox.Control`, `Checkbox.Indicator`, `Checkbox.Label` |
| `@radix-ui/react-collapsible` | `@kobalte/core/collapsible` | `Collapsible.Trigger`, `Collapsible.Content` |
| `@radix-ui/react-context-menu` | `@kobalte/core/context-menu` | `ContextMenu.Portal`, `ContextMenu.Content`, `ContextMenu.Item`, `ContextMenu.CheckboxItem`, `ContextMenu.RadioItem` |
| `@radix-ui/react-dialog` | `@kobalte/core/dialog` | `Dialog.Portal`, `Dialog.Overlay`, `Dialog.Content`, `Dialog.CloseButton`, `Dialog.Title`, `Dialog.Description` |
| `sheet.tsx` (`@radix-ui/react-dialog`) | `@kobalte/core/dialog` | **Maps to `@kobalte/core/dialog`** with side variants (`side="top" \| "right" \| "bottom" \| "left"`), `data-side={side}`, and slide-in animations |
| `@radix-ui/react-dropdown-menu` | `@kobalte/core/dropdown-menu` | `DropdownMenu.Portal`, `DropdownMenu.Content`, `DropdownMenu.Item`, `DropdownMenu.CheckboxItem`, `DropdownMenu.RadioGroup`, `DropdownMenu.RadioItem`, `DropdownMenu.Sub` |
| `@radix-ui/react-hover-card` | `@kobalte/core/hover-card` | `HoverCard.Portal`, `HoverCard.Content` |
| `@radix-ui/react-menubar` | `@kobalte/core/menubar` | `Menubar.Menu`, `Menubar.Trigger`, `Menubar.Portal`, `Menubar.Content`, `Menubar.Item` |
| `@radix-ui/react-navigation-menu` | `@kobalte/core/navigation-menu` | `NavigationMenu.Menu`, `NavigationMenu.Trigger`, `NavigationMenu.Portal`, `NavigationMenu.Content`, `NavigationMenu.Viewport` |
| `@radix-ui/react-popover` | `@kobalte/core/popover` | `Popover.Anchor`, `Popover.Portal`, `Popover.Content`, `Popover.CloseButton`, `Popover.Title`, `Popover.Description` |
| `@radix-ui/react-progress` | `@kobalte/core/progress` | `Progress.Track`, `Progress.Fill`, `Progress.ValueLabel` |
| `@radix-ui/react-radio-group` | `@kobalte/core/radio-group` | `RadioGroup.Item`, `RadioGroup.ItemInput`, `RadioGroup.ItemControl`, `RadioGroup.ItemIndicator`, `RadioGroup.ItemLabel` |
| `@radix-ui/react-select` | `@kobalte/core/select` | **Special Nuance:** In Kobalte, `<Select.Content>` **must contain** `<Select.Listbox>`. Items use `<Select.ItemLabel>` instead of `ItemText`. The dropdown chevron is rendered via `<Select.Icon>`. Generic signature `<Option, OptGroup = never>` |
| `@radix-ui/react-separator` | `@kobalte/core/separator` | `Separator.Root` |
| `@radix-ui/react-slider` | `@kobalte/core/slider` | `Slider.Track`, `Slider.Fill`, `Slider.Thumb`, `Slider.Label`, `Slider.ValueLabel` |
| `@radix-ui/react-switch` | `@kobalte/core/switch` | `Switch.Input`, `Switch.Control`, `Switch.Thumb`, `Switch.Label` |
| `@radix-ui/react-tabs` | `@kobalte/core/tabs` | `Tabs.List`, `Tabs.Trigger`, `Tabs.Content`, `Tabs.Indicator` |
| `@radix-ui/react-toggle` | `@kobalte/core/toggle-button` | `ToggleButton.Root` |
| `@radix-ui/react-toggle-group` | `@kobalte/core/toggle-group` | `ToggleGroup.Root`, `ToggleGroup.Item` |
| `@radix-ui/react-tooltip` | `@kobalte/core/tooltip` | `Tooltip.Portal`, `Tooltip.Content` |
| `combobox.tsx` (`@base-ui/react` / Radix) | `@kobalte/core/combobox` | **First-class in Kobalte:** `Combobox.Root`, `Combobox.Trigger`, `Combobox.Control`, `Combobox.Input`, `Combobox.Portal`, `Combobox.Content`, `Combobox.Listbox`, `Combobox.Item`, `Combobox.ItemLabel`, `Combobox.ItemIndicator` |
| `react-day-picker` (Calendar) | `@corvu/calendar` | **Maps to `@corvu/calendar`:** `CalendarPrimitive`, `CalendarNav`, `CalendarLabel`, `CalendarTable`, `CalendarHeadCell`, `CalendarCell`, `CalendarCellTrigger` |
| `vaul` (Drawer) | `@corvu/drawer` | Corvu provides full touch gesture physics, snap points, dynamic velocity, `@corvu/presence` exit coordination |
| `react-resizable-panels` | `@corvu/resizable` | Corvu resizable panels (`Resizable`, `ResizablePanel`, `ResizableHandle`) with keyboard accessibility |
| `input-otp` | `@corvu/otp-field` | Corvu OTP field (`OtpField`, `OtpFieldInput`, `OtpFieldSlot`) with individual slot access |
| `cmdk` | `cmdk-solid` | Direct SolidJS port of cmdk with matching API (`Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`) |
| `embla-carousel-react` | `embla-carousel-solid` | Reactive options and plugins via `createEmblaCarousel` |
| `sonner` | `solid-sonner` | Toast notification manager (`Toaster`, `toast`) |
| `recharts` | `solid-recharts` | SVG charts (`ResponsiveContainer`, `Tooltip`, `Legend`, `AreaChart`, `BarChart`, etc.) |
| `next-themes` | `@kobalte/core/color-mode` | `<ColorModeProvider>`, `<ColorModeScript>`, `useColorMode()` |
| `sidebar.tsx` | Composite | Composite architecture combining `use-mobile` hook, `@kobalte/core/tooltip`, `@kobalte/core/dialog` (mobile sheet), `button`, and reactive context |

---

## 8. Chart Library Mapping (`recharts` $\rightarrow$ `solid-recharts`)

`shadcn/ui` implements charting via `recharts`. In `shadcn-solid`, we map this 1:1 to `solid-recharts` (`^1.0.1`), preserving all SVG theming, CSS variables, and layout structures.

### 8.1 Component & Primitive Equivalents
| React `recharts` | SolidJS `solid-recharts` | Notes |
| :--- | :--- | :--- |
| `ResponsiveContainer` | `ResponsiveContainer` | Wraps charts; handles dynamic width/height |
| `Tooltip` | `Tooltip` | Accepts JSX element or callback: `content={(props) => <ChartTooltipContent {...props} />}` |
| `Legend` | `Legend` | Accepts JSX element or callback: `content={(props) => <ChartLegendContent {...props} />}` |
| Chart Primitives (`AreaChart`, `BarChart`, `LineChart`, `PieChart`, etc.) | Identical names in `solid-recharts` | Direct 1:1 drop-in replacement |
| Axes & Grids (`CartesianGrid`, `XAxis`, `YAxis`, `PolarGrid`, etc.) | Identical names in `solid-recharts` | Direct 1:1 drop-in replacement |

### 8.2 Key Porting Patterns for Charts
1. **Dynamic CSS Variables via `ChartStyle`:**
   - In `ChartStyle`, compute CSS variable rules (`--color-<key>: <val>`) from `props.config`.
   - Render a `<style>` element targeting `[data-chart="${chartId}"]`.
2. **Fine-Grained Context (`ChartContext`):**
   - Provide a getter in the context value: `value={{ config: () => props.config }}`.
   - Consumers call `const { config } = useChart()` and access `config()[key]` to preserve reactivity when configs change.
3. **Custom Tooltip Content (`ChartTooltipContent`):**
   - `solid-recharts` passes `TooltipContentProps` (`label`, `payload`, `active`, `coordinate`, etc.) into custom tooltip content.
   - Use `<Show when={props.active && props.payload?.length}>` for conditional visibility.
   - Replace React `payload.map(...)` with SolidJS `<For each={props.payload}>{(item) => ...}</For>`.
4. **SVG Class Selectors:**
   - Tailwind selectors targeting chart elements (e.g. `[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground`, `[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50`) work identically because `solid-recharts` generates matching SVG class names.

---

## 9. API, Ref, & State Translation Guide

### 9.1 React State & Hooks to SolidJS Equivalents

#### `useState` -> `createSignal`
```tsx
// React
const [open, setOpen] = useState(false)
const toggle = () => setOpen(!open)

// SolidJS
const [open, setOpen] = createSignal(false)
const toggle = () => setOpen((prev) => !prev)
```

#### Ref Forwarding & DOM Element Access (No `React.forwardRef`)
```tsx
// ❌ React: Uses forwardRef and displayName
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <button ref={ref} {...props} />
})
Button.displayName = "Button"

// ✅ SolidJS: ref is just a prop. No forwardRef wrapper, no displayName!
export const Button = <T extends ValidComponent = "button">(props: ButtonProps<T>) => {
  const [, rest] = splitProps(props as ButtonProps, ["class", "variant", "size"])
  // props.ref is automatically forwarded via spreading {...rest}
  return <ButtonPrimitive data-slot="button" {...rest} />
}
```

#### Dual Ref Access (Local element access + forwarded ref)
If a component needs internal access to the DOM node while also honoring a passed `ref`:
```tsx
export const Input = (props: ComponentProps<"input">) => {
  let inputRef: HTMLInputElement | undefined
  const [, rest] = splitProps(props, ["class", "ref"])

  return (
    <input
      ref={(el) => {
        inputRef = el
        if (typeof props.ref === "function") props.ref(el)
        else if (props.ref) (props as { ref: HTMLInputElement }).ref = el
      }}
      {...rest}
    />
  )
}
```

#### `useMemo` -> `createMemo`
```tsx
// React
const fullName = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName])

// SolidJS
const fullName = createMemo(() => `${firstName()} ${lastName()}`)
```

#### `useCallback` -> Plain Functions
```tsx
// React: Needed to prevent child re-renders
const handleClick = useCallback(() => doSomething(id), [id])

// SolidJS: Functions are declared once; no recreation on re-render!
const handleClick = () => doSomething(id())
```

#### `useId` -> `createUniqueId`
```tsx
// React
const id = useId()

// SolidJS
import { createUniqueId } from "solid-js"
const id = createUniqueId()
```

### 9.2 Events & Input Handlers
- **Case Sensitivity:** Solid uses camelCase (`onClick`, `onKeyDown`, `onPointerDown`).
- **Input Events:**
  - In React, `onChange` triggers on every character keystroke.
  - In standard DOM / SolidJS, `onInput` fires on every keystroke, while `onChange` fires only when the field is committed (e.g. on blur or Enter).
  - When porting form controls / text fields, replace React `onChange` with `onInput` or Kobalte's `onChange`.

### 9.3 Context & Providers
```tsx
// React
const SidebarContext = createContext<{ state: string } | null>(null)
export const SidebarProvider = ({ children, defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen)
  return <SidebarContext.Provider value={{ state: open ? "expanded" : "collapsed" }}>{children}</SidebarContext.Provider>
}

// SolidJS
import { createContext, useContext, type ParentComponent } from "solid-js"

interface SidebarContextValue {
  state: () => "expanded" | "collapsed"
}
const SidebarContext = createContext<SidebarContextValue>()

export const SidebarProvider: ParentComponent<{ defaultOpen?: boolean }> = (props) => {
  const [open, setOpen] = createSignal(props.defaultOpen ?? true)
  return (
    <SidebarContext.Provider value={{ state: () => (open() ? "expanded" : "collapsed") }}>
      {props.children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider")
  return context
}
```

---

## 10. Porting Checklist & Best Practices

### Rule 1: Never Destructure Props Directly
Destructuring drops the Proxy tracking wrapper. Always separate classes, variants, and custom props using `splitProps`.

```tsx
// ❌ BAD: Reactivity permanently broken!
export const Badge = ({ class: className, variant, ...props }) => {
  return <div class={badgeVariants({ variant, class: className })} {...props} />
}

// ✅ GOOD: Fully reactive
export const Badge = (props: BadgeProps) => {
  const [, rest] = splitProps(props, ["class", "variant"])
  return (
    <div
      data-slot="badge"
      class={badgeVariants({ variant: props.variant, class: props.class })}
      {...rest}
    />
  )
}
```

### Rule 2: Polymorphic Component Typing with `ValidComponent`
Kobalte primitives support polymorphism via the generic type `<T extends ValidComponent = "...">`:

```tsx
import type { ComponentProps, ValidComponent } from "solid-js"
import { Root as ButtonPrimitive } from "@kobalte/core/button"
import type { VariantProps } from "cva"

import { cn, cva } from "@/lib/utils"

export type ButtonProps<T extends ValidComponent = "button"> = ComponentProps<
  typeof ButtonPrimitive<T>
> & VariantProps<typeof buttonVariants>

export const Button = <T extends ValidComponent = "button">(
  props: ButtonProps<T>,
) => {
  const [, rest] = splitProps(props as ButtonProps, ["class", "variant", "size"])
  return (
    <ButtonPrimitive
      data-slot="button"
      class={buttonVariants({ variant: props.variant, size: props.size, class: props.class })}
      {...rest}
    />
  )
}
```

### Rule 3: Use `<Show>` and `<For>` Instead of React Operators
```tsx
// ❌ BAD (React style)
{props.showClose && <DialogPrimitive.CloseButton />}
{props.items.map(item => <Item {...item} />)}

// ✅ GOOD (SolidJS style)
<Show when={props.showClose}>
  <DialogPrimitive.CloseButton />
</Show>

<For each={props.items}>
  {(item) => <Item {...item} />}
</For>
```

### Rule 4: Data Attribute Translation (Tailwind CSS)
Radix uses explicit state names in data attributes; Kobalte uses boolean flags. Translate all classes according to this table:

| Radix / React Attribute | Kobalte / Solid Equivalent |
| :--- | :--- |
| `data-[state=open]:...` | `data-[expanded]:...` |
| `data-[state=closed]:...` | `data-[closed]:...` |
| `data-[state=checked]:...` | `data-[checked]:...` |
| `data-[state=unchecked]:...` | `data-[unchecked]:...` |
| `data-[state=active]:...` | `data-[selected]:...` |
| `data-[state=inactive]:...` | `data-[not-selected]:...` |
| `data-[highlighted]:...` | `data-[highlighted]:...` (identical) |
| `data-[disabled]:...` | `data-[disabled]:...` (identical) |
| `data-[side=top]:...` | `data-[placement=top]:...` (for popups/tooltips) |
| `[&[data-state=open]>svg]:rotate-180` | `[&[data-expanded]>svg]:rotate-180` |
| `origin-[var(--radix-dropdown-menu-content-transform-origin)]` | `origin-(--kb-menu-content-transform-origin)` |
| `origin-[var(--radix-popover-content-transform-origin)]` | `origin-(--kb-popover-content-transform-origin)` |
| `origin-[var(--radix-hover-card-content-transform-origin)]` | `origin-(--kb-hovercard-content-transform-origin)` |

### Rule 5: Preserve `data-slot` and Custom Attributes
Official `shadcn/ui` components tag every DOM node with `data-slot="<name>"` (e.g. `data-slot="dialog-content"`, `data-slot="card-header"`). Pass through all custom attributes such as `data-inset={props.inset}`, `data-variant={props.variant}`, and `data-size={props.size}`.

### Rule 6: Zero-Dependency Inline SVG Icons
`shadcn/ui` imports icons from `lucide-react`. In `shadcn-solid`, keep components self-contained by embedding clean inline SVGs (`viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `stroke-width="2"`, `stroke-linecap="round"`, `stroke-linejoin="round"`):
- **Close (X):** `<path d="M18 6L6 18M6 6l12 12" />`
- **Chevron Down:** `<path d="m6 9 6 6 6-6" />`
- **Chevron Right:** `<path d="m9 18 6-6-6-6" />`
- **Check:** `<path d="M20 6 9 17l-5-5" />`
- **Circle (Radio):** `<circle cx="12" cy="12" r="10" />`

---

## 11. Step-by-Step Porting Workflow

```
[1. Source Discovery] ──> [2. Dissect Anatomy] ──> [3. Type Contract]
  (Choose Radix base)                                     │
                                                         ▼
[6. Verify & Build]   <── [5. CSS/Data-Slot]   <── [4. Implementation]
```

### Step 1: Discover Source Component
1. Locate the component in the official repository under the mandatory **Radix** registry (`apps/v4/registry/bases/radix/ui/<component>.tsx`) or query via `codegraph_explore` using the full path. Reference the Path & Structure Mapping Table in Section 4 to establish a deterministic target destination.

### Step 2: Dissect Anatomy
1. Note the Radix primitive used.
2. Check the matrix in Section 7 to select the corresponding Kobalte (`@kobalte/core/*`), Corvu (`@corvu/*`), or `solid-recharts` primitive.
3. List all subcomponents (e.g. `Root`, `Trigger`, `Content`, `Overlay`). Preserve internal component structure 1:1.
4. Extract variants from `class-variance-authority` and convert them into `cva@beta` format.

### Step 3: Define Component Types
1. Import `ComponentProps` and `ValidComponent` from `"solid-js"`.
2. Declare generic types with strict 1:1 naming compatibility:
   ```ts
   export type ComponentTriggerProps<T extends ValidComponent = "button"> =
     ComponentProps<typeof Primitive.Trigger<T>>
   ```
3. Add any framework-specific or custom props (e.g. `inset?: boolean`, `showCloseButton?: boolean`).

### Step 4: Implement SolidJS Components
1. Re-export simple wrappers or portals:
   ```ts
   export const DialogPortal = DialogPrimitive.Portal
   ```
2. Implement styled components using `splitProps` or `mergeProps` as necessary. Preserve named component definitions identically (e.g., `<DialogHeader />`, `<DialogFooter />`).
3. Export all named components matching the React source 1:1:
   ```tsx
   export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose }
   ```

### Step 5: Adapt Tailwind & Data Attributes
1. Replace state enums 1:1 using the table in Section 10 :: Rule 4.
2. Replace Radix transform origin variables with `--kb-*-transform-origin`.
3. Ensure animation durations, keyframes, and transitions match the source.

### Step 6: Post-Porting Verification Protocol
Run the 4-phase automated verification command pipeline before finalizing:
```bash
# Phase 1: Linting and formatting auto-fix
pnpm check

# Phase 2: Strict type check across all workspaces
pnpm check-types

# Phase 3: Production client, SSR, and Nitro server build
pnpm build

# Phase 4: Git working tree inspection to confirm 1:1 filename and clean status
git status
```

---

## 12. Production Code Templates

### Template A: Pure Styling Component (`Card`)
```tsx
import type { ComponentProps, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"

import { cn } from "@/lib/utils"

export type CardProps<T extends ValidComponent = "div"> = ComponentProps<T>

export const Card = <T extends ValidComponent = "div">(props: CardProps<T>) => {
  const [, rest] = splitProps(props as CardProps, ["class"])
  return (
    <div
      data-slot="card"
      class={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        props.class,
      )}
      {...rest}
    />
  )
}

export const CardHeader = <T extends ValidComponent = "div">(props: ComponentProps<T>) => {
  const [, rest] = splitProps(props as ComponentProps<"div">, ["class"])
  return (
    <div
      data-slot="card-header"
      class={cn("flex flex-col gap-1.5 px-6", props.class)}
      {...rest}
    />
  )
}
```

### Template B: Polymorphic Component with CVA (`Button`)
```tsx
import type { ComponentProps, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"
import { Root as ButtonPrimitive } from "@kobalte/core/button"
import type { VariantProps } from "cva"

import { cn, cva } from "@/lib/utils"

export const buttonVariants = cva({
  base: [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  ],
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
      destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90",
      outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "h-9 px-4 py-2 has-[>svg]:px-3",
      sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
      lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
      icon: "size-9",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export type ButtonProps<T extends ValidComponent = "button"> = ComponentProps<
  typeof ButtonPrimitive<T>
> &
  VariantProps<typeof buttonVariants>

export const Button = <T extends ValidComponent = "button">(
  props: ButtonProps<T>,
) => {
  const [, rest] = splitProps(props as ButtonProps, ["class", "variant", "size"])
  return (
    <ButtonPrimitive
      data-slot="button"
      class={buttonVariants({ variant: props.variant, size: props.size, class: props.class })}
      {...rest}
    />
  )
}
```

### Template C: Compound Primitive Component (`Dialog`)
```tsx
import type { ComponentProps, ValidComponent } from "solid-js"
import { mergeProps, Show, splitProps } from "solid-js"
import { Dialog as DialogPrimitive } from "@kobalte/core/dialog"

import { cn } from "@/lib/utils"

export const Dialog = DialogPrimitive
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogPortal = DialogPrimitive.Portal
export const DialogClose = DialogPrimitive.CloseButton

export type DialogContentProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof DialogPrimitive.Content<T>> & {
    showCloseButton?: boolean
  }

export const DialogContent = <T extends ValidComponent = "div">(
  props: DialogContentProps<T>,
) => {
  const merged = mergeProps({ showCloseButton: true }, props)
  const [, rest] = splitProps(merged, ["class", "children", "showCloseButton"])

  return (
    <DialogPortal>
      <DialogPrimitive.Overlay
        data-slot="dialog-overlay"
        class="data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 fixed inset-0 z-50 bg-black/50"
      />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        class={cn(
          "bg-background data-[expanded]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[expanded]:fade-in-0 fixed left-1/2 top-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          props.class,
        )}
        {...rest}
      >
        {props.children}
        <Show when={merged.showCloseButton}>
          <DialogPrimitive.CloseButton
            data-slot="dialog-close"
            class="text-muted-foreground ring-offset-background focus:ring-ring absolute right-4 top-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-4">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12" />
            </svg>
            <span class="sr-only">Close</span>
          </DialogPrimitive.CloseButton>
        </Show>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}
```

### Template D: Gesture Component with Corvu (`Drawer`)
```tsx
import type { ComponentProps, ValidComponent } from "solid-js"
import { mergeProps, Show, splitProps } from "solid-js"
import DrawerPrimitive from "@corvu/drawer"

import { cn } from "@/lib/utils"

export const Drawer = DrawerPrimitive
export const DrawerTrigger = DrawerPrimitive.Trigger
export const DrawerPortal = DrawerPrimitive.Portal
export const DrawerClose = DrawerPrimitive.Close

export type DrawerContentProps<T extends ValidComponent = "div"> =
  ComponentProps<typeof DrawerPrimitive.Content<T>> & {
    withHandle?: boolean
  }

export const DrawerContent = <T extends ValidComponent = "div">(
  props: DrawerContentProps<T>,
) => {
  const context = DrawerPrimitive.useContext()
  const merged = mergeProps({ withHandle: context.side() === "bottom" }, props)
  const [, rest] = splitProps(merged, ["class", "children", "withHandle"])

  return (
    <DrawerPortal>
      <DrawerPrimitive.Overlay
        data-slot="drawer-overlay"
        class="fixed inset-0 z-50 bg-black/50 data-[transitioning]:transition-colors data-[transitioning]:duration-500"
      />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        class={cn(
          "bg-background fixed z-50 flex h-auto flex-col border",
          "data-[transitioning]:transition-transform data-[transitioning]:duration-500 md:select-none",
          props.class,
        )}
        {...rest}
      >
        <Show when={merged.withHandle}>
          <div data-slot="drawer-handle" class="bg-muted mx-auto my-4 h-1.5 w-12 rounded-full" />
        </Show>
        {props.children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}
```

### Template E: Chart Container & Tooltip with `solid-recharts` (`Chart`)
```tsx
import type { ComponentProps, JSX } from "solid-js"
import { createContext, createMemo, createUniqueId, For, Show, splitProps, useContext } from "solid-js"
import * as RechartsPrimitive from "solid-recharts"

import { cn } from "@/lib/utils"

const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = Record<
  string,
  {
    label?: JSX.Element
    icon?: (props: ComponentProps<"svg">) => JSX.Element
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>

interface ChartContextProps {
  config: () => ChartConfig
}

const ChartContext = createContext<ChartContextProps>()

export const useChart = () => {
  const context = useContext(ChartContext)
  if (!context) throw new Error("useChart must be used within a <ChartContainer />")
  return context
}

export type ChartContainerProps = ComponentProps<"div"> & {
  config: ChartConfig
  children: JSX.Element
}

export const ChartContainer = (props: ChartContainerProps) => {
  const uniqueId = createUniqueId()
  const chartId = () => `chart-${props.id ?? uniqueId.replace(/:/g, "")}`
  const [, rest] = splitProps(props, ["id", "class", "children", "config"])

  return (
    <ChartContext.Provider value={{ config: () => props.config }}>
      <div
        data-slot="chart"
        data-chart={chartId()}
        class={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border",
          props.class,
        )}
        {...rest}
      >
        <ChartStyle id={chartId()} config={props.config} />
        <RechartsPrimitive.ResponsiveContainer>
          {props.children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartStyle = (props: { id: string; config: ChartConfig }) => {
  const styleString = createMemo(() => {
    const colorConfig = Object.entries(props.config).filter(([, item]) => item.theme || item.color)
    if (!colorConfig.length) return ""

    return Object.entries(THEMES)
      .map(([theme, prefix]) => `
${prefix} [data-chart="${props.id}"] {
${colorConfig
  .map(([key, item]) => {
    const color = item.theme?.[theme as keyof typeof item.theme] ?? item.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .filter(Boolean)
  .join("\n")}
}
`)
      .join("\n")
  })

  return <style>{styleString()}</style>
}

export const ChartTooltip = RechartsPrimitive.Tooltip
export const ChartLegend = RechartsPrimitive.Legend
```

### Template F: Standard Mode Toggle Component (`ModeToggle`)
```tsx
import { useColorMode } from "@kobalte/core/color-mode"
import { Button } from "@/registry/ui/button"

export const ModeToggle = () => {
  const { toggleColorMode } = useColorMode()

  return (
    <Button onClick={toggleColorMode} size="icon" variant="ghost">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="hidden size-4 [html[data-kb-theme=dark]_&]:block"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M17.891 12a5.94 5.94 0 0 1-3.68 5.499a5.97 5.97 0 0 1-6.496-1.295A5.948 5.948 0 0 1 11.943 6.05a5.96 5.96 0 0 1 4.21 1.743A5.94 5.94 0 0 1 17.89 12M3.203 13.048H2.05A1.05 1.05 0 0 1 1 12a1.047 1.047 0 0 1 1.05-1.048h1.153A1.05 1.05 0 0 1 4.253 12a1.047 1.047 0 0 1-1.05 1.048m18.747 0h-1.143A1.05 1.05 0 0 1 19.758 12a1.047 1.047 0 0 1 1.05-1.048h1.143A1.05 1.05 0 0 1 23 12a1.047 1.047 0 0 1-1.05 1.048m-9.965-8.8a1.05 1.05 0 0 1-1.05-1.048V2.048A1.047 1.047 0 0 1 11.986 1a1.05 1.05 0 0 1 1.049 1.048V3.2a1.047 1.047 0 0 1-1.05 1.048m0 18.752a1.05 1.05 0 0 1-1.05-1.047V20.8a1.047 1.047 0 0 1 1.05-1.048a1.05 1.05 0 0 1 1.049 1.048v1.152A1.047 1.047 0 0 1 11.984 23M5.753 6.825a1.05 1.05 0 0 1-.745-.314l-.819-.807a1.051 1.051 0 0 1 .745-1.796c.28 0 .548.111.745.308l.819.817a1.047 1.047 0 0 1 0 1.478a1.05 1.05 0 0 1-.745.314m13.271 13.221a1.05 1.05 0 0 1-.735-.304l-.818-.817a1.047 1.047 0 0 1 1.14-1.739q.196.096.34.262l.818.817a1.047 1.047 0 0 1 0 1.477a1.05 1.05 0 0 1-.745.304m-.808-13.221a1.05 1.05 0 0 1-1.034-1.254c.04-.204.142-.391.29-.538l.818-.817a1.05 1.05 0 0 1 1.48 1.488l-.82.807a1.05 1.05 0 0 1-.734.314M4.934 20.046a1.05 1.05 0 0 1-.745-.304a1.046 1.046 0 0 1 0-1.477l.819-.817a1.05 1.05 0 0 1 1.49 0a1.047 1.047 0 0 1 0 1.477l-.819.817a1.05 1.05 0 0 1-.745.304"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="hidden size-4 [html[data-kb-theme=light]_&]:block"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M21.88 15.147a10.23 10.23 0 0 1-7.027 7.027A10.5 10.5 0 0 1 12 22.5A10.5 10.5 0 0 1 1.5 12c0-.986.138-1.956.408-2.88a10.23 10.23 0 0 1 7.027-7.027A10.46 10.46 0 0 1 12 1.5a10.5 10.5 0 0 1 9.88 13.647"
        />
      </svg>
      <span class="sr-only">Toggle theme</span>
    </Button>
  )
}
```

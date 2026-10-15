# Kobalte Components Encyclopedia: Feedback, Color Suite, Disclosure & Media

> Sources cited:
> - Kobalte Official Documentation: https://kobalte.dev/docs/core
> - WAI-ARIA Authoring Practices Guide (APG)

This catalog covers all 16 Feedback, Disclosure, Color Picker, and Media primitives in Kobalte.

---

## 1. Accordion

### Import
```tsx
import { Accordion } from "@kobalte/core/accordion";
```

### Features
- Vertically stacked interactive panels that expand/collapse.
- Supports single expansion (`multiple={false}`) or multi-panel expansion (`multiple={true}`).
- Keyboard roving focus across headers.

### Anatomy
- `Accordion`: Root provider.
- `Accordion.Item`: Individual collapsible panel wrapper.
- `Accordion.Header`: Heading element containing trigger (`<h3>` by default).
- `Accordion.Trigger`: Button toggling expansion.
- `Accordion.Content`: Expandable content view.

### Example & Usage
```tsx
import { Accordion } from "@kobalte/core/accordion";

export function FAQAccordion() {
  return (
    <Accordion multiple={false} collapsible>
      <Accordion.Item value="q1">
        <Accordion.Header>
          <Accordion.Trigger>What is SolidJS?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>A declarative, fine-grained reactive UI library.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="q2">
        <Accordion.Header>
          <Accordion.Trigger>What is Kobalte?</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>An unstyled UI component library for SolidJS.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}
```

### API Reference
- `Accordion`: `value?: string | string[]`, `onChange?: (val: any) => void`, `multiple?: boolean`, `collapsible?: boolean`.

### Rendered Elements
- `Accordion` $\rightarrow$ `<div>`
- `Accordion.Header` $\rightarrow$ `<h3>`
- `Accordion.Trigger` $\rightarrow$ `<button>`
- `Accordion.Content` $\rightarrow$ `<div>` (role `region`)

### Accessibility (A11y)
- Trigger receives `aria-expanded` and `aria-controls`. Content receives `role="region"` and `aria-labelledby`.

---

## 2. Collapsible

### Import
```tsx
import { Collapsible } from "@kobalte/core/collapsible";
```

### Features
- Single expand/collapse component for showing and hiding content.
- Uncontrolled and controlled open state.

### Anatomy
- `Collapsible`: Root provider.
- `Collapsible.Trigger`: Toggle button.
- `Collapsible.Content`: Animated body.

### Example & Usage
```tsx
import { Collapsible } from "@kobalte/core/collapsible";
import { createSignal } from "solid-js";

export function CollapsibleDetails() {
  const [open, setOpen] = createSignal(false);

  return (
    <Collapsible open={open()} onOpenChange={setOpen}>
      <Collapsible.Trigger>Toggle Details</Collapsible.Trigger>
      <Collapsible.Content>Detailed description text...</Collapsible.Content>
    </Collapsible>
  );
}
```

### API Reference
- `Collapsible`: `open?: boolean`, `defaultOpen?: boolean`, `onOpenChange?: (open: boolean) => void`.

### Rendered Elements
- `Collapsible.Trigger` $\rightarrow$ `<button>`
- `Collapsible.Content` $\rightarrow$ `<div>`

### Accessibility (A11y)
- `aria-expanded`, `aria-controls`.

---

## 3. Alert

### Import
```tsx
import { Alert } from "@kobalte/core/alert";
```

### Features
- Displays non-modal callout notices with automated screen reader interruption.
- Immediate announcement via `role="alert"`.

### Anatomy
- `Alert`: Root container.

### Example & Usage
```tsx
import { Alert } from "@kobalte/core/alert";

export function ErrorBanner() {
  return (
    <Alert class="alert-danger">
      <strong>Payment Failed:</strong> Please verify your credit card details.
    </Alert>
  );
}
```

### API Reference
- `Alert`: Standard HTML attributes, `as?: ValidComponent`.

### Rendered Elements
- `Alert` $\rightarrow$ `<div>` (role `alert`)

### Accessibility (A11y)
- Role `alert`, `aria-live="assertive"`. Announced immediately by assistive technologies.

---

## 4. Badge

### Import
```tsx
import { Badge } from "@kobalte/core/badge";
```

### Features
- Accessible status badge with automated ARIA status role.
- Auto-populated screen reader labeling via `textValue`.

### Anatomy
- `Badge`: Root container.

### Example & Usage
```tsx
import { Badge } from "@kobalte/core/badge";

export function StatusBadge() {
  return (
    <Badge textValue="Server Status: Active" class="badge-online">
      Active
    </Badge>
  );
}
```

### API Reference
- `Badge`: `textValue?: string`.

### Rendered Elements
- `Badge` $\rightarrow$ `<span>` (role `status`)

### Accessibility (A11y)
- Role `status` to communicate dynamic updates.

---

## 5. Meter

### Import
```tsx
import { Meter } from "@kobalte/core/meter";
```

### Features
- Graphical display of a numeric value within a known range (e.g. disk space usage, battery level).

### Anatomy
- `Meter`: Root provider.
- `Meter.Label`: Accessible label.
- `Meter.ValueLabel`: Formatted value display.
- `Meter.Track`: Track bar.
- `Meter.Fill`: Filled bar portion.

### Example & Usage
```tsx
import { Meter } from "@kobalte/core/meter";

export function StorageMeter() {
  return (
    <Meter value={75} minValue={0} maxValue={100}>
      <Meter.Label>Storage Used</Meter.Label>
      <Meter.ValueLabel />
      <Meter.Track>
        <Meter.Fill />
      </Meter.Track>
    </Meter>
  );
}
```

### API Reference
- `Meter`: `value: number`, `minValue?: number`, `maxValue?: number`.

### Rendered Elements
- `Meter` $\rightarrow$ `<div>` (role `meter`, `aria-valuenow`)

### Accessibility (A11y)
- Role `meter`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.

---

## 6. Progress

### Import
```tsx
import { Progress } from "@kobalte/core/progress";
```

### Features
- Progress bar communicating completion status of an in-progress task.
- Supports indeterminate state (loading spinners, pulsating bars).

### Anatomy
- `Progress`: Root provider.
- `Progress.Label`, `ValueLabel`, `Track`, `Fill`.

### Example & Usage
```tsx
import { Progress } from "@kobalte/core/progress";

export function UploadProgress(props: { percent: number }) {
  return (
    <Progress value={props.percent} minValue={0} maxValue={100}>
      <Progress.Label>Uploading...</Progress.Label>
      <Progress.ValueLabel />
      <Progress.Track>
        <Progress.Fill />
      </Progress.Track>
    </Progress>
  );
}
```

### API Reference
- `Progress`: `value?: number`, `minValue?: number`, `maxValue?: number`, `indeterminate?: boolean`.

### Rendered Elements
- `Progress` $\rightarrow$ `<div>` (role `progressbar`)

### Accessibility (A11y)
- Role `progressbar`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.

---

## 7. Skeleton

### Import
```tsx
import { Skeleton } from "@kobalte/core/skeleton";
```

### Features
- Placeholder element simulating content layout while data is loading.
- Automatically marks content as hidden from screen readers during loading.

### Anatomy
- `Skeleton`: Root container.

### Example & Usage
```tsx
import { Skeleton } from "@kobalte/core/skeleton";

export function ProfileSkeleton() {
  return (
    <div class="card">
      <Skeleton width={48} height={48} radius={9999} />
      <Skeleton height={16} width="80%" />
      <Skeleton height={12} width="50%" />
    </div>
  );
}
```

### API Reference
- `Skeleton`: `visible?: boolean`, `animate?: boolean`, `width?: number | string`, `height?: number | string`, `radius?: number | string`.

### Rendered Elements
- `Skeleton` $\rightarrow$ `<div>`

### Accessibility (A11y)
- Marked with `aria-hidden="true"` or `aria-busy="true"`.

---

## 8. Separator

### Import
```tsx
import { Separator } from "@kobalte/core/separator";
```

### Features
- Visual or semantic divider between sections of content.
- Horizontal or vertical orientation.

### Anatomy
- `Separator`: Divider element.

### Example & Usage
```tsx
import { Separator } from "@kobalte/core/separator";

export function SectionDivider() {
  return <Separator orientation="horizontal" />;
}
```

### API Reference
- `Separator`: `orientation?: "horizontal" | "vertical"`, `decorative?: boolean`.

### Rendered Elements
- `Separator` $\rightarrow$ `<hr>` (or `<div>` when decorative)

### Accessibility (A11y)
- If `decorative={false}`, renders `role="separator"`. If `decorative={true}`, renders `aria-hidden="true"`.

---

## 9. Image

### Import
```tsx
import { Image } from "@kobalte/core/image";
```

### Features
- Image container that handles fallback loading and error states (avatars, broken image placeholders).

### Anatomy
- `Image`: Root wrapper.
- `Image.Img`: Image element.
- `Image.Fallback`: Rendered while image is loading or if it fails to load.

### Example & Usage
```tsx
import { Image } from "@kobalte/core/image";

export function UserAvatar() {
  return (
    <Image class="avatar">
      <Image.Img src="https://example.com/photo.jpg" alt="User Profile" />
      <Image.Fallback class="avatar-fallback">JD</Image.Fallback>
    </Image>
  );
}
```

### API Reference
- `Image`: Standard attributes.
- `Image.Fallback`: `delayMs?: number`.

### Rendered Elements
- `Image` $\rightarrow$ `<span>`
- `Image.Img` $\rightarrow$ `<img>`
- `Image.Fallback` $\rightarrow$ `<span>`

### Accessibility (A11y)
- Standard image accessibility with required `alt` attribute.

---

## 10. I18nProvider

### Import
```tsx
import { I18nProvider } from "@kobalte/core/i18n-provider";
```

### Features
- Provides locale, text direction (LTR vs RTL), and number/date formatting context across all child components.

### Example & Usage
```tsx
import { I18nProvider } from "@kobalte/core/i18n-provider";

export function AppRoot(props) {
  return (
    <I18nProvider locale="ar-EG">
      {props.children}
    </I18nProvider>
  );
}
```

### API Reference
- `I18nProvider`: `locale?: string`.

---

## 11. ColorArea

### Import
```tsx
import { ColorArea } from "@kobalte/core/color-area";
```

### Features
- 2D slider for picking color coordinates (e.g. Saturation and Value in HSV).
- Keyboard 2D movement (Arrow keys).

### Anatomy
- `ColorArea`: Root container.
- `ColorArea.Background`: 2D gradient background.
- `ColorArea.Thumb`: Draggable 2D cursor.

### Example & Usage
```tsx
import { ColorArea } from "@kobalte/core/color-area";
import { createSignal } from "solid-js";

export function SaturationPicker() {
  const [color, setColor] = createSignal("#ff0000");

  return (
    <ColorArea value={color()} onChange={setColor}>
      <ColorArea.Background />
      <ColorArea.Thumb />
    </ColorArea>
  );
}
```

---

## 12. ColorChannelField

### Import
```tsx
import { ColorChannelField } from "@kobalte/core/color-channel-field";
```

### Features
- Input for a specific color channel (Red, Green, Blue, Alpha, Hue, Saturation).

### Anatomy
- `ColorChannelField`: Root container.
- `ColorChannelField.Input`: Channel numeric input.
- `ColorChannelField.Label`, `IncrementTrigger`, `DecrementTrigger`.

---

## 13. ColorField

### Import
```tsx
import { ColorField } from "@kobalte/core/color-field";
```

### Features
- Formatted text input parsing hex, rgb, hsl, or hsb color strings.

### Anatomy
- `ColorField`: Root container.
- `ColorField.Input`: Text input.
- `ColorField.Label`, `Description`, `ErrorMessage`.

---

## 14. ColorSlider

### Import
```tsx
import { ColorSlider } from "@kobalte/core/color-slider";
```

### Features
- 1D slider adjusting a single color dimension (Hue spectrum, Opacity gradient).

### Anatomy
- `ColorSlider`: Root container.
- `ColorSlider.Track`: Gradient track rail.
- `ColorSlider.Thumb`: Slider thumb.

---

## 15. ColorSwatch

### Import
```tsx
import { ColorSwatch } from "@kobalte/core/color-swatch";
```

### Features
- Accessible preview square displaying a color value.

### Anatomy
- `ColorSwatch`: Swatch element.

```tsx
<ColorSwatch value="#00ff00" aria-label="Green Swatch" />
```

---

## 16. ColorWheel

### Import
```tsx
import { ColorWheel } from "@kobalte/core/color-wheel";
```

### Features
- Circular wheel slider for choosing Hue in HSL/HSV color spaces.

### Anatomy
- `ColorWheel`: Root container.
- `ColorWheel.Track`: Circular rainbow track.
- `ColorWheel.Thumb`: Circular sliding thumb.

```tsx
<ColorWheel value={hue()} onChange={setHue}>
  <ColorWheel.Track />
  <ColorWheel.Thumb />
</ColorWheel>
```

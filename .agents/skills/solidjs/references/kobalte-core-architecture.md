# Kobalte Core Architecture & Mechanics

> Sources cited:
> - Kobalte Official Documentation: https://kobalte.dev
> - Kobalte GitHub Repository: https://github.com/kobaltedev/kobalte
> - Kobalte Polymorphism Guide: https://github.com/kobaltedev/kobalte/blob/main/apps/docs/src/routes/docs/core/(0)overview/(4)polymorphism.mdx

---

## 1. The Essence & Philosophy of Kobalte
- Zero styling assumptions (0 bytes of CSS).
- Fine-grained reactivity: component setup runs once; updates modify only DOM attributes.
- WAI-ARIA compliance with APG standards.

## 2. Compound Component Architecture & Context Sharing
Compound components (`Dialog.Trigger`, `Dialog.Portal`, `Dialog.Overlay`, `Dialog.Content`, `Dialog.CloseButton`) consume reactive context provided by `Dialog.Root`.

## 3. The Polymorphic `as` Pattern & Typing
```tsx
import { Tabs, TabsTriggerProps } from "@kobalte/core/tabs";
import { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ValidComponent } from "@kobalte/utils";
import { splitProps } from "solid-js";

interface CustomTabsTriggerProps<T extends ValidComponent = "button"> extends TabsTriggerProps<T> {
  variant?: "primary" | "secondary";
}

export function CustomTabsTrigger<T extends ValidComponent = "button">(
  props: PolymorphicProps<T, CustomTabsTriggerProps<T>>
) {
  const [local, others] = splitProps(props as CustomTabsTriggerProps, ["variant"]);
  return <Tabs.Trigger as="button" data-variant={local.variant || "primary"} {...others} />;
}
```

## 4. State Management: Controlled vs Uncontrolled
- Uncontrolled: `defaultOpen={false}`.
- Controlled: `open={isOpen()}` and `onOpenChange={setIsOpen}`.

## 5. Floating Positioning Mechanics (`@floating-ui/dom`)
`placement`, `gutter`, `shift`, `flip`, `sameWidth`.

## 6. Form Integration, Hidden Inputs & Constraint Validation
- Standard Quartet: `<Label>`, `<Control>`, `<Description>`, `<ErrorMessage>`.
- `validationState="invalid"` auto-injects `aria-invalid="true"` and appends `<ErrorMessage>` ID to `aria-describedby`.
- Hidden inputs: `<Select.HiddenSelect />`, `<Checkbox.Input />`, `<RadioGroup.ItemInput />`.

## 7. Outside Interaction Lifecycles & Preventing Dismissal
- `onPointerDownOutside`, `onFocusOutside`, `onInteractOutside`, `onEscapeKeyDown`. Use `e.preventDefault()`.

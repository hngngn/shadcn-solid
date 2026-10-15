# Kobalte Components Encyclopedia: Form Controls & Inputs

> Sources cited:
> - Kobalte Official Documentation: https://kobalte.dev/docs/core
> - WAI-ARIA Authoring Practices Guide (APG)

This catalog covers all 16 Form Controls, Pickers, and Input primitives in Kobalte.

---

## 1. Button

### Import
```tsx
import { Button } from "@kobalte/core/button";
```

### Features
- Accessible button wrapper with polymorphic `as` support.
- Properly emulates button semantics when rendered as other elements (`role="button"`, Space/Enter activation).

### Anatomy
- `Button`: Root button element.

### Example & Usage
```tsx
import { Button } from "@kobalte/core/button";

export function CustomButton() {
  return <Button onClick={() => alert("Clicked!")}>Submit</Button>;
}
```

### API Reference
- `Button`: `disabled?: boolean`, `as?: ValidComponent`.

### Rendered Elements
- `Button` $\rightarrow$ `<button>`

### Accessibility (A11y)
- Native `<button>`. If rendered on `div`/`a`, injects `role="button"` and `tabindex="0"`.

---

## 2. ToggleButton

### Import
```tsx
import { ToggleButton } from "@kobalte/core/toggle-button";
```

### Features
- Two-state button that can be either on (pressed) or off (unpressed).
- Exposes `aria-pressed` state automatically.

### Anatomy
- `ToggleButton`: Root toggle button.

### Example & Usage
```tsx
import { ToggleButton } from "@kobalte/core/toggle-button";
import { createSignal } from "solid-js";

export function BoldToggle() {
  const [pressed, setPressed] = createSignal(false);
  return (
    <ToggleButton pressed={pressed()} onChange={setPressed} aria-label="Toggle Bold">
      B
    </ToggleButton>
  );
}
```

### API Reference
- `ToggleButton`: `pressed?: boolean`, `defaultPressed?: boolean`, `onChange?: (pressed: boolean) => void`.

### Rendered Elements
- `ToggleButton` $\rightarrow$ `<button>`

### Accessibility (A11y)
- Uses `aria-pressed="true" | "false"`.

---

## 3. ToggleGroup

### Import
```tsx
import { ToggleGroup } from "@kobalte/core/toggle-group";
```

### Features
- Set of two-state buttons that can be toggled on or off.
- Supports single selection (`multiple={false}`) or multi-selection (`multiple={true}`).
- Roving focus navigation with arrow keys.

### Anatomy
- `ToggleGroup`: Root container.
- `ToggleGroup.Item`: Individual toggle item.

### Example & Usage
```tsx
import { ToggleGroup } from "@kobalte/core/toggle-group";
import { createSignal } from "solid-js";

export function TextAlignment() {
  const [align, setAlign] = createSignal("left");

  return (
    <ToggleGroup value={align()} onChange={setAlign}>
      <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
      <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
      <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
    </ToggleGroup>
  );
}
```

### API Reference
- `ToggleGroup`: `value?: string | string[]`, `onChange?: (val: any) => void`, `multiple?: boolean`, `orientation?: "horizontal" | "vertical"`.

### Rendered Elements
- `ToggleGroup` $\rightarrow$ `<div>` (role `group`)
- `ToggleGroup.Item` $\rightarrow$ `<button>`

### Accessibility (A11y)
- Group with `role="group"`. Arrow keys move focus across toggle items.

---

## 4. Checkbox

### Import
```tsx
import { Checkbox } from "@kobalte/core/checkbox";
```

### Features
- Tri-state support: checked, unchecked, indeterminate.
- Native form integration via `<Checkbox.Input />`.
- Validation state linking with `<Checkbox.ErrorMessage>`.

### Anatomy
- `Checkbox`: Root provider.
- `Checkbox.Input`: Hidden native checkbox input.
- `Checkbox.Control`: Visual styled box.
- `Checkbox.Indicator`: Checkmark icon rendered when checked/indeterminate.
- `Checkbox.Label`, `Description`, `ErrorMessage`.

### Example & Usage
```tsx
import { Checkbox } from "@kobalte/core/checkbox";
import { createSignal } from "solid-js";

export function AcceptTerms() {
  const [checked, setChecked] = createSignal(false);

  return (
    <Checkbox checked={checked()} onChange={setChecked}>
      <Checkbox.Input />
      <Checkbox.Control>
        <Checkbox.Indicator>✓</Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
    </Checkbox>
  );
}
```

### API Reference
- `Checkbox`: `checked?: boolean`, `defaultChecked?: boolean`, `indeterminate?: boolean`, `onChange?: (checked: boolean) => void`, `name?: string`, `value?: string`.

### Rendered Elements
- `Checkbox` $\rightarrow$ `<div>`
- `Checkbox.Input` $\rightarrow$ `<input type="checkbox">`
- `Checkbox.Control` $\rightarrow$ `<div>` (role `checkbox`)
- `Checkbox.Label` $\rightarrow$ `<label>`

### Accessibility (A11y)
- `aria-checked="true" | "false" | "mixed"`. Space key toggles checkmark.

---

## 5. RadioGroup

### Import
```tsx
import { RadioGroup } from "@kobalte/core/radio-group";
```

### Features
- Single selection among mutually exclusive choices.
- Arrow key roving focus.
- Hidden native radio inputs for form submission.

### Anatomy
- `RadioGroup`: Root provider.
- `RadioGroup.Label`, `Description`, `ErrorMessage`.
- `RadioGroup.Item`: Individual radio option wrapper.
- `RadioGroup.ItemInput`: Hidden `<input type="radio">`.
- `RadioGroup.ItemControl`: Visual circle container.
- `RadioGroup.ItemIndicator`: Dot icon shown when selected.
- `RadioGroup.ItemLabel`: Label for item.

### Example & Usage
```tsx
import { RadioGroup } from "@kobalte/core/radio-group";
import { createSignal } from "solid-js";

export function PlanSelector() {
  const [plan, setPlan] = createSignal("hobby");

  return (
    <RadioGroup value={plan()} onChange={setPlan}>
      <RadioGroup.Label>Select a Plan</RadioGroup.Label>
      <RadioGroup.Item value="hobby">
        <RadioGroup.ItemInput />
        <RadioGroup.ItemControl>
          <RadioGroup.ItemIndicator>•</RadioGroup.ItemIndicator>
        </RadioGroup.ItemControl>
        <RadioGroup.ItemLabel>Hobby ($0)</RadioGroup.ItemLabel>
      </RadioGroup.Item>
      <RadioGroup.Item value="pro">
        <RadioGroup.ItemInput />
        <RadioGroup.ItemControl>
          <RadioGroup.ItemIndicator>•</RadioGroup.ItemIndicator>
        </RadioGroup.ItemControl>
        <RadioGroup.ItemLabel>Pro ($20)</RadioGroup.ItemLabel>
      </RadioGroup.Item>
    </RadioGroup>
  );
}
```

### API Reference
- `RadioGroup`: `value?: string`, `defaultValue?: string`, `onChange?: (val: string) => void`, `orientation?: "horizontal" | "vertical"`.

### Rendered Elements
- `RadioGroup` $\rightarrow$ `<div>` (role `radiogroup`)
- `RadioGroup.Item` $\rightarrow$ `<div>`
- `RadioGroup.ItemInput` $\rightarrow$ `<input type="radio">`
- `RadioGroup.ItemControl` $\rightarrow$ `<div>` (role `radio`)

### Accessibility (A11y)
- Standard WAI-ARIA RadioGroup pattern with roving tabindex and Arrow keys navigation.

---

## 6. Switch

### Import
```tsx
import { Switch } from "@kobalte/core/switch";
```

### Features
- Two-state toggle switch (on/off) for instant preferences.
- Hidden input for form serialization.

### Anatomy
- `Switch`: Root provider.
- `Switch.Input`: Hidden native checkbox input.
- `Switch.Control`: Track of the switch.
- `Switch.Thumb`: Sliding circular knob.
- `Switch.Label`, `Description`, `ErrorMessage`.

### Example & Usage
```tsx
import { Switch } from "@kobalte/core/switch";
import { createSignal } from "solid-js";

export function DarkModeToggle() {
  const [dark, setDark] = createSignal(false);

  return (
    <Switch checked={dark()} onChange={setDark}>
      <Switch.Label>Dark Mode</Switch.Label>
      <Switch.Input />
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
    </Switch>
  );
}
```

### API Reference
- `Switch`: `checked?: boolean`, `defaultChecked?: boolean`, `onChange?: (checked: boolean) => void`.

### Rendered Elements
- `Switch.Control` $\rightarrow$ `<div>` (role `switch`)
- `Switch.Thumb` $\rightarrow$ `<div>`

### Accessibility (A11y)
- Role `switch`, `aria-checked`. Space and Enter toggle state.

---

## 7. TextField

### Import
```tsx
import { TextField } from "@kobalte/core/text-field";
```

### Features
- Accessible text input and textarea wrapper.
- Automatic `aria-invalid` and `aria-describedby` linking for error and helper text.
- Supports multiline `<TextField.TextArea>`.

### Anatomy
- `TextField`: Root provider.
- `TextField.Label`: Linked label.
- `TextField.Input` or `TextField.TextArea`: Text input element.
- `TextField.Description`, `ErrorMessage`.

### Example & Usage
```tsx
import { TextField } from "@kobalte/core/text-field";
import { createSignal } from "solid-js";

export function UsernameField() {
  const [val, setVal] = createSignal("");

  return (
    <TextField value={val()} onChange={setVal}>
      <TextField.Label>Username</TextField.Label>
      <TextField.Input placeholder="Enter username..." />
      <TextField.Description>Between 3 and 20 characters.</TextField.Description>
    </TextField>
  );
}
```

### API Reference
- `TextField`: `value?: string`, `defaultValue?: string`, `onChange?: (val: string) => void`, `validationState?: "valid" | "invalid"`.

### Rendered Elements
- `TextField` $\rightarrow$ `<div>`
- `TextField.Input` $\rightarrow$ `<input type="text">`
- `TextField.TextArea` $\rightarrow$ `<textarea>`

### Accessibility (A11y)
- Automatically manages `aria-labelledby`, `aria-describedby`, and `aria-invalid`.

---

## 8. NumberField

### Import
```tsx
import { NumberField } from "@kobalte/core/number-field";
```

### Features
- Formatted numeric input with step validation and min/max limits.
- Increment/Decrement button triggers.
- ArrowUp / ArrowDown keyboard stepping.

### Anatomy
- `NumberField`: Root provider.
- `NumberField.Input`: Native numeric input.
- `NumberField.IncrementTrigger`, `DecrementTrigger`: Step buttons.
- `NumberField.Label`, `Description`, `ErrorMessage`.

### Example & Usage
```tsx
import { NumberField } from "@kobalte/core/number-field";
import { createSignal } from "solid-js";

export function AgeInput() {
  const [age, setAge] = createSignal(18);

  return (
    <NumberField value={age()} onChange={setAge} minValue={0} maxValue={120}>
      <NumberField.Label>Age</NumberField.Label>
      <NumberField.Input />
      <NumberField.IncrementTrigger aria-label="Increase">+</NumberField.IncrementTrigger>
      <NumberField.DecrementTrigger aria-label="Decrease">-</NumberField.DecrementTrigger>
    </NumberField>
  );
}
```

### API Reference
- `NumberField`: `value?: number`, `defaultValue?: number`, `onChange?: (val: number) => void`, `minValue?: number`, `maxValue?: number`, `step?: number`.

### Rendered Elements
- `NumberField.Input` $\rightarrow$ `<input type="text" inputmode="numeric">` (role `spinbutton`)

### Accessibility (A11y)
- Role `spinbutton`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.

---

## 9. Search

### Import
```tsx
import { Search } from "@kobalte/core/search";
```

### Features
- Dedicated search input with accessible clear button trigger.
- Escape key clears the input value.

### Anatomy
- `Search`: Root provider.
- `Search.Label`, `Input`, `ClearTrigger`, `Description`, `ErrorMessage`.

### Example & Usage
```tsx
import { Search } from "@kobalte/core/search";
import { createSignal } from "solid-js";

export function GlobalSearch() {
  const [query, setQuery] = createSignal("");

  return (
    <Search value={query()} onChange={setQuery}>
      <Search.Label>Search documentation</Search.Label>
      <Search.Input placeholder="Type query..." />
      <Search.ClearTrigger aria-label="Clear search">✕</Search.ClearTrigger>
    </Search>
  );
}
```

### API Reference
- `Search`: `value?: string`, `onChange?: (val: string) => void`.

### Rendered Elements
- `Search.Input` $\rightarrow$ `<input type="search">`
- `Search.ClearTrigger` $\rightarrow$ `<button>`

### Accessibility (A11y)
- Escape key clears query. `ClearTrigger` hidden when input is empty.

---

## 10. FileField

### Import
```tsx
import { FileField } from "@kobalte/core/file-field";
```

### Features
- Accessible file input supporting drag and drop, file size limits, and multi-file selection.
- List inspection of selected files.

### Anatomy
- `FileField`: Root provider.
- `FileField.Input`: Hidden native file input.
- `FileField.DropZone`: Drop area for drag and drop.
- `FileField.Trigger`: Button triggering file picker dialog.
- `FileField.ItemList` / `Item`: Render prop listing chosen files.
- `FileField.ItemDeleteTrigger`: Button removing specific file.

### Example & Usage
```tsx
import { FileField } from "@kobalte/core/file-field";

export function FileUploader() {
  return (
    <FileField multiple maxFiles={3}>
      <FileField.DropZone class="dropzone">
        <p>Drag files here or</p>
        <FileField.Trigger class="btn">Browse</FileField.Trigger>
      </FileField.DropZone>
      <FileField.Input />
      <FileField.ItemList>
        {(file) => (
          <FileField.Item file={file}>
            <FileField.ItemName>{file.name}</FileField.ItemName>
            <FileField.ItemDeleteTrigger>✕</FileField.ItemDeleteTrigger>
          </FileField.Item>
        )}
      </FileField.ItemList>
    </FileField>
  );
}
```

### API Reference
- `FileField`: `multiple?: boolean`, `accept?: string`, `maxFiles?: number`, `onFileChange?: (files: File[]) => void`.

### Rendered Elements
- `FileField.DropZone` $\rightarrow$ `<div>`
- `FileField.Input` $\rightarrow$ `<input type="file">`

### Accessibility (A11y)
- Native file picker accessibility, dragover state tracking, keyboard trigger activation.

---

## 11. SegmentedControl

### Import
```tsx
import { SegmentedControl } from "@kobalte/core/segmented-control";
```

### Features
- iOS / macOS style compact segmented button group for mutually exclusive options.
- Animated indicator tracking active segment.

### Anatomy
- `SegmentedControl`: Root provider.
- `SegmentedControl.List`: Container for segments.
- `SegmentedControl.Item`: Individual segment.
- `SegmentedControl.Indicator`: Animated sliding background indicator.

### Example & Usage
```tsx
import { SegmentedControl } from "@kobalte/core/segmented-control";
import { createSignal } from "solid-js";

export function ViewSwitch() {
  const [view, setView] = createSignal("grid");

  return (
    <SegmentedControl value={view()} onChange={setView}>
      <SegmentedControl.List>
        <SegmentedControl.Item value="grid">Grid</SegmentedControl.Item>
        <SegmentedControl.Item value="list">List</SegmentedControl.Item>
        <SegmentedControl.Indicator />
      </SegmentedControl.List>
    </SegmentedControl>
  );
}
```

### API Reference
- `SegmentedControl`: `value?: string`, `defaultValue?: string`, `onChange?: (val: string) => void`.

### Rendered Elements
- `SegmentedControl.List` $\rightarrow$ `<div>`
- `SegmentedControl.Item` $\rightarrow$ `<button>`

### Accessibility (A11y)
- Radio group semantics with arrow key navigation.

---

## 12. Rating

### Import
```tsx
import { Rating } from "@kobalte/core/rating";
```

### Features
- Star rating component supporting fractional increments (e.g. 0.5 stars), hover preview, and read-only mode.

### Anatomy
- `Rating`: Root provider.
- `Rating.Label`: Rating accessible label.
- `Rating.Item`: Individual rating item (star).

### Example & Usage
```tsx
import { Rating } from "@kobalte/core/rating";
import { createSignal } from "solid-js";

export function ProductReview() {
  const [score, setScore] = createSignal(4);

  return (
    <Rating value={score()} onValueChange={setScore} count={5}>
      <Rating.Label>Rate this product</Rating.Label>
      <Rating.Item value={1}>★</Rating.Item>
      <Rating.Item value={2}>★</Rating.Item>
      <Rating.Item value={3}>★</Rating.Item>
      <Rating.Item value={4}>★</Rating.Item>
      <Rating.Item value={5}>★</Rating.Item>
    </Rating>
  );
}
```

### API Reference
- `Rating`: `value?: number`, `count?: number`, `readOnly?: boolean`, `allowHalf?: boolean`.

### Rendered Elements
- `Rating` $\rightarrow$ `<div>` (role `radiogroup`)
- `Rating.Item` $\rightarrow$ `<span>`

### Accessibility (A11y)
- Role `radiogroup` or slider pattern announcing current score.

---

## 13. Select

### Import
```tsx
import { Select } from "@kobalte/core/select";
```

### Features
- Single and multi-select dropdown with keyboard typeahead and custom item templates.
- Native hidden select for form submissions.

### Anatomy
- `Select`: Root provider.
- `Select.Label`, `Description`, `ErrorMessage`.
- `Select.HiddenSelect`: Hidden native select element.
- `Select.Control`: Container for value and trigger button.
- `Select.Value`: Selected item value display.
- `Select.Trigger`: Dropdown trigger button.
- `Select.Portal`: Portals dropdown content.
- `Select.Content`: Floating listbox panel.
- `Select.Listbox`: Items container.
- `Select.Item`, `Select.ItemLabel`, `Select.ItemIndicator`: Individual option.

### Example & Usage
```tsx
import { Select } from "@kobalte/core/select";
import { createSignal } from "solid-js";

const OPTIONS = ["Apple", "Banana", "Cherry"];

export function FruitPicker() {
  const [fruit, setFruit] = createSignal("Banana");

  return (
    <Select<string>
      options={OPTIONS}
      value={fruit()}
      onChange={setFruit}
      itemComponent={(props) => (
        <Select.Item item={props.item}>
          <Select.ItemLabel>{props.item.rawValue}</Select.ItemLabel>
          <Select.ItemIndicator>✓</Select.ItemIndicator>
        </Select.Item>
      )}
    >
      <Select.Label>Fruit</Select.Label>
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Value<string>>{(state) => state.selectedOption()}</Select.Value>
        <Select.Trigger>▼</Select.Trigger>
      </Select.Control>
      <Select.Portal>
        <Select.Content>
          <Select.Listbox />
        </Select.Content>
      </Select.Portal>
    </Select>
  );
}
```

### API Reference
- `Select`: `options: T[]`, `value?: T`, `onChange?: (val: T) => void`, `multiple?: boolean`, `placeholder?: string`.

### Rendered Elements
- `Select.Control` $\rightarrow$ `<div>`
- `Select.Trigger` $\rightarrow$ `<button>`
- `Select.Listbox` $\rightarrow$ `<ul>` (role `listbox`)
- `Select.Item` $\rightarrow$ `<li>` (role `option`)

### Accessibility (A11y)
- WAI-ARIA Select pattern. Arrow keys navigate items, Enter selects, Escape closes.

---

## 14. Combobox

### Import
```tsx
import { Combobox } from "@kobalte/core/combobox";
```

### Features
- Searchable autocomplete input combined with a dropdown listbox.
- Inline filtering, multi-selection tokens, and custom items.

### Anatomy
- `Combobox`: Root provider.
- `Combobox.Control`, `Input`, `Trigger`, `Icon`.
- `Combobox.Portal`, `Content`, `Listbox`.
- `Combobox.Item`, `ItemLabel`, `ItemIndicator`.

### Example & Usage
```tsx
import { Combobox } from "@kobalte/core/combobox";
import { createSignal } from "solid-js";

const FRAMEWORKS = ["SolidJS", "React", "Vue", "Svelte"];

export function FrameworkCombobox() {
  const [val, setVal] = createSignal("");

  return (
    <Combobox<string>
      options={FRAMEWORKS}
      value={val()}
      onChange={setVal}
      itemComponent={(props) => (
        <Combobox.Item item={props.item}>
          <Combobox.ItemLabel>{props.item.rawValue}</Combobox.ItemLabel>
        </Combobox.Item>
      )}
    >
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.Trigger>▼</Combobox.Trigger>
      </Combobox.Control>
      <Combobox.Portal>
        <Combobox.Content>
          <Combobox.Listbox />
        </Combobox.Content>
      </Combobox.Portal>
    </Combobox>
  );
}
```

### API Reference
- `Combobox`: `options: T[]`, `value?: T`, `onChange?: (val: T) => void`, `filter?: (options, query) => T[]`.

### Rendered Elements
- `Combobox.Input` $\rightarrow$ `<input role="combobox">`
- `Combobox.Listbox` $\rightarrow$ `<ul>` (role `listbox`)

### Accessibility (A11y)
- `aria-autocomplete="list"`, `aria-expanded`, `aria-controls`.

---

## 15. TimeField

### Import
```tsx
import { TimeField } from "@kobalte/core/time-field";
```

### Features
- Accessible segmented time input (hours, minutes, seconds, meridiem AM/PM).
- ArrowUp/ArrowDown increments active segment; numeric typing jumps directly.

### Anatomy
- `TimeField`: Root provider.
- `TimeField.Input`: Segmented input container.
- `TimeField.Label`, `Description`, `ErrorMessage`.

### Example & Usage
```tsx
import { TimeField } from "@kobalte/core/time-field";
import { createSignal } from "solid-js";

export function AlarmPicker() {
  const [time, setTime] = createSignal("08:30");

  return (
    <TimeField value={time()} onChange={setTime}>
      <TimeField.Label>Alarm Time</TimeField.Label>
      <TimeField.Input />
    </TimeField>
  );
}
```

### API Reference
- `TimeField`: `value?: string`, `onChange?: (time: string) => void`, `hourCycle?: 12 | 24`.

### Rendered Elements
- `TimeField.Input` $\rightarrow$ `<div>` (with individual segment spans)

### Accessibility (A11y)
- Spinbutton pattern for each segment with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.

---

## 16. Slider

### Import
```tsx
import { Slider } from "@kobalte/core/slider";
```

### Features
- Single and dual-thumb range sliders.
- Smooth drag interactions and keyboard step adjustments.

### Anatomy
- `Slider`: Root provider.
- `Slider.Track`: Visual track rail.
- `Slider.Fill`: Colored active segment.
- `Slider.Thumb`: Draggable thumb knob with `<Slider.Input />`.
- `Slider.Label`, `ValueLabel`.

### Example & Usage
```tsx
import { Slider } from "@kobalte/core/slider";
import { createSignal } from "solid-js";

export function VolumeSlider() {
  const [volume, setVolume] = createSignal([50]);

  return (
    <Slider value={volume()} onChange={setVolume} minValue={0} maxValue={100}>
      <Slider.Label>Volume</Slider.Label>
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb index={0}>
          <Slider.Input />
        </Slider.Thumb>
      </Slider.Track>
    </Slider>
  );
}
```

### API Reference
- `Slider`: `value?: number[]`, `onChange?: (val: number[]) => void`, `minValue?: number`, `maxValue?: number`, `step?: number`.

### Rendered Elements
- `Slider.Thumb` $\rightarrow$ `<span>` (role `slider`)

### Accessibility (A11y)
- Role `slider`, `aria-valuenow`. Arrow keys step, PageUp/PageDown jump, Home/End snap to bounds.

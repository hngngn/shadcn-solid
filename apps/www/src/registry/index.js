const ui = [
  {
    name: "accordion",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/accordion.tsx"]
  },
  {
    name: "alert",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/alert.tsx"]
  },
  {
    name: "alert-dialog",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/alert-dialog.tsx"]
  },
  {
    name: "badge",
    type: "components:ui",
    files: ["ui/badge.tsx"]
  },
  {
    name: "button",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/button.tsx"]
  },
  {
    name: "card",
    type: "components:ui",
    files: ["ui/card.tsx"]
  },
  {
    name: "carousel",
    type: "components:ui",
    dependencies: ["embla-carousel-solid"],
    files: ["ui/carousel.tsx"]
  },
  {
    name: "checkbox",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/checkbox.tsx"]
  },
  {
    name: "collapsible",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/collapsible.tsx"]
  },
  {
    name: "combobox",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/combobox.tsx"]
  },
  {
    name: "command",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/command.tsx"]
  },
  {
    name: "context-menu",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/context-menu.tsx"]
  },
  {
    name: "date-picker",
    type: "components:ui",
    registryDependencies: ["button"],
    dependencies: ["@ark-ui/solid"],
    files: ["ui/date-picker.tsx"]
  },
  {
    name: "dialog",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/dialog.tsx"]
  },
  {
    name: "dropdown-menu",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/dropdown-menu.tsx"]
  },
  {
    name: "hover-card",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/hover-card.tsx"]
  },
  {
    name: "image",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/image.tsx"]
  },
  {
    name: "popover",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/popover.tsx"]
  },
  {
    name: "pagination",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/pagination.tsx"]
  },
  {
    name: "progress",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/progress.tsx"]
  },
  {
    name: "radio-group",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/radio-group.tsx"]
  },
  {
    name: "select",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/select.tsx"]
  },
  {
    name: "separator",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/separator.tsx"]
  },
  {
    name: "sheet",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/sheet.tsx"]
  },
  {
    name: "skeleton",
    type: "components:ui",
    files: ["ui/skeleton.tsx"]
  },
  {
    name: "switch",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/switch.tsx"]
  },
  {
    name: "table",
    type: "components:ui",
    files: ["ui/table.tsx"]
  },
  {
    name: "tabs",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/tabs.tsx"]
  },
  {
    name: "textfield",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/textfield.tsx"]
  },
  {
    name: "textarea",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    registryDependencies: ["textfield"],
    files: ["ui/textarea.tsx"]
  },
  {
    name: "toast",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/toast.tsx"]
  },
  {
    name: "toggle",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/toggle.tsx"]
  },
  {
    name: "tooltip",
    type: "components:ui",
    dependencies: ["@kobalte/core"],
    files: ["ui/tooltip.tsx"]
  }
];

const example = [
  {
    name: "accordion-demo",
    type: "components:example",
    files: ["example/accordion-demo.tsx"]
  },
  {
    name: "alert-demo",
    type: "components:example",
    files: ["example/alert-demo.tsx"]
  },
  {
    name: "alert-destructive",
    type: "components:example",
    files: ["example/alert-destructive.tsx"]
  },
  {
    name: "alert-dialog-demo",
    type: "components:example",
    files: ["example/alert-dialog-demo.tsx"]
  },
  {
    name: "button-demo",
    type: "components:example",
    files: ["example/button-demo.tsx"]
  },
  {
    name: "button-secondary",
    type: "components:example",
    files: ["example/button-secondary.tsx"]
  },
  {
    name: "button-destructive",
    type: "components:example",
    files: ["example/button-destructive.tsx"]
  },
  {
    name: "button-outline",
    type: "components:example",
    files: ["example/button-outline.tsx"]
  },
  {
    name: "badge-demo",
    type: "components:example",
    files: ["example/badge-demo.tsx"]
  },
  {
    name: "badge-secondary",
    type: "components:example",
    files: ["example/badge-secondary.tsx"]
  },
  {
    name: "badge-destructive",
    type: "components:example",
    files: ["example/badge-destructive.tsx"]
  },
  {
    name: "badge-outline",
    type: "components:example",
    files: ["example/badge-outline.tsx"]
  },
  {
    name: "button-ghost",
    type: "components:example",
    files: ["example/button-ghost.tsx"]
  },
  {
    name: "button-link",
    type: "components:example",
    files: ["example/button-link.tsx"]
  },
  {
    name: "button-with-icon",
    type: "components:example",
    files: ["example/button-with-icon.tsx"]
  },
  {
    name: "button-loading",
    type: "components:example",
    files: ["example/button-loading.tsx"]
  },
  {
    name: "button-as-child",
    type: "components:example",
    files: ["example/button-as-child.tsx"]
  },
  {
    name: "card-demo",
    type: "components:example",
    files: ["example/card-demo.tsx"]
  },
  {
    name: "carousel-demo",
    type: "components:example",
    files: ["example/carousel-demo.tsx"]
  },
  {
    name: "carousel-size",
    type: "components:example",
    files: ["example/carousel-size.tsx"]
  },
  {
    name: "carousel-api-demo",
    type: "components:example",
    files: ["example/carousel-api-demo.tsx"]
  },
  {
    name: "carousel-orientation",
    type: "components:example",
    files: ["example/carousel-orientation.tsx"]
  },
  {
    name: "carousel-plugin",
    type: "components:example",
    files: ["example/carousel-plugin.tsx"]
  },
  {
    name: "carousel-spacing",
    type: "components:example",
    files: ["example/carousel-spacing.tsx"]
  },
  {
    name: "checkbox-demo",
    type: "components:example",
    files: ["example/checkbox-demo.tsx"]
  },
  {
    name: "checkbox-disabled",
    type: "components:example",
    files: ["example/checkbox-disabled.tsx"]
  },
  {
    name: "checkbox-with-text",
    type: "components:example",
    files: ["example/checkbox-with-text.tsx"]
  },
  {
    name: "collapsible-demo",
    type: "components:example",
    files: ["example/collapsible-demo.tsx"]
  },
  {
    name: "combobox-demo",
    type: "components:example",
    files: ["example/combobox-demo.tsx"]
  },
  {
    name: "command-demo",
    type: "components:example",
    files: ["example/command-demo.tsx"]
  },
  {
    name: "command-dialog",
    type: "components:example",
    files: ["example/command-dialog.tsx"]
  },
  {
    name: "context-menu-demo",
    type: "components:example",
    files: ["example/context-menu-demo.tsx"]
  },
  {
    name: "date-picker-demo",
    type: "components:example",
    files: ["example/date-picker-demo.tsx"]
  },
  {
    name: "date-picker-with-range-demo",
    type: "components:example",
    files: ["example/date-picker-with-range-demo.tsx"]
  },
  {
    name: "dialog-demo",
    type: "components:example",
    files: ["example/dialog-demo.tsx"]
  },
  {
    name: "dropdown-menu-demo",
    type: "components:example",
    files: ["example/dropdown-menu-demo.tsx"]
  },
  {
    name: "dropdown-menu-checkboxes",
    type: "components:example",
    files: ["example/dropdown-menu-checkboxes.tsx"]
  },
  {
    name: "dropdown-menu-radio-group",
    type: "components:example",
    files: ["example/dropdown-menu-radio-group.tsx"]
  },
  {
    name: "hover-card-demo",
    type: "components:example",
    files: ["example/hover-card-demo.tsx"]
  },
  {
    name: "mode-toggle",
    type: "components:example",
    files: ["example/mode-toggle.tsx"]
  },
  {
    name: "image-demo",
    type: "components:example",
    files: ["example/image-demo.tsx"]
  },
  {
    name: "popover-demo",
    type: "components:example",
    files: ["example/popover-demo.tsx"]
  },
  {
    name: "pagination-demo",
    type: "components:example",
    files: ["example/pagination-demo.tsx"]
  },
  {
    name: "progress-demo",
    type: "components:example",
    files: ["example/progress-demo.tsx"]
  },
  {
    name: "radio-group-demo",
    type: "components:example",
    files: ["example/radio-group-demo.tsx"]
  },
  {
    name: "select-demo",
    type: "components:example",
    files: ["example/select-demo.tsx"]
  },
  {
    name: "separator-demo",
    type: "components:example",
    files: ["example/separator-demo.tsx"]
  },
  {
    name: "sheet-demo",
    type: "components:example",
    files: ["example/sheet-demo.tsx"]
  },
  {
    name: "sheet-side",
    type: "components:example",
    files: ["example/sheet-side.tsx"]
  },
  {
    name: "skeleton-demo",
    type: "components:example",
    files: ["example/skeleton-demo.tsx"]
  },
  {
    name: "switch-demo",
    type: "components:example",
    files: ["example/switch-demo.tsx"]
  },
  {
    name: "table-demo",
    type: "components:example",
    files: ["example/table-demo.tsx"]
  },
  {
    name: "tabs-demo",
    type: "components:example",
    files: ["example/tabs-demo.tsx"]
  },
  {
    name: "textarea-demo",
    type: "components:example",
    files: ["example/textarea-demo.tsx"]
  },
  {
    name: "textarea-disabled",
    type: "components:example",
    files: ["example/textarea-disabled.tsx"]
  },
  {
    name: "textarea-with-button",
    type: "components:example",
    files: ["example/textarea-with-button.tsx"]
  },
  {
    name: "textarea-with-label",
    type: "components:example",
    files: ["example/textarea-with-label.tsx"]
  },
  {
    name: "textarea-with-text",
    type: "components:example",
    files: ["example/textarea-with-text.tsx"]
  },
  {
    name: "textfield-demo",
    type: "components:example",
    files: ["example/textfield-demo.tsx"]
  },
  {
    name: "textfield-disabled",
    type: "components:example",
    files: ["example/textfield-disabled.tsx"]
  },
  {
    name: "textfield-file",
    type: "components:example",
    files: ["example/textfield-file.tsx"]
  },
  {
    name: "textfield-with-button",
    type: "components:example",
    files: ["example/textfield-with-button.tsx"]
  },
  {
    name: "textfield-with-label",
    type: "components:example",
    files: ["example/textfield-with-label.tsx"]
  },
  {
    name: "textfield-with-text",
    type: "components:example",
    files: ["example/textfield-with-text.tsx"]
  },
  {
    name: "toast-demo",
    type: "components:example",
    files: ["example/toast-demo.tsx"]
  },
  {
    name: "toast-destructive",
    type: "components:example",
    files: ["example/toast-destructive.tsx"]
  },
  {
    name: "toggle-demo",
    type: "components:example",
    files: ["example/toggle-demo.tsx"]
  },
  {
    name: "toggle-disabled",
    type: "components:example",
    files: ["example/toggle-disabled.tsx"]
  },
  {
    name: "toggle-large",
    type: "components:example",
    files: ["example/toggle-large.tsx"]
  },
  {
    name: "toggle-outline",
    type: "components:example",
    files: ["example/toggle-outline.tsx"]
  },
  {
    name: "toggle-small",
    type: "components:example",
    files: ["example/toggle-small.tsx"]
  },
  {
    name: "toggle-with-text",
    type: "components:example",
    files: ["example/toggle-with-text.tsx"]
  },
  {
    name: "tooltip-demo",
    type: "components:example",
    files: ["example/tooltip-demo.tsx"]
  },
  {
    name: "typography-blockquote",
    type: "components:example",
    files: ["example/typography-blockquote.tsx"]
  },
  {
    name: "typography-demo",
    type: "components:example",
    files: ["example/typography-demo.tsx"]
  },
  {
    name: "typography-h1",
    type: "components:example",
    files: ["example/typography-h1.tsx"]
  },
  {
    name: "typography-h2",
    type: "components:example",
    files: ["example/typography-h2.tsx"]
  },
  {
    name: "typography-h3",
    type: "components:example",
    files: ["example/typography-h3.tsx"]
  },
  {
    name: "typography-h4",
    type: "components:example",
    files: ["example/typography-h4.tsx"]
  },
  {
    name: "typography-inline-code",
    type: "components:example",
    files: ["example/typography-inline-code.tsx"]
  },
  {
    name: "typography-large",
    type: "components:example",
    files: ["example/typography-large.tsx"]
  },
  {
    name: "typography-lead",
    type: "components:example",
    files: ["example/typography-lead.tsx"]
  },
  {
    name: "typography-list",
    type: "components:example",
    files: ["example/typography-list.tsx"]
  },
  {
    name: "typography-muted",
    type: "components:example",
    files: ["example/typography-muted.tsx"]
  },
  {
    name: "typography-p",
    type: "components:example",
    files: ["example/typography-p.tsx"]
  },
  {
    name: "typography-small",
    type: "components:example",
    files: ["example/typography-small.tsx"]
  },
  {
    name: "typography-table",
    type: "components:example",
    files: ["example/typography-table.tsx"]
  }
];

export const registry = [...ui, ...example];

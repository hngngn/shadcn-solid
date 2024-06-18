export const CN = `import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classLists: ClassValue[]) => twMerge(clsx(classLists));
`;

export const TAILWIND_CONFIG = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-kb-theme="dark"]'],
  content: ["src/routes/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--kb-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--kb-accordion-content-height)" },
          to: { height: 0 },
        },
        "collapsible-down": {
          from: { height: 0 },
          to: { height: "var(--kb-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--kb-collapsible-content-height)" },
          to: { height: 0 },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
`;

export const TAILWIND_CONFIG_WITH_VARIABLES = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-kb-theme="dark"]'],
  content: ["src/routes/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--kb-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--kb-accordion-content-height)" },
          to: { height: 0 },
        },
        "collapsible-down": {
          from: { height: 0 },
          to: { height: "var(--kb-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--kb-collapsible-content-height)" },
          to: { height: 0 },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
`;

export const UNO_CONFIG = `import {
  defineConfig,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import presetAnimations from "unocss-preset-animations";

export default defineConfig({
  presets: [
    presetUno({
      dark: {
        dark: '[data-kb-theme="dark"]',
        light: '[data-kb-theme="light"]',
      },
      prefix: "",
    }),
    presetAnimations(),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  theme: {
    animation: {
      keyframes: {
        "accordion-down":
          "{ from { height: 0 } to { height: var(--kb-accordion-content-height) } }",
        "accordion-up":
          "{ from { height: var(--kb-accordion-content-height) } to { height: 0 } }",
        "collapsible-down":
          "{ from { height: 0 } to { height: var(--kb-collapsible-content-height) } }",
        "collapsible-up":
          "{ from { height: var(--kb-collapsible-content-height) } to { height: 0 } }",
        "caret-blink": "{ 0%,70%,100% { opacity: 1 } 20%,50% { opacity: 0 } }"
      },
      timingFns: {
        "accordion-down": "ease-out",
        "accordion-up": "ease-out",
        "collapsible-down": "ease-out",
        "collapsible-up": "ease-out",
        "caret-blink": "ease-out"
      },
      durations: {
        "accordion-down": "0.2s",
        "accordion-up": "0.2s",
        "collapsible-down": "0.2s",
        "collapsible-up": "0.2s",
        "caret-blink": "1.25s"
      },
      counts: {
        "caret-blink": "infinite"
      }
    },
  },
});
`;

export const UNO_CONFIG_WITH_VARIABLES = `import {
  defineConfig,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import presetAnimations from "unocss-preset-animations";

export default defineConfig({
  presets: [
    presetUno({
      dark: {
        dark: '[data-kb-theme="dark"]',
        light: '[data-kb-theme="light"]',
      },
      prefix: "",
    }),
    presetAnimations(),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  theme: {
    colors: {
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    animation: {
      keyframes: {
        "accordion-down":
          "{ from { height: 0 } to { height: var(--kb-accordion-content-height) } }",
        "accordion-up":
          "{ from { height: var(--kb-accordion-content-height) } to { height: 0 } }",
        "collapsible-down":
          "{ from { height: 0 } to { height: var(--kb-collapsible-content-height) } }",
        "collapsible-up":
          "{ from { height: var(--kb-collapsible-content-height) } to { height: 0 } }",
        "caret-blink": "{ 0%,70%,100% { opacity: 1 } 20%,50% { opacity: 0 } }"
      },
      timingFns: {
        "accordion-down": "ease-out",
        "accordion-up": "ease-out",
        "collapsible-down": "ease-out",
        "collapsible-up": "ease-out",
        "caret-blink": "ease-out"
      },
      durations: {
        "accordion-down": "0.2s",
        "accordion-up": "0.2s",
        "collapsible-down": "0.2s",
        "collapsible-up": "0.2s",
        "caret-blink": "1.25s"
      },
      counts: {
        "caret-blink": "infinite"
      }
    },
  },
});
`;

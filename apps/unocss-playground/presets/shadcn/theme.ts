import type { Theme } from "unocss/preset-wind4"

export const theme: Theme = {
  radius: {
    sm: "calc(var(--radius) - 4px)",
    md: "calc(var(--radius) - 2px)",
    lg: "var(--radius)",
    xl: "calc(var(--radius) + 4px)",
  },
  colors: {
    background: "var(--background)",
    foreground: "var(--foreground)",
    card: {
      DEFAULT: "var(--card)",
      foreground: "var(--card-foreground)",
    },
    popover: {
      DEFAULT: "var(--popover)",
      foreground: "var(--popover-foreground)",
    },
    surface: {
      DEFAULT: "var(--surface)",
      foreground: "var(--surface-foreground)",
    },
    primary: {
      DEFAULT: "var(--primary)",
      foreground: "var(--primary-foreground)",
    },
    secondary: {
      DEFAULT: "var(--secondary)",
      foreground: "var(--secondary-foreground)",
    },
    accent: {
      DEFAULT: "var(--accent)",
      foreground: "var(--accent-foreground)",
    },
    muted: {
      DEFAULT: "var(--muted)",
      foreground: "var(--muted-foreground)",
    },
    destructive: "var(--destructive)",
    border: "var(--border)",
    input: "var(--input)",
    ring: "var(--ring)",
    sidebar: {
      DEFAULT: "var(--sidebar)",
      foreground: "var(--sidebar-foreground)",
      primary: {
        DEFAULT: "var(--sidebar-primary)",
        foreground: "var(--sidebar-primary-foreground)",
      },
      accent: {
        DEFAULT: "var(--sidebar-accent)",
        foreground: "var(--sidebar-accent-foreground)",
      },
      border: "var(--sidebar-border)",
      ring: "var(--sidebar-ring)",
    },
    chart: {
      1: "var(--chart-1)",
      2: "var(--chart-2)",
      3: "var(--chart-3)",
      4: "var(--chart-4)",
      5: "var(--chart-5)",
    },
  },
}

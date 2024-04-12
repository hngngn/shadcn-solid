/** @type {import('prettier').Config} */
export default {
  trailingComma: "none",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  arrowParens: "avoid",
  printWidth: 100,
  plugins: ["prettier-plugin-tailwindcss"],
  endOfLine: "auto"
};

